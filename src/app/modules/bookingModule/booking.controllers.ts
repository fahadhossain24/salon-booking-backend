import { Request, Response } from 'express';
import bookingServices from './booking.services';
import CustomError from '../../errors';
import sendResponse from '../../../shared/sendResponse';
import { StatusCodes } from 'http-status-codes';

// controller for create new booking
const createBooking = async (req: Request, res: Response) => {
  const booking = await bookingServices.createBooking(req.body);
  if (!booking) {
    throw new CustomError.BadRequestError('Failed to craete booking!');
  }

  const selectedDate = new Date(req.body.date);
  const currentDate = new Date();

  if (selectedDate < currentDate) {
    throw new CustomError.BadRequestError('Booking date cannot be in the past. Please select a valid future date.');
  }

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    status: 'success',
    message: `Booking creation successfull`,
    data: booking,
  });
};

// controller for retrive booking by userId
const getBookingsByUserId = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 8;
  if (!userId) {
    throw new CustomError.BadRequestError('Missing userId in request params!');
  }

  const skip = (page - 1) * limit;
  const bookings = await bookingServices.getBookingsByUserId(userId, skip, limit);

  const totalBookings = bookings.length || 0;
  const totalPages = Math.ceil(totalBookings / limit);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    status: 'success',
    message: 'Bookings retrive successfull!',
    meta: {
      totalData: totalBookings,
      totalPage: totalPages,
      currentPage: page,
      limit: limit,
    },
    data: bookings,
  });
};

// controller for retrive booking by outletId
const getBookingsByOutletId = async (req: Request, res: Response) => {
  const { outletId } = req.params;
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 8;
  if (!outletId) {
    throw new CustomError.BadRequestError('Missing outletId in request params!');
  }

  const skip = (page - 1) * limit;
  const bookings = await bookingServices.getbookingsByOutletId(outletId, skip, limit);

  const totalBookings = bookings.length || 0;
  const totalPages = Math.ceil(totalBookings / limit);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    status: 'success',
    message: 'Bookings retrive successfull!',
    meta: {
      totalData: totalBookings,
      totalPage: totalPages,
      currentPage: page,
      limit: limit,
    },
    data: bookings,
  });
};

// controller for retrive booking by outletId
const getBookingsByServiceId = async (req: Request, res: Response) => {
  const { serviceId } = req.params;
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 8;
  if (!serviceId) {
    throw new CustomError.BadRequestError('Missing serviceId in request params!');
  }

  const skip = (page - 1) * limit;
  const bookings = await bookingServices.getBookingsByServiceId(serviceId, skip, limit);

  const totalBookings = bookings.length || 0;
  const totalPages = Math.ceil(totalBookings / limit);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    status: 'success',
    message: 'Bookings retrive successfull!',
    meta: {
      totalData: totalBookings,
      totalPage: totalPages,
      currentPage: page,
      limit: limit,
    },
    data: bookings,
  });
};

// controller for retrive upcomming bookings by userId
const retriveUpcommingBookingsByUserId = async (req: Request, res: Response) => {
  const { userId } = req.params;
  if (!userId) {
    throw new CustomError.BadRequestError('Missing userId in request params!');
  }

  const bookings = await bookingServices.getUpcommingBookingsByUserId(userId);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    status: 'success',
    message: 'Upcomming bookings retrive successfull!',
    data: bookings,
  });
};

export default {
  createBooking,
  getBookingsByUserId,
  getBookingsByOutletId,
  getBookingsByServiceId,
  retriveUpcommingBookingsByUserId,
};
