import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { LiaEditSolid } from "react-icons/lia";
import {
  BsBriefcase,
  BsFacebook,
  BsInstagram,
  BsPersonFillAdd,
} from "react-icons/bs";
import { FaTwitterSquare } from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";
import moment from "moment";

// import { NoProfile } from "../assets";
import { UpdateProfile } from "../redux/userSlice";

export const ProfileCard = ({ user }) => {
  const { user: data } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  return (
    <div className='w-full'>
      <div className='w-full bg-[#D1D8BE] flex flex-col items-center shadow-md rounded-xl px-4 sm:px-6 py-6'>
        {/* Header */}
        <div className='w-full flex flex-col sm:flex-row items-start sm:items-center justify-between border-b pb-5 border-[#66666645] gap-4'>
          <Link to={"/profile/" + user?._id} className='flex items-center gap-3'>
            <img
            //   src={user?.profileUrl ?? NoProfile}
            //   alt={user?.email}
              className='w-14 h-14 sm:w-16 sm:h-16 object-cover rounded-full'
            />
            <div>
              <p className='text-lg sm:text-xl font-medium text-[#52616b]'>
                {user?.firstName} {user?.lastName}
              </p>
              <span className='text-sm text-[#6b7a88]'>
                {user?.profession ?? "No Profession"}
              </span>
            </div>
          </Link>

          {user?._id === data?._id ? (
            <LiaEditSolid
              size={22}
              className='text-[#4c6c60] cursor-pointer'
              onClick={() => dispatch(UpdateProfile(true))}
            />
          ) : (
            <button
              className='bg-[#0444a430] text-sm text-white p-1 rounded'
              onClick={() => {}}
            >
              <BsPersonFillAdd size={20} className='text-[#0f52b6]' />
            </button>
          )}
        </div>

        {/* Location & Profession */}
        <div className='w-full flex flex-col gap-2 py-4 border-b border-[#66666645] text-sm'>
          <div className='flex gap-2 items-center text-[#6b7a88]'>
            <CiLocationOn className='text-lg text-[#52616b]' />
            <span>{user?.location ?? "Add Location"}</span>
          </div>
          <div className='flex gap-2 items-center text-[#6b7a88]'>
            <BsBriefcase className='text-base text-[#52616b]' />
            <span>{user?.profession ?? "Add Profession"}</span>
          </div>
        </div>

        {/* Stats */}
        <div className='w-full flex flex-col gap-3 py-4 border-b border-[#66666645] text-sm'>
          <p className='text-lg font-semibold text-[#4c6c60]'>
            {user?.friends?.length} Friends
          </p>

          <div className='flex items-center justify-between'>
            <span className='text-[#6b7a88]'>Who viewed your profile</span>
            <span className='text-[#4c6c60] font-medium text-base'>
              {user?.views?.length}
            </span>
          </div>

          <span className={`text-sm ${user?.verified ? "text-green-600" : "text-red-500"}`}>
            {user?.verified ? "Verified Account" : "Not Verified"}
          </span>

          <div className='flex items-center justify-between'>
            <span className='text-[#6b7a88]'>Joined</span>
            <span className='text-[#4c6c60] text-base'>
              {moment(user?.createdAt).fromNow()}
            </span>
          </div>
        </div>

        {/* Social Profiles */}
        <div className='w-full flex flex-col gap-4 pt-4'>
          <p className='text-[#4c6c60] text-lg font-semibold'>Social Profile</p>

          <div className='flex gap-2 items-center text-[#6b7a88]'>
            <BsInstagram className='text-xl text-[#4c6c60]' />
            <span>Instagram</span>
          </div>
          <div className='flex gap-2 items-center text-[#6b7a88]'>
            <FaTwitterSquare className='text-xl text-[#4c6c60]' />
            <span>Twitter</span>
          </div>
          <div className='flex gap-2 items-center text-[#6b7a88]'>
            <BsFacebook className='text-xl text-[#4c6c60]' />
            <span>Facebook</span>
          </div>
        </div>
      </div>
    </div>
  );
};
