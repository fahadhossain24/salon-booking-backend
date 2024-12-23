import { Document, Types } from 'mongoose';

export interface IEarning extends Document {
  earnings: {
    amount: number;
    currency: string;
  }[];
  outlet: {
    outletId: Types.ObjectId;
    name: string;
    type: string;
  };
  totalEarning: {
    amount: number,
    currency: string
  }
}
