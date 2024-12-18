import express from 'express';
import bookingControllers from './booking.controllers';
import authorization from '../../middlewares/authorization';
import requestValidator from '../../middlewares/requestValidator';
import BookingValidationZodSchema from './booking.validation';

const bookingRouter = express.Router();

bookingRouter.post(
  '/create',
  authorization('user'),
  requestValidator(BookingValidationZodSchema.createBookingZodSchema),
  bookingControllers.createBooking,
);
bookingRouter.get('/retrive/user/:userId', authorization('user', 'outlet', 'super-admin', 'admin'), bookingControllers.getBookingsByUserId);
bookingRouter.get(
  '/retrive/outlet/:outletId',
  authorization('user', 'outlet', 'super-admin', 'admin'),
  bookingControllers.getBookingsByOutletId,
);
bookingRouter.get(
  '/retrive/service/:serviceId',
  authorization('user', 'outlet', 'super-admin', 'admin'),
  bookingControllers.getBookingsByServiceId,
);

export default bookingRouter;
