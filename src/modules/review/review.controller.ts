import catchAsync from '../../app/util/catchAsync';
import { sendResponse } from '../../app/util/sendResponse';
import { reviewServices } from './review.service';

const createReview = catchAsync(async (req, res) => {
  const result = await reviewServices.createReviewIntoDB(req.body);
  sendResponse(res, { statusCode: 201, success: true, message: 'Review submitted!', data: result });
});

const getTeacherReviews = catchAsync(async (req, res) => {
  const result = await reviewServices.getTeacherReviewsFromDB(req.params.teacherId);
  sendResponse(res, { statusCode: 200, success: true, message: 'Reviews fetched', data: result });
});

const deleteReview = catchAsync(async (req, res) => {
  const result = await reviewServices.deleteReviewFromDB(req.params.id);
  sendResponse(res, { statusCode: 200, success: true, message: 'Review deleted', data: result });
});

export const reviewControllers = { createReview, getTeacherReviews, deleteReview };
