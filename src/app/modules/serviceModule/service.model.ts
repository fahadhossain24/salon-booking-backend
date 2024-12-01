import mongoose from 'mongoose';
import { IService } from './service.interface';

const serviceSchema = new mongoose.Schema<IService>(
  {},
  {
    timestamps: true,
  },
);

const Service = mongoose.model<IService>('service', serviceSchema);
export default Service;
