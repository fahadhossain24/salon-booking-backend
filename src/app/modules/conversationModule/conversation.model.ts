import mongoose from 'mongoose';
import { IConversation } from './conversation.interface';

const conversationSchema = new mongoose.Schema<IConversation>(
  {},
  {
    timestamps: true,
  },
);

const Conversation = mongoose.model<IConversation>('conversation', conversationSchema);
export default Conversation;
