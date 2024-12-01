import mongoose from 'mongoose';
import { ISlider } from './slider.interface';

const sliderSchema = new mongoose.Schema<ISlider>(
  {},
  {
    timestamps: true,
  },
);

const Slider = mongoose.model<ISlider>('slider', sliderSchema);
export default Slider;
