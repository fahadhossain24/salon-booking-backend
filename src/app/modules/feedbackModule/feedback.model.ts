import mongoose from 'mongoose';
import { IFeedback } from './feedback.interface';

const feedbackSchema = new mongoose.Schema<IFeedback>(
  {},
  {
    timestamps: true,
  },
);

const Feedback = mongoose.model<IFeedback>('feedback', feedbackSchema);
export default Feedback;
