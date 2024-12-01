import mongoose from 'mongoose';
import { ISchedule } from './schedule.interface';

const scheduleSchema = new mongoose.Schema<ISchedule>(
  {},
  {
    timestamps: true,
  },
);

const Schedule = mongoose.model<ISchedule>('schedule', scheduleSchema);
export default Schedule;
