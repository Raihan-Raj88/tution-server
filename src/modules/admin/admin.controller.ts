import catchAsync from '../../app/util/catchAsync';
import { sendResponse } from '../../app/util/sendResponse';
import { adminServices } from './admin.service';

const getStats = catchAsync(async (req, res) => {
  const result = await adminServices.getStatsFromDB();
  sendResponse(res, { statusCode: 200, success: true, message: 'Stats fetched', data: result });
});

const getPendingUsers = catchAsync(async (req, res) => {
  const result = await adminServices.getPendingUsersFromDB();
  sendResponse(res, { statusCode: 200, success: true, message: 'Pending users fetched', data: result });
});

const approveUser = catchAsync(async (req, res) => {
  const result = await adminServices.approveUserFromDB(req.params.id);
  sendResponse(res, { statusCode: 200, success: true, message: 'User approved', data: result });
});

const rejectUser = catchAsync(async (req, res) => {
  const result = await adminServices.rejectUserFromDB(req.params.id);
  sendResponse(res, { statusCode: 200, success: true, message: 'User rejected', data: result });
});

const getAllUsers = catchAsync(async (req, res) => {
  const result = await adminServices.getAllUsersFromDB();
  sendResponse(res, { statusCode: 200, success: true, message: 'Users fetched', data: result });
});

const getAllTeachers = catchAsync(async (req, res) => {
  const result = await adminServices.getAllTeachersFromDB();
  sendResponse(res, { statusCode: 200, success: true, message: 'Teachers fetched', data: result });
});

const getAllStudents = catchAsync(async (req, res) => {
  const result = await adminServices.getAllStudentsFromDB();
  sendResponse(res, { statusCode: 200, success: true, message: 'Students fetched', data: result });
});

const getAllPosts = catchAsync(async (req, res) => {
  const result = await adminServices.getAllPostsFromDB();
  sendResponse(res, { statusCode: 200, success: true, message: 'Posts fetched', data: result });
});

const getAllBlogs = catchAsync(async (req, res) => {
  const result = await adminServices.getAllBlogsFromDB();
  sendResponse(res, { statusCode: 200, success: true, message: 'Blogs fetched', data: result });
});

const deleteUser = catchAsync(async (req, res) => {
  const result = await adminServices.deleteUserFromDB(req.params.id);
  sendResponse(res, { statusCode: 200, success: true, message: 'User deleted', data: result });
});

const deleteTeacher = catchAsync(async (req, res) => {
  const result = await adminServices.deleteTeacherFromDB(req.params.id);
  sendResponse(res, { statusCode: 200, success: true, message: 'Teacher deleted', data: result });
});

const deleteStudent = catchAsync(async (req, res) => {
  const result = await adminServices.deleteStudentFromDB(req.params.id);
  sendResponse(res, { statusCode: 200, success: true, message: 'Student deleted', data: result });
});

const deletePost = catchAsync(async (req, res) => {
  const result = await adminServices.deletePostFromDB(req.params.id);
  sendResponse(res, { statusCode: 200, success: true, message: 'Post deleted', data: result });
});

const deleteBlog = catchAsync(async (req, res) => {
  const result = await adminServices.deleteBlogFromDB(req.params.id);
  sendResponse(res, { statusCode: 200, success: true, message: 'Blog deleted', data: result });
});

export const adminControllers = {
  getStats, getPendingUsers, approveUser, rejectUser,
  getAllUsers, getAllTeachers, getAllStudents,
  getAllPosts, getAllBlogs, deleteUser, deleteTeacher,
  deleteStudent, deletePost, deleteBlog,
};
