import { IService } from './service.interface';
import Service from './service.model';

// service for create new service
const createService = async (data: Partial<IService>) => {
  return await Service.create(data);
};

// service for get all service by outletid
const getServicesByOutlet = async (outletId: string, skip: number, limit: number) => {
  return await Service.find({ 'outlet.outletId': outletId }).populate('outlet.outletId').skip(skip).limit(limit);
};

// service for update specific service
const updateSpecificService = async (id: string, data: Partial<IService>) => {
  return await Service.updateOne({ _id: id }, data, {
    runValidators: true,
  });
};

// service for delete specific service
const deleteSpecificService = async (id: string) => {
  return await Service.deleteOne({ _id: id });
};

// service for retrive discounted services
const getDiscountedServices = async () => {
  return await Service.find({ isDiscount: true });
};

export default {
  createService,
  getServicesByOutlet,
  updateSpecificService,
  deleteSpecificService,
  getDiscountedServices,
};
