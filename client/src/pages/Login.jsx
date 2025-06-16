import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { TbPencil } from "react-icons/tb";
import { CustomButton } from "../components/CustomButton";
import { Loading } from "../components/Loading";
import { TextInput } from "../components/TextInput";

export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const onSubmit = async (data) => { };

  const [errMsg, setErrMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();

  return (
    <div className='bg-[#EEEFE0] w-full min-h-screen flex items-center justify-center p-4'>
      <div className='w-full max-w-5xl flex flex-col lg:flex-row bg-[#D1D8BE] rounded-xl overflow-hidden shadow-md'>

        {/* LEFT SECTION */}
        <div className='w-full lg:w-1/2 p-6 sm:p-8 md:p-12 flex flex-col justify-center'>
          <div className='flex gap-2 items-center mb-4 sm:mb-6'>
            <div className='p-2 bg-[#4c6c60] rounded text-white'>
              <TbPencil />
            </div>
            <span className='text-xl sm:text-2xl text-[#4c6c60] font-semibold'>
              Kavita Ghar
            </span>
          </div>

          <p className='text-base font-semibold text-ascent-1'>Log in to your account</p>
          <span className='text-sm mt-2 text-ascent-2'>Welcome back</span>

          <form onSubmit={handleSubmit(onSubmit)} className='py-6 flex flex-col gap-5'>
            <TextInput
              name='email'
              placeholder='email@example.com'
              label='Email Address'
              type='email'
              register={register("email", {
                required: "Email Address is required",
              })}
              styles='w-full rounded-full'
              labelStyle='ml-2'
              error={errors.email?.message}
            />

            <TextInput
              name='password'
              label='Password'
              placeholder='Password'
              type='password'
              styles='w-full rounded-full'
              labelStyle='ml-2'
              register={register("password", {
                required: "Password is required!",
              })}
              error={errors.password?.message}
            />

            <Link
              to='/reset-password'
              className='text-sm text-right text-[#3d584e] my-2'
            >
              Forgot Password?
            </Link>

            {errMsg?.message && (
              <span className={`text-sm ${errMsg?.status === "failed" ? "text-[#f64949fe]" : "text-[#3d584e]"}`}>
                {errMsg?.message}
              </span>
            )}

            {isSubmitting ? (
              <Loading />
            ) : (
              <CustomButton
                type='submit'
                title='Login'
                containerStyles='inline-flex justify-center rounded-md bg-[#4c6c60] px-8 py-3 text-sm font-medium text-white outline-none hover:bg-[#3d584e]'
              />
            )}
          </form>

          <p className='text-sm text-ascent-2 text-center'>
            Don't have an account?
            <Link to='/register' className='text-[#4c6c60] font-semibold ml-1 cursor-pointer'>
              Create Account
            </Link>
          </p>
        </div>

        {/* RIGHT SECTION */}
        <div className='hidden lg:flex w-full lg:w-1/2 flex-col items-center justify-center bg-[#a1baa2] py-10 px-4'>
          <div className='w-full flex items-center justify-center mb-6'>
            <img
              src='src/assets/kg.png'
              alt='Kavita Ghar'
              className='w-40 h-40 sm:w-48 sm:h-48 2xl:w-64 2xl:h-64 rounded-full object-cover'
            />
          </div>
          <div className='text-center'>
            <p className='text-black text-base sm:text-lg'>
              Where words find their home,
            </p>
            <span className='text-sm sm:text-base text-black/80'>
              and hearts find their voice.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
