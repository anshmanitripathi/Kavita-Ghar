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
    <div className='bg-[#EEEFE0] w-full h-[100vh] flex items-center
     justify-center p-6'>
      <div className='w-full md:w-2/3 h-fit lg:h-full 2xl:h-5/6 py-8 lg:py-0 
      flex bg-[#D1D8BE] rounded-xl overflow-hidden shadow-md'>
        {/* left */}
        <div className='w-full lg:w-1/2 h-full p-10 2xl:px-20 flex flex-col justify-center'>
          <div className='w-full flex gap-2 items-center mb-6'>
            <div className='p-2 bg-[#4c6c60] rounded text-white'>
              <TbPencil />
            </div>
            <span className='text-2xl text-[#4c6c60] font-semibold'>
              Kavita Ghar
            </span>
          </div>
          <p className='text-ascent-1 text-base font-semibold'>
            Log in to your account
          </p>
          <span className='text-sm mt-2 text-ascent-2'>Welcome back</span>

          <form
            className='py-8 flex flex-col gap-5='
            onSubmit={handleSubmit(onSubmit)}
          >
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
              error={errors.email ? errors.email.message : ""}
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
              error={errors.password ? errors.password?.message : ""}
            />

            <Link
              to='/reset-password'
              className='text-sm text-right text-[hsl(157,22%,21%)] my-2'
            >
              Forgot Password ?
            </Link>

            {errMsg?.message && (
              <span
                className={`text-sm ${errMsg?.status == "failed"
                    ? "text-[#f64949fe]"
                    : "text-[#a1832bfe]"
                  } mt-0.5`}
              >
                {errMsg?.message}
              </span>
            )}

            {isSubmitting ? (
              <Loading />
            ) : (
              <CustomButton
                type='submit'
                containerStyles={`inline-flex justify-center rounded-md bg-[#4c6c60] px-8 py-3 text-sm font-medium text-white outline-none hover:bg-[#3d584e]`}
                title='Login'
              />
            )}
          </form>

          <p className='text-ascent-2 text-sm text-center'>
            Don't have an account?
            <Link
              to='/register'
              className='text-[#4c6c60] font-semibold ml-2 cursor-pointer'
            >
              Create Account
            </Link>
          </p>
        </div>
        {/* RIGHT */}
        <div className='hidden w-1/2 h-full lg:flex flex-col items-center justify-center bg-[#a1baa2]'>
          <div className='relative w-full flex items-center justify-center'>
            <img
              src="\src\assets\kg.png"
              alt='Kavita Ghar'
              className='w-48 2xl:w-64 h-48 2xl:h-64 rounded-full object-cover'
            />
          </div>

          <div className='mt-16 text-center'>
            <p className='text-[black/90] text-base'>
              Where words find their home, 
            </p>
            <span className='text-sm text-[black/90]'>
              and hearts find their voice.
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}


// button - #4c6c60
// ui bg - #EEEFE0
// primary- #D1D8BE
// secondry - #a1baa2
// hover:bg-[#3d584e]