import { ObjectId, Types } from 'mongoose';
import IUser from './user.interface';
import User from './user.model';

// service for create new user
const createUser = async (data: IUser) => {
  return await User.create(data);
};

// service for get specific user
const getSpecificUser = async (id: string): Promise<IUser> => {
  return await User.findOne({ _id: id }).select('-password');
};

// service for update specific user
const updateSpecificUser = async (id: string, data: Partial<IUser>) => {
  return await User.updateOne({ _id: id }, data, {
    runValidators: true,
  });
};

// service for delete specific user
const deleteSpecificUser = async (id: string) => {
  return await User.deleteOne({ _id: id });
};

export default {
  createUser,
  getSpecificUser,
  updateSpecificUser,
  deleteSpecificUser
};
