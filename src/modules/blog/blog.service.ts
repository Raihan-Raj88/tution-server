import httpStatus from 'http-status';
import AppError from '../../app/errors/AppError';
import { Teacher } from '../teacher/teacher.model';
import { User } from '../user/user.model';
import { Blog } from './blog.model';
import { TBlog } from './blog.interface';
import { Types } from 'mongoose';

const createBlog = async (payload: Partial<TBlog>) => {
  const userData = await Teacher.findById({ _id: payload.userId });
  if (!userData) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'you are not authorized');
  }
  return await Blog.create(payload);
};

// helper: get active teacher userIds
const getActiveTeacherIds = async () => {
  const activeUsers = await User.find({ role: 'teacher', status: 'active' }).select('_id');
  const activeUserIds = activeUsers.map((u) => u._id);
  const activeTeachers = await Teacher.find({ userId: { $in: activeUserIds } }).select('_id');
  return activeTeachers.map((t) => t._id);
};

const getBlogs = async (
  query?: string,
  excludeId?: string,
  meta?: Partial<{ page: number; limit: number }>,
) => {
  const page = meta?.page ? meta.page : 0;
  const limit = meta?.limit ? meta.limit : 5;
  const activeTeacherIds = await getActiveTeacherIds();

  const baseFilter: Record<string, unknown> = {
    isDeleted: false,
    userId: { $in: activeTeacherIds },
  };

  if (query) {
    baseFilter.$or = [
      { title: { $regex: query, $options: 'i' } },
      { keyWords: { $in: [new RegExp(query, 'i')] } },
    ];
  }
  if (excludeId) {
    baseFilter._id = { $ne: new Types.ObjectId(excludeId) };
  }

  const totalBlogs = await Blog.countDocuments(baseFilter);
  const blogs = await Blog.find(baseFilter)
    .sort({ createdAt: -1 })
    .skip(page * limit)
    .limit(limit)
    .select('title blog views keyWords photo bannerPhoto userId userName createdAt updatedAt');

  const totalPages = Math.ceil(totalBlogs / limit);
  const remainData = totalBlogs - (page + 1) * limit;

  return {
    meta: { totalBlogs, page, limit, totalPages, remainData: remainData > 0 ? remainData : 0 },
    blogs,
  };
};

// get all blogs of the specific one user;
const getUserBlogs = async (id: string) => {
  const result = await Blog.find({ userId: id, isDeleted: false }).sort({
    createdAt: -1,
  });

  return result;
};

const getBlogByID = async (id: string) => {
  const isBlogExist = await Blog.findById(id);
  if (!isBlogExist) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Not found',
      'The blog you locking for that is not our database!',
    );
  }

  const result = await Blog.findByIdAndUpdate(
    id,
    { $inc: { views: 1 } },
    { new: true },
  );

  return result;
};

const updateBlogInDB = async (id: string, payload: Partial<TBlog>) => {
  const blog = await Blog.findByIdAndUpdate(id, payload, { new: true });
  if (!blog) throw new AppError(httpStatus.NOT_FOUND, 'Blog not found');
  return blog;
};

const updateBlogViews = async (id: string) => {
  const isBlogExist = await Blog.findByIdAndUpdate(
    id,
    { $inc: { views: 1 } },
    { new: true },
  );
  if (!isBlogExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'blog is not found!');
  }

  return isBlogExist;
};

const deleteBlog = async (id: string) => {
  const isBlogExist = await Blog.findById(id);
  if (!isBlogExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'blog is not found!');
  }
  const result = await Blog.findByIdAndUpdate(id, { isDeleted: true });
  return result;
};

export const blogServices = {
  createBlog, getBlogs, getUserBlogs, getBlogByID,
  updateBlogInDB, updateBlogViews, deleteBlog,
};
