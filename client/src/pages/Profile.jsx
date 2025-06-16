import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { CustomButton } from "../components/CustomButton";
import { EditProfile } from "../components/EditProfile";
import { FriendsCard } from "../components/FriendsCard";
import { Loading } from "../components/Loading";
import { PostCard } from "../components/PostCard";
import { ProfileCard } from "../components/ProfileCard";
import { TextInput } from "../components/TextInput";
import { TopBar } from "../components/TopBar";
import { posts } from "../assets/data"; // Assuming renamed 'posts' to 'poems'

export const Profile = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [userInfo, setUserInfo] = useState(user);
  const [loading, setLoading] = useState(false);

  const handleDeletePost = () => { };
  const handleLikePost = () => { };

  return (
    <>
      <div className="w-full px-0 lg:px-10 pb-20 2xl:px-40 bg-bgColor lg:rounded-lg h-screen overflow-hidden">
        <TopBar />

        <div className="w-full flex gap-2 lg:gap-4 md:pl-4 pt-5 pb-10 h-full">
          {/* LEFT SIDEBAR */}
          <aside className="hidden w-1/3 lg:w-1/4 md:flex flex-col gap-6 overflow-y-auto">
            <ProfileCard user={userInfo} />

            <div className="block lg:hidden">
              <FriendsCard friends={userInfo?.friends} />
            </div>
          </aside>

          {/* CENTER */}
          <main className="flex-1 h-full bg-primary px-4 flex flex-col gap-6 overflow-y-auto rounded-xl">
            {loading ? (
              <Loading />
            ) : posts?.length > 0 ? (
              posts?.map((post) => (
                <PostCard
                  key={post?._id}
                  post={post}
                  user={user}
                  deletePost={handleDeletePost}
                  likePost={handleLikePost}
                />
              ))
            ) : (
              <div className="flex w-full h-full items-center justify-center">
                <p className="text-lg text-ascent-2">No Kavita Available</p>
              </div>
            )}
          </main>

          {/* RIGHT SIDEBAR */}
          <aside className="hidden w-1/4 h-full lg:flex flex-col gap-8 overflow-y-auto">
            <FriendsCard friends={userInfo?.friends} />
          </aside>
        </div>
      </div>
    </>
  );
};

