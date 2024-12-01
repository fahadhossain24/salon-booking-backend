import { Document } from 'mongoose';

interface IAdmin extends Document {
  adminId: string;
  fullName: string;
  phone: string;
  email: string;
  password: string;
  status: string,
  image?: string;
  isEmailVerified: boolean;
  verification?: {
    code: string;
    expireDate: Date;
  };
  address?: string;
  role: string;
  isActive?: boolean
}

export default IAdmin;
