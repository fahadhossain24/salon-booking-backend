import mongoose from 'mongoose';
import { IBooking } from './booking.interface';

const bookingSchema = new mongoose.Schema<IBooking>(
  {},
  {
    timestamps: true,
  },
);

const Booking = mongoose.model<IBooking>('booking', bookingSchema);
export default Booking;
