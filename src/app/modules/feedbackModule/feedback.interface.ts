import { Document, Types } from 'mongoose';

export interface IFeedback extends Document {
  user: {
    userId: Types.ObjectId;
    name: string;
    phone: string;
    address: string;
  };
  outlet: {
    outletId: Types.ObjectId;
    type: string;
    phone: string;
    address: string;
  };
  rating: number;
  comment: string;
}
