import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';

export async function GET() {
  try {
    const db = await connectDB();
    
    // Test database connection
    const collections = await db.connection.db?.listCollections().toArray();
    
    return NextResponse.json({
      status: 'success',
      message: '✅ Database is connected and working!',
      database: db.connection.name,
      collections: collections?.map(c => c.name) || [],
      timestamp: new Date().toISOString()
    });
  } catch (error: any) {
    return NextResponse.json({
      status: 'error',
      message: '❌ Database connection failed',
      error: error.message
    }, { status: 500 });
  }
}
