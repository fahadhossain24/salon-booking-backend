import { StatusCodes } from 'http-status-codes';
import config from '../../../config';
import jwtHelpers from '../../../healpers/healper.jwt';
import sendResponse from '../../../shared/sendResponse';
import IdGenerator from '../../../utils/IdGenerator';
import CustomError from '../../errors';
import authServices from '../authModule/userAuthModule/auth.services';
import outletServices from './outlet.services';
import { Request, Response } from 'express';
import fileUploader from '../../../utils/fileUploader';
import { FileArray } from 'express-fileupload';

// controller for create new outlet
const createOutlet = async (req: Request, res: Response) => {
  const outletData = req.body;
  const files = req.files;

  const userInUsersCollection = await authServices.getUserByEmail(outletData.email as string);
  if (userInUsersCollection) {
    throw new CustomError.BadRequestError('Email already used!');
  }
  const outletId = IdGenerator.generateId();
  outletData.outletId = outletId;

  const location = {
    latitude: outletData.latitude,
    longitude: outletData.longitude,
    address: outletData.address,
  };
  outletData.location = location;

  const profileImagePath = await fileUploader(files as FileArray, `${outletData.type}-image`, 'profileImage');
  const nidImagePath = await fileUploader(files as FileArray, `${outletData.type}-image`, 'nidImage');

  outletData.profileImage = profileImagePath;
  outletData.nidImage = nidImagePath;

  const outlet = await outletServices.createOutlet(outletData);
  if (!outlet) {
    throw new CustomError.BadRequestError(`Failed to create new ${outletData.type}!`);
  }

  const { password, ...outletInfoAcceptPass } = outlet.toObject();

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    status: 'success',
    message: `${outletData.type} creation successfull`,
    data: outletInfoAcceptPass,
  });
};

// controller for get all outlets by main service category
const getOutletsByServiceCategory = async (req: Request, res: Response) => {
  const { serviceCategoryId } = req.params;
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 8;

  if (!serviceCategoryId) {
    throw new CustomError.BadRequestError('Missing service category Id in request params!');
  }

  const skip = (page - 1) * limit;
  const outlets = await outletServices.getOutletsByServiceCategory(serviceCategoryId, skip, limit);

  const totalOutlets = outlets.length || 0;
  const totalPages = Math.ceil(totalOutlets / limit);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    status: 'success',
    message: 'Service created successfull!',
    meta: {
      totalData: totalOutlets,
      totalPage: totalPages,
      currentPage: page,
      limit: limit,
    },
    data: outlets,
  });
};

// controller for update specific outlet
const updateSpecificOutlet = async (req: Request, res: Response) => {
  const { id } = req.params;
  const files = req.files;
  const updateData = req.body;

  const outlet = await outletServices.getSpecificOutlet(id);
  if (!outlet) {
    throw new CustomError.NotFoundError('Outlet not found!');
  }

  if (req.files && req.files.nidImage) {
    const nidImagePath = await fileUploader(files as FileArray, `${outlet.type}-image`, 'nidImage');
    updateData.nidImage = nidImagePath;
  }

  const updatedOutlet = await outletServices.updateSpecificOutlet(id, updateData);
  if (!updatedOutlet.modifiedCount) {
    throw new CustomError.BadRequestError('Failed to update outlet!');
  }

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    status: 'success',
    message: `${outlet.type} updated successfull`,
  });
};

// controller for change outlet profile image
const changeOutletProfileImage = async (req: Request, res: Response) => {
  const { id } = req.params;
  const profileImage = req.files;
  if (!id) {
    throw new CustomError.BadRequestError('Missing id in request params!');
  }

  const outlet = await outletServices.getSpecificOutlet(id);
  if (!outlet) {
    throw new CustomError.NotFoundError('Outlet not found!');
  }

  if (profileImage) {
    const profileImagePath = await fileUploader(profileImage as FileArray, `${outlet.type}-image`, 'profileImage');
    outlet.profileImage = profileImagePath as string;
  }

  await outlet.save();

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    status: 'success',
    message: `Profile image change successfull`,
  });
};

// controller for change outlet cover image
const changeOutletCoverImage = async (req: Request, res: Response) => {
  const { id } = req.params;
  const coverImage = req.files;
  if (!id) {
    throw new CustomError.BadRequestError('Missing id in request params!');
  }

  const outlet = await outletServices.getSpecificOutlet(id);
  if (!outlet) {
    throw new CustomError.NotFoundError('Outlet not found!');
  }

  if (coverImage) {
    const coverImagePath = await fileUploader(coverImage as FileArray, `${outlet.type}-image`, 'coverImage');
    outlet.coverImage = coverImagePath as string;
  }

  await outlet.save();

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    status: 'success',
    message: `Cover image change successfull`,
  });
};

export default {
  createOutlet,
  getOutletsByServiceCategory,
  updateSpecificOutlet,
  changeOutletProfileImage,
  changeOutletCoverImage,
};
