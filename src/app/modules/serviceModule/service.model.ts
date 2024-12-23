import mongoose from 'mongoose';
import { IService } from './service.interface';
import { number } from 'zod';

const serviceSchema = new mongoose.Schema<IService>(
  {
    name: {
      type: String,
      required: true,
    },
    outlet: {
      outletId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'outlet',
      },
      name: String,
      type: {
        type: String,
        enum: ['Salon', 'Spa', 'Pets'],
      },
    },
    price: {
      amount: Number,
      currency: {
        type: String,
        enum: ['USD'],
        default: 'USD',
      },
    },
    isDiscount: {
      type: Boolean,
      default: false,
    },
    discount: {
      type: {
        type: String,
        enum: ['percentage', 'fixed'],
      },
      amount: Number,
      currency: {
        type: String,
        enum: ['USD'],
        default: 'USD',
      },
    },
    image: String,
    consumeCount: {
      type: Number,
      default: 0,
    },
    isHomeServiceAvailable: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

serviceSchema.index(
  {
    name: 'text',
    discount: 'text',
    consumeCount: 'text',
  },
  {
    weights: {
      name: 5,
      discount: 4,
      consumeCount: 4,
    },
  },
);

const Service = mongoose.model<IService>('service', serviceSchema);
export default Service;
