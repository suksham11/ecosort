import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import TruckLocation from '@/models/TruckLocation';

// GET all truck locations or filter by status
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const truckId = searchParams.get('truckId');

    const query: any = {};
    if (status) query.status = status;
    if (truckId) query.truckId = truckId;

    const trucks = await TruckLocation.find(query).sort({ lastUpdated: -1 });

    return NextResponse.json({
      success: true,
      count: trucks.length,
      data: trucks,
    });
  } catch (error: any) {
    console.error('Error fetching truck locations:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// POST new truck location or update existing
export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const {
      truckId,
      truckName,
      latitude,
      longitude,
      status,
      wasteLoad,
      wasteType,
      route,
      speed,
    } = body;

    // Validation
    if (!truckId || !truckName || latitude === undefined || longitude === undefined || wasteLoad === undefined || !wasteType) {
      return NextResponse.json(
        { success: false, error: 'truckId, truckName, latitude, longitude, wasteLoad, and wasteType are required' },
        { status: 400 }
      );
    }

    // Update if exists, create if not (upsert)
    const truck = await TruckLocation.findOneAndUpdate(
      { truckId },
      {
        truckId,
        truckName,
        latitude,
        longitude,
        status: status || 'active',
        wasteLoad,
        wasteType,
        route,
        speed,
        lastUpdated: new Date(),
      },
      { upsert: true, new: true }
    );

    return NextResponse.json({
      success: true,
      data: truck,
    });
  } catch (error: any) {
    console.error('Error updating truck location:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// PUT update truck status or location
export async function PUT(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const { truckId, ...updateData } = body;

    if (!truckId) {
      return NextResponse.json(
        { success: false, error: 'truckId is required' },
        { status: 400 }
      );
    }

    const truck = await TruckLocation.findOneAndUpdate(
      { truckId },
      { ...updateData, lastUpdated: new Date() },
      { new: true }
    );

    if (!truck) {
      return NextResponse.json(
        { success: false, error: 'Truck not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: truck,
    });
  } catch (error: any) {
    console.error('Error updating truck:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
