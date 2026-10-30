import { User } from '../user/user.model';
import { Teacher } from '../teacher/teacher.model';
import { Student } from '../student/student.model';
import { Post } from '../post/post.model';
import { Blog } from '../blog/blog.model';
import AppError from '../../app/errors/AppError';
import httpStatus from 'http-status';

const getPendingUsersFromDB = async () => {
  return await User.find({ status: 'pending', role: { $ne: 'admin' } })
    .select('-password')
    .sort({ createdAt: -1 });
};

const approveUserFromDB = async (id: string) => {
  const user = await User.findByIdAndUpdate(id, { status: 'active' }, { new: true });
  if (!user) throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  return user;
};

const rejectUserFromDB = async (id: string) => {
  const user = await User.findByIdAndUpdate(id, { status: 'rejected' }, { new: true });
  if (!user) throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  return user;
};

const getStatsFromDB = async () => {
  const [users, teachers, students, posts, blogs, pending] = await Promise.all([
    User.countDocuments(),
    Teacher.countDocuments(),
    Student.countDocuments(),
    Post.countDocuments(),
    Blog.countDocuments(),
    User.countDocuments({ status: 'pending', role: { $ne: 'admin' } }),
  ]);
  return { users, teachers, students, posts, blogs, pending };
};

const getAllUsersFromDB = async () => {
  return await User.find().select('-password').sort({ createdAt: -1 });
};

const getAllTeachersFromDB = async () => {
  return await Teacher.find().sort({ createdAt: -1 });
};

const getAllStudentsFromDB = async () => {
  return await Student.find().sort({ createdAt: -1 });
};

const getAllPostsFromDB = async () => {
  return await Post.find().sort({ createdAt: -1 });
};

const getAllBlogsFromDB = async () => {
  return await Blog.find().sort({ createdAt: -1 });
};

const deleteUserFromDB = async (id: string) => {
  const user = await User.findByIdAndDelete(id);
  if (!user) throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  await Teacher.findOneAndDelete({ userId: id });
  await Student.findOneAndDelete({ userId: id });
  return user;
};

const deleteTeacherFromDB = async (id: string) => {
  const teacher = await Teacher.findByIdAndDelete(id);
  if (!teacher) throw new AppError(httpStatus.NOT_FOUND, 'Teacher not found');
  await User.findByIdAndDelete(teacher.userId);
  return teacher;
};

const deleteStudentFromDB = async (id: string) => {
  const student = await Student.findByIdAndDelete(id);
  if (!student) throw new AppError(httpStatus.NOT_FOUND, 'Student not found');
  await User.findByIdAndDelete(student.userId);
  return student;
};

const deletePostFromDB = async (id: string) => {
  const post = await Post.findByIdAndDelete(id);
  if (!post) throw new AppError(httpStatus.NOT_FOUND, 'Post not found');
  return post;
};

const deleteBlogFromDB = async (id: string) => {
  const blog = await Blog.findByIdAndDelete(id);
  if (!blog) throw new AppError(httpStatus.NOT_FOUND, 'Blog not found');
  return blog;
};

export const adminServices = {
  getStatsFromDB,
  getPendingUsersFromDB,
  approveUserFromDB,
  rejectUserFromDB,
  getAllUsersFromDB,
  getAllTeachersFromDB,
  getAllStudentsFromDB,
  getAllPostsFromDB,
  getAllBlogsFromDB,
  deleteUserFromDB,
  deleteTeacherFromDB,
  deleteStudentFromDB,
  deletePostFromDB,
  deleteBlogFromDB,
};
