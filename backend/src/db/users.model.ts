name?: string;
    photo?: string;
    about?: string;
  };
  linkedDevices: IDevice[];
  createdAt: Date;
}

const UserSchema: Schema = new Schema({
  phone: { type: String, required: true, unique: true },
  otp: { type: String },
  isVerified: { type: Boolean, default: false },
  profile: {
    name: { type: String },
    photo: { type: String },
    about: { type: String, default: "Hey there! I am using MyMessagingApp." }
  },
  linkedDevices: [{
    deviceId: { type: String },
    deviceName: { type: String },
    lastSeen: { type: Date, default: Date.now },
    pushToken: { type: String }
  }],
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<IUser>('User', UserSchema);
