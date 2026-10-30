import express from 'express';
import { reviewControllers } from './review.controller';

const router = express.Router();

router.post('/', reviewControllers.createReview);
router.get('/teacher/:teacherId', reviewControllers.getTeacherReviews);
router.delete('/:id', reviewControllers.deleteReview);

export const reviewRoutes = router;
