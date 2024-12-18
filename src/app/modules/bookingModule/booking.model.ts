import mongoose from 'mongoose';
import { IBooking } from './booking.interface';

const bookingSchema = new mongoose.Schema<IBooking>(
  {
    user: {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
      },
      name: String,
      address: String,
    },
    outlet: {
      outletId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'outlet',
      },
      name: String,
      address: String,
    },
    service: {
      serviceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'service',
      },
      name: String,
      price: {
        amount: Number,
        currency: String,
      },
    },
    date: Date,
    paymentType: {
      type: String,
      enum: {
        values: ['cash-on', 'online'],
        message: '{VALUE} is not supported as payment type. Please use cash-on/online as payment type!',
      },
    },
    paymentStatus: {
      type: String,
      enum: {
        values: ['paid', 'unpaid'],
        message: '{VALUE} is not supported as payment status. Please use paid/unpaid as payment status!',
      },
    },
    paymentSource: {
      type: {
        type: String,
        enum: {
          values: ['card', 'internet-banking', 'bank'],
          message: '{VALUE} is not supported as payment source type. Please use bank/card/internet-banking as payment source type!',
        },
      },
      number: String,
      transactionId: String,
    },
    bookingStatus: {
      type: String,
      enum: ['upcomming', 'past', 'completed', 'canceled'],
      default: 'upcomming',
    },
  },
  {
    timestamps: true,
  },
);

const Booking = mongoose.model<IBooking>('booking', bookingSchema);
export default Booking;
