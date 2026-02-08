import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import WasteClassification from '@/models/WasteClassification';

// GET statistics for waste classifications
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    const matchStage: any = {};
    if (userId) matchStage.userId = userId;

    // Aggregate statistics by waste type
    const stats = await WasteClassification.aggregate([
      { $match: matchStage },
      {
        $group: {
          _id: '$wasteType',
          count: { $sum: 1 },
          avgConfidence: { $avg: '$confidence' },
          totalWeight: { $sum: '$weight' },
        },
      },
      {
        $project: {
          wasteType: '$_id',
          count: 1,
          avgConfidence: { $round: ['$avgConfidence', 2] },
          totalWeight: { $round: ['$totalWeight', 2] },
          _id: 0,
        },
      },
    ]);

    // Get total count
    const totalCount = await WasteClassification.countDocuments(matchStage);

    // Get recent classifications
    const recentClassifications = await WasteClassification.find(matchStage)
      .sort({ createdAt: -1 })
      .limit(10)
      .select('wasteType confidence createdAt');

    return NextResponse.json({
      success: true,
      data: {
        totalCount,
        byType: stats,
        recent: recentClassifications,
      },
    });
  } catch (error: any) {
    console.error('Error fetching waste classification stats:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
