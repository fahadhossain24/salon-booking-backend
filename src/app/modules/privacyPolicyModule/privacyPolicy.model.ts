import mongoose from 'mongoose';
import { IPrivacyPolicy } from './privacyPolicy.interface';

const privacyPolicySchema = new mongoose.Schema<IPrivacyPolicy>(
  {},
  {
    timestamps: true,
  },
);

const PrivacyPolicy = mongoose.model<IPrivacyPolicy>('privacyPolicy', privacyPolicySchema);
export default PrivacyPolicy;
