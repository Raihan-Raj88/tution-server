import queryBuilderClass from '../../app/builder/queryBuilderClass';
import { TPost } from './post.interface';
import { Post } from './post.model';
import { User } from '../user/user.model';
import { Student } from '../student/student.model';

const createPostIntoDB = async (payload: TPost) => {
  const result = await Post.create(payload);
  return result;
};

const getAllPostsFromDB = async (queries: Record<string, unknown>) => {
  // only show posts from active students
  const activeUsers = await User.find({ role: 'student', status: 'active' }).select('_id');
  const activeUserIds = activeUsers.map((u) => u._id);
  const activeStudents = await Student.find({ userId: { $in: activeUserIds } }).select('userId');
  const activeStudentUserIds = activeStudents.map((s) => s.userId);

  const postsQuery = new queryBuilderClass(
    Post.find({ userId: { $in: activeStudentUserIds } }),
    queries,
  )
    .filter()
    .sort()
    .paginate();
  const result = await postsQuery.modelQuery;
  return result;
};

const getSingleUserPostsFromDB = async (id: string) => {
  const result = await Post.find({ userId: id }).sort('-createdAt');
  return result;
};
const deletePostFromDB = async (id: string) => {
  const result = await Post.findOneAndDelete({ _id: id });
  return result;
};

const updatePostInDB = async (id: string, payload: Partial<TPost>) => {
  return await Post.findByIdAndUpdate(id, payload, { new: true });
};

export const postServices = {
  createPostIntoDB, getAllPostsFromDB, getSingleUserPostsFromDB,
  updatePostInDB, deletePostFromDB,
};
