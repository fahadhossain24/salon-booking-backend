import { Document, Types } from 'mongoose';

export interface IAttachment extends Document {
  conversation: Types.ObjectId;
  sender: Types.ObjectId;
  type: string;
  content: string;
}
