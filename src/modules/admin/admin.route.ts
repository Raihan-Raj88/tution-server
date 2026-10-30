import express from 'express';
import { adminControllers } from './admin.controller';

const router = express.Router();

router.get('/stats', adminControllers.getStats);
router.get('/pending', adminControllers.getPendingUsers);
router.patch('/approve/:id', adminControllers.approveUser);
router.patch('/reject/:id', adminControllers.rejectUser);
router.get('/users', adminControllers.getAllUsers);
router.get('/teachers', adminControllers.getAllTeachers);
router.get('/students', adminControllers.getAllStudents);
router.get('/posts', adminControllers.getAllPosts);
router.get('/blogs', adminControllers.getAllBlogs);
router.delete('/user/:id', adminControllers.deleteUser);
router.delete('/teacher/:id', adminControllers.deleteTeacher);
router.delete('/student/:id', adminControllers.deleteStudent);
router.delete('/post/:id', adminControllers.deletePost);
router.delete('/blog/:id', adminControllers.deleteBlog);

export const adminRoutes = router;
