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

export default {
  createOutlet,
};
