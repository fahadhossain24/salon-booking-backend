import { Request, Response } from 'express';
import feedbackServices from './feedback.services';
import CustomError from '../../errors';
import sendResponse from '../../../shared/sendResponse';
import { StatusCodes } from 'http-status-codes';
import mongoose from 'mongoose';

// controller for create or update new feedback
const createOrUpdateFeedback = async (req: Request, res: Response) => {
  const feedbackData = req.body;

  // Ensure outletId is a valid ObjectId
  feedbackData.outlet.outletId = new mongoose.Types.ObjectId(feedbackData.outlet.outletId);

  const existFeedback = await feedbackServices.getSpecificFeedbackByUserIdAndOutletId(
    feedbackData.user.userId,
    feedbackData.outlet.outletId,
  );

  let feedback;
  if (existFeedback) {
    feedback = await feedbackServices.updateSpecificFeedbackByUserIdAndoutletId(
      feedbackData.user.userId,
      feedbackData.outlet.outletId,
      feedbackData,
    );
  } else {
    feedback = await feedbackServices.createFeedback(feedbackData);
  }

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    status: 'success',
    message: `Feedback operation successful!`,
    data: feedback,
  });
};

export default {
  createOrUpdateFeedback,
};
