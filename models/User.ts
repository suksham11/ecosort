import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  phoneNumber?: string;
  address?: string;
  role: 'user' | 'admin' | 'collector';
  wasteClassifications: mongoose.Types.ObjectId[];
  totalWasteClassified: number;
  points: number;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    phoneNumber: {
      type: String,
      trim: true,
    },
    address: {
      type: String,
    },
    role: {
      type: String,
      enum: ['user', 'admin', 'collector'],
      default: 'user',
    },
    wasteClassifications: [
      {
        type: Schema.Types.ObjectId,
        ref: 'WasteClassification',
      },
    ],
    totalWasteClassified: {
      type: Number,
      default: 0,
    },
    points: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Index for efficient queries
UserSchema.index({ email: 1 });

const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;
