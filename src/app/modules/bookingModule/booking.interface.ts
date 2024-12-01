import { Document, Types } from 'mongoose';

export interface IBooking extends Document {
  user: {
    userId: Types.ObjectId;
    name: string;
    address: string;
  };
  outlet: {
    outletId: Types.ObjectId;
    name: string;
    address: string;
  };
  service: {
    serviceId: Types.ObjectId;
    name: string;
    price: {
      amount: number;
      currency: string;
    };
    dayAt: {
      daySlotId: Types.ObjectId;
      name: string;
    };
    timeAt: string;
    date: Date;
    paymentType: string;
    paymentStatus: string;
    bookingStatus: string;
    paymentSource: {
      type: string;
      number: string;
      transactionId: string;
    };
  };
}
