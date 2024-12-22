import { Request, Response } from 'express';
import wishlistServices from './wishlist.services';
import CustomError from '../../errors';
import sendResponse from '../../../shared/sendResponse';
import { StatusCodes } from 'http-status-codes';

// controller for create new wishlist
const addToWishlist = async (req: Request, res: Response) => {
  const wishlistData = req.body;

  // Ensure services in the body is an array
  const serviceToAdd = Array.isArray(wishlistData.service) ? wishlistData.service : [wishlistData.service];

  // Find existing wishlist for the user
  const existingWishlist = await wishlistServices.getWishlistByUserId(wishlistData.user.userId);

  if (existingWishlist) {
    serviceToAdd.forEach((service: any) => {
      const isServiceAlreadyAdded = existingWishlist.services.some((s) => s.serviceId.toString() === service.serviceId);
      if (!isServiceAlreadyAdded) {
        existingWishlist.services.push(service);
      }
    });

    await existingWishlist.save();

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      status: 'success',
      message: 'Service added to wishlist successfully',
    });
  } else {
    const newWishlist = await wishlistServices.createWishlist({
      user: wishlistData.user,
      services: serviceToAdd,
    });

    sendResponse(res, {
      statusCode: StatusCodes.CREATED,
      status: 'success',
      message: 'Wishlist created successfully',
    });
  }
};

// controller for get wishlist by userId
const getWishlistByUserId = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const wishlist = await wishlistServices.getWishlistByUserId(userId);
  if (!wishlist) {
    throw new CustomError.NotFoundError('No wishlish found!');
  }

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    status: 'success',
    message: 'Wishlist retrive successfully',
    data: wishlist,
  });
};

export default {
  addToWishlist,
  getWishlistByUserId,
};
