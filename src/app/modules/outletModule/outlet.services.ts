import { ObjectId, Types } from 'mongoose';
import { IOutlet } from './outlet.interface';
import Outlet from './outlet.model';

// service for create new outlet
const createOutlet = async (data: IOutlet) => {
  return await Outlet.create(data);
};

// service for get specific outlet
const getSpecificOutlet = async (id: string): Promise<IOutlet> => {
  return await Outlet.findOne({ _id: id }).select('-password');
};

// service for get outlets by service category
const getOutletsByServiceCategory = async (id: string, skip: number, limit: number) => {
  return await Outlet.find({ categoryId: id }).populate('categoryId').skip(skip).limit(limit);
};

// service for update specific outlet
const updateSpecificOutlet = async (id: string, data: Partial<IOutlet>) => {
  return await Outlet.updateOne({ _id: id }, data, {
    runValidators: true,
  });
};

// service for delete specific outlet
const deleteSpecificOutlet = async (id: string) => {
  return await Outlet.deleteOne({ _id: id });
};

export default {
  createOutlet,
  getSpecificOutlet,
  getOutletsByServiceCategory,
  updateSpecificOutlet,
  deleteSpecificOutlet,
};
