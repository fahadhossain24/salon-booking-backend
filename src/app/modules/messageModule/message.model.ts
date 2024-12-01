import mongoose from 'mongoose';
import { IMessage } from './message.interface';

const messageSchema = new mongoose.Schema<IMessage>(
  {},
  {
    timestamps: true,
  },
);

const Message = mongoose.model<IMessage>('message', messageSchema);
export default Message;
