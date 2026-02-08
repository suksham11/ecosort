import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IWasteCollection extends Document {
  userId: string;
  truckId: string;
  wasteType: 'biodegradable' | 'recyclable' | 'hazardous' | 'mixed';
  weight: number; // in kg
  location: {
    latitude: number;
    longitude: number;
    address?: string;
  };
  collectionDate: Date;
  status: 'pending' | 'collected' | 'cancelled';
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const WasteCollectionSchema: Schema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    truckId: {
      type: String,
      required: true,
    },
    wasteType: {
      type: String,
      enum: ['biodegradable', 'recyclable', 'hazardous', 'mixed'],
      required: true,
    },
    weight: {
      type: Number,
      required: true,
      min: 0,
    },
    location: {
      latitude: {
        type: Number,
        required: true,
      },
      longitude: {
        type: Number,
        required: true,
      },
      address: String,
    },
    collectionDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'collected', 'cancelled'],
      default: 'pending',
    },
    notes: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Index for efficient queries
WasteCollectionSchema.index({ userId: 1, createdAt: -1 });
WasteCollectionSchema.index({ truckId: 1, collectionDate: -1 });
WasteCollectionSchema.index({ status: 1 });

const WasteCollection: Model<IWasteCollection> =
  mongoose.models.WasteCollection ||
  mongoose.model<IWasteCollection>('WasteCollection', WasteCollectionSchema);

export default WasteCollection;
