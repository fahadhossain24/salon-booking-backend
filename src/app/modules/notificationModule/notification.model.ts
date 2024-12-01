import mongoose from 'mongoose';
import { INotification } from './notification.interface';

const notificationSchema = new mongoose.Schema<INotification>(
  {},
  {
    timestamps: true,
  },
);

const Notification = mongoose.model<INotification>('notification', notificationSchema);
export default Notification;
