import mongoose from 'mongoose';
import { IAttachment } from './attachment.interface';

const attachmentSchema = new mongoose.Schema<IAttachment>(
  {},
  {
    timestamps: true,
  },
);

const Attachment = mongoose.model<IAttachment>('attachment', attachmentSchema);
export default Attachment;
