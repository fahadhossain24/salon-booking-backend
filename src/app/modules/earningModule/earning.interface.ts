import { Document, Types } from 'mongoose';

export interface IEarning extends Document {
  earning: {
    amount: number;
    currency: string;
  }[];
  outlet: {
    outletId: Types.ObjectId;
    name: string;
    type: string;
  };
}
