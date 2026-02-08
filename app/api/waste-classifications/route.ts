import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import WasteClassification from '@/models/WasteClassification';

// GET all waste classifications or filter by userId
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const wasteType = searchParams.get('wasteType');
    const limit = parseInt(searchParams.get('limit') || '50');

    const query: any = {};
    if (userId) query.userId = userId;
    if (wasteType) query.wasteType = wasteType;

    const classifications = await WasteClassification.find(query)
      .sort({ createdAt: -1 })
      .limit(limit);

    return NextResponse.json({
      success: true,
      count: classifications.length,
      data: classifications,
    });
  } catch (error: any) {
    console.error('Error fetching waste classifications:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// POST new waste classification
export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const {
      wasteType,
      confidence,
      imageUrl,
      userId,
      location,
      weight,
      barcodeData,
    } = body;

    // Validation
    if (!wasteType || confidence === undefined) {
      return NextResponse.json(
        { success: false, error: 'wasteType and confidence are required' },
        { status: 400 }
      );
    }

    const classification = await WasteClassification.create({
      wasteType,
      confidence,
      imageUrl,
      userId,
      location,
      weight,
      barcodeData,
    });

    return NextResponse.json(
      {
        success: true,
        data: classification,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error creating waste classification:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
