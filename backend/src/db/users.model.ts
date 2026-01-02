import mongoose, { Schema, Document } from 'mongoose';

export interface IDevice {
  deviceId: string;
  deviceName: string;
  lastSeen: Date;
}

export interface IUser extends Document {
  phone: string;
  isVerified: boolean;
  profile: {
    name?: string;
    about?: string;
    photo?: string;
  };
  devices: IDevice[];
}

const UserSchema: Schema = new Schema({
  phone: { type: String, required: true, unique: true },
  isVerified: { type: Boolean, default: false },
  profile: {
    name: { type: String, default: '' },
    about: { type: String, default: 'Hey there! I am using MyMessagingApp.' },
    photo: { type: String, default: '' },
  },
  devices: [
    {
      deviceId: String,
      deviceName: String,
      lastSeen: { type: Date, default: Date.now },
    },
  ],
}, { timestamps: true });

export default mongoose.model<IUser>('User', UserSchema);

