import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ITruckLocation extends Document {
  truckId: string;
  truckName: string;
  latitude: number;
  longitude: number;
  status: 'active' | 'inactive' | 'maintenance';
  wasteLoad: number; // percentage
  wasteType: 'biodegradable' | 'recyclable' | 'hazardous' | 'mixed';
  lastUpdated: Date;
  route?: string;
  speed?: number; // km/h
  createdAt: Date;
  updatedAt: Date;
}

const TruckLocationSchema: Schema = new Schema(
  {
    truckId: {
      type: String,
      required: true,
      unique: true,
    },
    truckName: {
      type: String,
      required: true,
    },
    latitude: {
      type: Number,
      required: true,
      min: -90,
      max: 90,
    },
    longitude: {
      type: Number,
      required: true,
      min: -180,
      max: 180,
    },
    status: {
      type: String,
      enum: ['active', 'inactive', 'maintenance'],
      default: 'active',
    },
    wasteLoad: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    wasteType: {
      type: String,
      enum: ['biodegradable', 'recyclable', 'hazardous', 'mixed'],
      required: true,
    },
    lastUpdated: {
      type: Date,
      default: Date.now,
    },
    route: {
      type: String,
    },
    speed: {
      type: Number,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Index for efficient queries
TruckLocationSchema.index({ truckId: 1 });
TruckLocationSchema.index({ status: 1 });
TruckLocationSchema.index({ lastUpdated: -1 });

const TruckLocation: Model<ITruckLocation> =
  mongoose.models.TruckLocation ||
  mongoose.model<ITruckLocation>('TruckLocation', TruckLocationSchema);

export default TruckLocation;
