import React from "react";
import { TbBook } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { TextInput } from "./TextInput";
import { CustomButton } from "./CustomButton";
import { useForm } from "react-hook-form";
import { IoMdNotificationsOutline } from "react-icons/io";
import { Logout } from "../redux/userSlice";

export const TopBar = () => {
  const { theme } = useSelector((state) => state.theme);
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const handleSearch = async (data) => {
    // Search logic here
  };

  return (
    <div className='w-full flex flex-col md:flex-row items-center justify-between gap-4 px-6 py-4 bg-[#EEEFE0] shadow-md border-b border-[#d1d8be]'>
      
      {/* Logo */}
      <Link to='/' className='flex items-center gap-3'>
        <div className='p-2 bg-[#4c6c60] rounded-full shadow'>
          <TbBook className='text-white text-2xl' />
        </div>
        <span className='text-2xl font-bold text-[#4c6c60] tracking-wide'>
          Kavita Ghar
        </span>
      </Link>

      {/* Search */}
      <form
        onSubmit={handleSubmit(handleSearch)}
        className='w-full md:w-auto flex items-center justify-center'
      >
        <TextInput
          placeholder='Search poems, writers...'
          styles='w-full md:w-[18rem] lg:w-[28rem] rounded-l-full py-2 px-4 bg-[#D1D8BE] text-[#4c6c60] placeholder:text-[#4c6c60] focus:outline-none'
          register={register("search")}
        />
        <CustomButton
          title='Search'
          type='submit'
          containerStyles='bg-[#4c6c60] hover:bg-[#3d584e] transition-colors text-white px-5 py-2 rounded-r-full'
        />
      </form>

      {/* Icons & Logout */}
      <div className='flex items-center gap-5 text-[#4c6c60] text-lg'>

        <div className='hidden md:flex items-center justify-center p-2 hover:bg-[#D1D8BE] rounded-full transition-colors cursor-pointer'>
          <IoMdNotificationsOutline className='text-2xl' />
        </div>

        <CustomButton
          onClick={() => dispatch(Logout())}
          title='Log Out'
          containerStyles='text-sm text-[#4c6c60] border border-[#4c6c60] hover:bg-[#4c6c60] hover:text-white transition-colors px-4 py-1.5 rounded-full'
        />
      </div>
    </div>
  );
};
