import { Document, Types } from 'mongoose';

export interface INotification extends Document {
  userId: {
    userId: Types.ObjectId;
    name: string;
  };
  content: string;
  isDismissed: boolean;
}
