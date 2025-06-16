import { useState } from "react";
import { BiLike, BiSolidLike, BiComment } from "react-icons/bi";
import { MdOutlineDeleteOutline } from "react-icons/md";
import moment from "moment";
import { Link } from "react-router-dom";

export const PostCard = ({ post, user, deletePost, likePost }) => {
  const [showAll, setShowAll] = useState(0);
  const [showReply, setShowReply] = useState(0);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [replyComments, setReplyComments] = useState(0);
  const [showComments, setShowComments] = useState(0);

  const getComments = async () => {
    setReplyComments(0);
    setComments(postComments);
    setLoading(false);
  };

  const handleLike = async () => {};

  return (
    <div className='mb-4 bg-[#EEEFE0] p-4 rounded-2xl shadow-sm'>
      <div className='flex gap-3 items-center mb-3'>
        <Link to={"/profile/" + post?.userId?._id}>
          <img
            src={post?.userId?.profileUrl ?? ""}
            alt={post?.userId?.firstName}
            className='w-12 h-12 md:w-14 md:h-14 object-cover rounded-full border border-[#a1baa2]'
          />
        </Link>

        <div className='flex-1 flex justify-between items-center'>
          <div>
            <Link to={"/profile/" + post?.userId?._id}>
              <p className='font-semibold text-[#4c6c60] text-base md:text-lg'>
                {post?.userId?.firstName} {post?.userId?.lastName}
              </p>
            </Link>
            <span className='text-[#4c6c60] text-sm opacity-75'>
              {post?.userId?.location}
            </span>
          </div>

          <span className='text-xs md:text-sm text-[#4c6c60] opacity-60'>
            {moment(post?.createdAt ?? "2023-05-25").fromNow()}
          </span>
        </div>
      </div>

      <div>
        <p className='text-[#3d584e] whitespace-pre-wrap'>
          {showAll === post?._id ? post?.description : post?.description.slice(0, 300)}

          {post?.description?.length > 301 &&
            (showAll === post?._id ? (
              <span
                className='text-[#a1baa2] ml-2 cursor-pointer font-medium'
                onClick={() => setShowAll(0)}
              >
                Show Less
              </span>
            ) : (
              <span
                className='text-[#a1baa2] ml-2 cursor-pointer font-medium'
                onClick={() => setShowAll(post?._id)}
              >
                Show More
              </span>
            ))}
        </p>

        {post?.image && (
          <img
            src={post?.image}
            alt='post image'
            className='w-full mt-4 rounded-lg border border-[#d1d8be]'
          />
        )}
      </div>

      <div className='mt-4 flex flex-col sm:flex-row sm:justify-between items-start sm:items-center px-2 py-3 border-t border-[#d1d8be]'>
        <p className='flex gap-2 items-center text-sm text-[#4c6c60] cursor-pointer'>
          {post?.likes?.includes(user?._id) ? (
            <BiSolidLike size={20} color='#a1baa2' />
          ) : (
            <BiLike size={20} />
          )}
          {post?.likes?.length} Likes
        </p>

        <p
          className='flex gap-2 items-center text-sm text-[#4c6c60] cursor-pointer mt-2 sm:mt-0'
          onClick={() => {
            setShowComments(showComments === post._id ? null : post._id);
            getComments(post?._id);
          }}
        >
          <BiComment size={20} />
          {post?.comments?.length} Comments
        </p>

        {user?._id === post?.userId?._id && (
          <div
            className='flex gap-1 items-center text-sm text-[#d14949] cursor-pointer mt-2 sm:mt-0'
            onClick={() => deletePost(post?._id)}
          >
            <MdOutlineDeleteOutline size={20} />
            <span>Delete</span>
          </div>
        )}
      </div>

      {showComments === post?._id && (
        <div className='mt-4 border-t border-[#d1d8be] pt-4'>
          <p className='text-center text-sm text-[#4c6c60] py-4'>
            No comments yet — be the first to share your thoughts!
          </p>
        </div>
      )}
    </div>
  );
};
