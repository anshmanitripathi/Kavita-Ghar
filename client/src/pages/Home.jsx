// Updated Home component with Kavita Ghar palette and responsiveness

import React, { useState } from "react";
import { useSelector } from "react-redux";
import { CustomButton } from "../components/CustomButton";
import { EditProfile } from "../components/EditProfile";
import { FriendsCard } from "../components/FriendsCard";
import { Loading } from "../components/Loading";
import { PostCard } from "../components/PostCard";
import { ProfileCard } from "../components/ProfileCard";
import { TextInput } from "../components/TextInput";
import { TopBar } from "../components/TopBar";

import { suggest, requests, posts } from "../assets/data";
import { Link } from "react-router-dom";
import { BsFiletypeGif, BsPersonFillAdd } from "react-icons/bs";
import { BiImages, BiSolidVideo } from "react-icons/bi";
import { useForm } from "react-hook-form";

export const Home = () => {
  const { user, edit } = useSelector((state) => state.user);
  const [friendRequest, setFriendRequest] = useState(requests);
  const [suggestedFriends, setSuggestedFriends] = useState(suggest);
  const [errMsg, setErrMsg] = useState("");
  const [file, setFile] = useState(null);
  const [posting, setPosting] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handlePostSubmit = async (data) => {
    // Submit logic placeholder
  };

  return (
    <div className='w-full px-4 lg:px-10 2xl:px-40 bg-[#EEEFE0] text-[#4c6c60] min-h-screen'>
      <TopBar />
      <div className='flex flex-col lg:flex-row gap-6 pt-5'>
        {/* LEFT SIDEBAR */}
        <div className='hidden lg:flex flex-col gap-6 w-full max-w-xs'>
          <ProfileCard user={user} />
          <FriendsCard friends={user?.friends} />
        </div>

        {/* MAIN CONTENT */}
        <div className='flex-1 flex flex-col gap-6'>
          <form
            onSubmit={handleSubmit(handlePostSubmit)}
            className='bg-[#d1d8be] px-4 rounded-lg shadow-sm'
          >
            <div className='flex items-center gap-3 py-4 border-b border-[#a1baa2]'>
              <img
                src={user?.profileUrl ?? ""}
                alt='User'
                className='w-12 h-12 rounded-full object-cover'
              />
              <TextInput
                styles='w-full rounded-full py-4 bg-white text-[#4c6c60] placeholder-[#4c6c60]'
                placeholder="What's on your mind...."
                name='description'
                register={register("description", {
                  required: "Write something about post",
                })}
                error={errors.description?.message || ""}
              />
            </div>

            {errMsg?.message && (
              <span
                className={`text-sm mt-1 ${errMsg?.status === "failed"
                    ? "text-red-500"
                    : "text-green-600"
                  }`}
              >
                {errMsg?.message}
              </span>
            )}

            <div className='flex items-center justify-between py-4 text-[#3d584e]'>
              <label htmlFor='imgUpload' className='flex items-center gap-2 cursor-pointer hover:text-[#4c6c60]'>
                <input
                  type='file'
                  className='hidden'
                  id='imgUpload'
                  accept='.jpg,.jpeg,.png'
                  onChange={(e) => setFile(e.target.files[0])}
                />
                <BiImages /> Image
              </label>
              <label htmlFor='videoUpload' className='flex items-center gap-2 cursor-pointer hover:text-[#4c6c60]'>
                <input
                  type='file'
                  className='hidden'
                  id='videoUpload'
                  accept='.mp4,.wav'
                  onChange={(e) => setFile(e.target.files[0])}
                />
                <BiSolidVideo /> Video
              </label>
              <label htmlFor='gifUpload' className='flex items-center gap-2 cursor-pointer hover:text-[#4c6c60]'>
                <input
                  type='file'
                  className='hidden'
                  id='gifUpload'
                  accept='.gif'
                  onChange={(e) => setFile(e.target.files[0])}
                />
                <BsFiletypeGif /> Gif
              </label>
              <div>
                {posting ? (
                  <Loading />
                ) : (
                  <CustomButton
                    type='submit'
                    title='Post'
                    containerStyles='bg-[#4c6c60] text-white px-6 py-1 rounded-full text-sm font-semibold'
                  />
                )}
              </div>
            </div>
          </form>

          {loading ? (
            <Loading />
          ) : posts?.length > 0 ? (
            posts.map((post) => (
              <PostCard
                key={post._id}
                post={post}
                user={user}
                deletePost={() => { }}
                likePost={() => { }}
              />
            ))
          ) : (
            <p className='text-center text-[#3d584e] py-10'>No Post Available</p>
          )}
        </div>

        {/* RIGHT SIDEBAR */}
        <div className='hidden lg:flex flex-col gap-6 w-full max-w-xs'>
          {/* Friend Requests */}
          <div className='bg-[#d1d8be] rounded-lg shadow-sm p-5'>
            <div className='flex justify-between items-center text-lg border-b border-[#a1baa2] pb-2'>
              <span>Friend Requests</span>
              <span>{friendRequest.length}</span>
            </div>
            <div className='flex flex-col gap-4 pt-4'>
              {friendRequest.map(({ _id, requestFrom: from }) => (
                <div key={_id} className='flex items-center justify-between'>
                  <Link to={`/profile/${from._id}`} className='flex gap-3 items-center w-full'>
                    <img
                      src={from.profileUrl ?? ""}
                      alt={from.firstName}
                      className='w-10 h-10 rounded-full object-cover'
                    />
                    <div>
                      <p className='text-[#4c6c60] font-medium'>{from.firstName} {from.lastName}</p>
                      <p className='text-sm text-[#3d584e]'>{from.profession || 'No Profession'}</p>
                    </div>
                  </Link>
                  <div className='flex gap-1'>
                    <CustomButton
                      title='Accept'
                      containerStyles='bg-[#4c6c60] text-xs text-white px-2 py-1 rounded-full'
                    />
                    <CustomButton
                      title='Deny'
                      containerStyles='border border-[#3d584e] text-xs text-[#4c6c60] px-2 py-1 rounded-full'
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Suggested Friends */}
          <div className='bg-[#d1d8be] rounded-lg shadow-sm p-5'>
            <div className='text-lg text-[#4c6c60] border-b border-[#a1baa2] pb-2'>Friend Suggestions</div>
            <div className='flex flex-col gap-4 pt-4'>
              {suggestedFriends.map((friend) => (
                <div key={friend._id} className='flex items-center justify-between'>
                  <Link to={`/profile/${friend._id}`} className='flex gap-3 items-center w-full'>
                    <img
                      src={friend.profileUrl ?? ""}
                      alt={friend.firstName}
                      className='w-10 h-10 rounded-full object-cover'
                    />
                    <div>
                      <p className='text-[#4c6c60] font-medium'>{friend.firstName} {friend.lastName}</p>
                      <p className='text-sm text-[#3d584e]'>{friend.profession || 'No Profession'}</p>
                    </div>
                  </Link>
                  <button
                    className='bg-[#a1baa2]/30 text-sm p-1 rounded-full'
                    onClick={() => { }}
                  >
                    <BsPersonFillAdd className='text-[#4c6c60]' size={20} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {edit && <EditProfile />}
    </div>
  );
};