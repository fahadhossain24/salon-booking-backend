import { Document, Types } from 'mongoose';

export interface IConversation extends Document {
  sender: {
    name: string;
    senderId: Types.ObjectId;
  };
  receiver: {
    name: string;
    receiver: Types.ObjectId;
  };
  lastMessage: Types.ObjectId;
  unreadCount: number;
}
