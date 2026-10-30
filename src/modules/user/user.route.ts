import express from 'express';
import { userController } from './user.controller';

const router = express.Router();

router.post('/login', userController.loginUser);
router.get('/:id/verify/:token', userController.verifyTokenLink);
router.post('/verify/email', userController.verifyEmail);

export const userRouter = router;
