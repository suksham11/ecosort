import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import WasteCollection from '@/models/WasteCollection';

// GET all waste collections or filter by userId/truckId
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const truckId = searchParams.get('truckId');
    const status = searchParams.get('status');
    const limit = parseInt(searchParams.get('limit') || '50');

    const query: any = {};
    if (userId) query.userId = userId;
    if (truckId) query.truckId = truckId;
    if (status) query.status = status;

    const collections = await WasteCollection.find(query)
      .sort({ collectionDate: -1 })
      .limit(limit);

    return NextResponse.json({
      success: true,
      count: collections.length,
      data: collections,
    });
  } catch (error: any) {
    console.error('Error fetching waste collections:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// POST new waste collection request
export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const {
      userId,
      truckId,
      wasteType,
      weight,
      location,
      collectionDate,
      notes,
    } = body;

    // Validation
    if (!userId || !truckId || !wasteType || !weight || !location || !collectionDate) {
      return NextResponse.json(
        { success: false, error: 'userId, truckId, wasteType, weight, location, and collectionDate are required' },
        { status: 400 }
      );
    }

    const collection = await WasteCollection.create({
      userId,
      truckId,
      wasteType,
      weight,
      location,
      collectionDate,
      notes,
      status: 'pending',
    });

    return NextResponse.json(
      {
        success: true,
        data: collection,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error creating waste collection:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// PUT update waste collection status
export async function PUT(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const { collectionId, status, notes } = body;

    if (!collectionId || !status) {
      return NextResponse.json(
        { success: false, error: 'collectionId and status are required' },
        { status: 400 }
      );
    }

    const collection = await WasteCollection.findByIdAndUpdate(
      collectionId,
      { status, notes },
      { new: true }
    );

    if (!collection) {
      return NextResponse.json(
        { success: false, error: 'Collection not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: collection,
    });
  } catch (error: any) {
    console.error('Error updating waste collection:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
