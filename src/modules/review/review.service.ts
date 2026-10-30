import httpStatus from 'http-status';
import AppError from '../../app/errors/AppError';
import { Review } from './review.model';
import { TReview } from './review.interface';

const createReviewIntoDB = async (payload: TReview) => {
  const existing = await Review.findOne({
    teacherId: payload.teacherId,
    studentId: payload.studentId,
  });
  if (existing) {
    throw new AppError(httpStatus.BAD_REQUEST, 'You have already reviewed this teacher.');
  }
  return await Review.create(payload);
};

const getTeacherReviewsFromDB = async (teacherId: string) => {
  const reviews = await Review.find({ teacherId }).sort({ createdAt: -1 });
  const total = reviews.length;
  const avgRating = total > 0
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / total
    : 0;
  return { reviews, avgRating: parseFloat(avgRating.toFixed(1)), total };
};

const deleteReviewFromDB = async (id: string) => {
  const review = await Review.findByIdAndDelete(id);
  if (!review) throw new AppError(httpStatus.NOT_FOUND, 'Review not found');
  return review;
};

export const reviewServices = {
  createReviewIntoDB,
  getTeacherReviewsFromDB,
  deleteReviewFromDB,
};
