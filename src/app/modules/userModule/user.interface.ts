import { Document } from 'mongoose';

enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}

interface IUser extends Document {
  userId: string;
  fullName: string;
  phone: string;
  email: string;
  password: string;
  image?: string;
  isEmailVerified: boolean;
  verification?: {
    code: string;
    expireDate: Date;
  };
  referralCode?: string;
  dateOfBirth?: Date;
  gender?: Gender;
  address?: string;
  role: string;
  status: string;
  point?: number;
  isActive?: boolean;
  isSocial?: boolean;
  fcmToken?: string;
}

export default IUser;
