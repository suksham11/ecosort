import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IWasteClassification extends Document {
  wasteType: 'biodegradable' | 'recyclable' | 'hazardous' | 'unknown';
  confidence: number;
  imageUrl?: string;
  userId?: string;
  location?: {
    latitude: number;
    longitude: number;
    address?: string;
  };
  weight?: number;
  barcodeData?: string;
  createdAt: Date;
  updatedAt: Date;
}

const WasteClassificationSchema: Schema = new Schema(
  {
    wasteType: {
      type: String,
      enum: ['biodegradable', 'recyclable', 'hazardous', 'unknown'],
      required: true,
    },
    confidence: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    imageUrl: {
      type: String,
    },
    userId: {
      type: String,
    },
    location: {
      latitude: Number,
      longitude: Number,
      address: String,
    },
    weight: {
      type: Number,
      min: 0,
    },
    barcodeData: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Index for efficient queries
WasteClassificationSchema.index({ userId: 1, createdAt: -1 });
WasteClassificationSchema.index({ wasteType: 1 });

const WasteClassification: Model<IWasteClassification> =
  mongoose.models.WasteClassification ||
  mongoose.model<IWasteClassification>('WasteClassification', WasteClassificationSchema);

export default WasteClassification;
