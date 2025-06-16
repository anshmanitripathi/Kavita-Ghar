import React from "react";
import { Link } from "react-router-dom";
// import { NoProfile } from "../assets";

export const FriendsCard = ({ friends }) => {
  return (
    <div className='w-full'>
      <div className='w-full bg-[#f0f4ef] shadow-md rounded-xl px-5 py-5'>
        {/* Header */}
        <div className='flex items-center justify-between text-[#52616b] font-semibold pb-3 border-b border-[#c9d6df]'>
          <span>Friends</span>
          <span>{friends?.length}</span>
        </div>

        {/* Friend List */}
        <div className='flex flex-col gap-4 pt-4'>
          {friends?.length === 0 && (
            <p className='text-sm text-[#52616b]'>No friends to display.</p>
          )}

          {friends?.map((friend) => (
            <Link
              to={`/profile/${friend?._id}`}
              key={friend?._id}
              className='flex items-center gap-4 hover:bg-[#c9d6df33] p-2 rounded-lg transition duration-200 ease-in-out'
            >
              <img
                src={friend?.profileUrl ?? NoProfile}
                alt={`${friend?.firstName} ${friend?.lastName}`}
                className='w-10 h-10 rounded-full object-cover'
              />
              <div className='flex flex-col justify-center'>
                <p className='text-sm font-medium text-[#52616b]'>
                  {friend?.firstName} {friend?.lastName}
                </p>
                <span className='text-xs text-[#6c757d]'>
                  {friend?.profession ?? "No Profession"}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
