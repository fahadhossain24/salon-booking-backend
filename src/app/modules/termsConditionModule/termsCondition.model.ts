import mongoose from 'mongoose';
import { ITermsCondition } from './termsCondition.interface';

const termsConditionSchema = new mongoose.Schema<ITermsCondition>(
  {},
  {
    timestamps: true,
  },
);

const TermsCondition = mongoose.model<ITermsCondition>('termsCondition', termsConditionSchema);
export default TermsCondition;
