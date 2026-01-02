import User, { IUser } from '../db/users.model';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_key';

export const generateToken = (userId: string, deviceId: string) => {
  return jwt.sign({ userId, deviceId }, JWT_SECRET, { expiresIn: '30d' });
};

export const findOrCreateUser = async (phone: string) => {
  let user = await User.findOne({ phone });
  if (!user) {
    user = await User.create({ phone, isVerified: true });
  }
  return user;
};

export const updateDeviceSession = async (user: IUser, deviceId: string, deviceName: string) => {
  const deviceIndex = user.devices.findIndex((d) => d.deviceId === deviceId);

  if (deviceIndex > -1) {
    user.devices[deviceIndex].lastSeen = new Date();
    user.devices[deviceIndex].deviceName = deviceName;
  } else {
    user.devices.push({ deviceId, deviceName, lastSeen: new Date() });
  }
  
  await user.save();
};
