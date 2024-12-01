import mongoose from 'mongoose';
import { IAboutUs } from './aboutUs.interface';

const abountUsSchema = new mongoose.Schema<IAboutUs>(
  {},
  {
    timestamps: true,
  },
);

const AboutUs = mongoose.model<IAboutUs>('aboutUs', abountUsSchema);
export default AboutUs;
