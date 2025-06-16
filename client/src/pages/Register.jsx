import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { TbPencil } from "react-icons/tb";
import { CustomButton } from "../components/CustomButton";
import { TextInput } from "../components/TextInput";
import { Loading } from "../components/Loading";

export const Register = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const onSubmit = async (data) => {};

  const [errMsg, setErrMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();

  return (
    <div className='bg-[#EEEFE0] min-h-screen flex items-center justify-center p-4'>
      <div className='w-full max-w-5xl flex flex-col lg:flex-row bg-[#D1D8BE] rounded-xl overflow-hidden shadow-md'>
        
        {/* LEFT FORM SECTION */}
        <div className='w-full lg:w-1/2 p-6 sm:p-8 md:p-12 flex flex-col justify-center'>
          <div className='flex gap-2 items-center mb-4 sm:mb-6'>
            <div className='p-2 bg-[#4c6c60] rounded text-white'>
              <TbPencil />
            </div>
            <span className='text-xl sm:text-2xl text-[#4c6c60] font-semibold'>
              Kavita Ghar
            </span>
          </div>

          <p className='text-base font-semibold text-ascent-1'>Create your account</p>

          <form onSubmit={handleSubmit(onSubmit)} className='py-6 flex flex-col gap-4'>
            <div className='flex flex-col lg:flex-row gap-2'>
              <TextInput
                name='firstName'
                label='First Name'
                placeholder='First Name'
                type='text'
                styles='w-full rounded-full'
                labelStyle='ml-2'
                register={register("firstName", {
                  required: "First Name is required!",
                })}
                error={errors.firstName?.message}
              />
              <TextInput
                name='lastName'
                label='Last Name'
                placeholder='Last Name'
                type='text'
                styles='w-full rounded-full'
                labelStyle='ml-2'
                register={register("lastName", {
                  required: "Last Name is required!",
                })}
                error={errors.lastName?.message}
              />
            </div>

            <TextInput
              name='email'
              placeholder='email@example.com'
              label='Email Address'
              type='email'
              styles='w-full rounded-full'
              labelStyle='ml-2'
              register={register("email", {
                required: "Email Address is required",
              })}
              error={errors.email?.message}
            />

            <div className='flex flex-col lg:flex-row gap-2'>
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
              <TextInput
                name='cPassword'
                label='Confirm Password'
                placeholder='Password'
                type='password'
                styles='w-full rounded-full'
                labelStyle='ml-2'
                register={register("cPassword", {
                  validate: (value) =>
                    value === getValues("password") || "Passwords do not match",
                })}
                error={errors.cPassword?.message}
              />
            </div>

            {errMsg?.message && (
              <span
                className={`text-sm ${
                  errMsg.status === "failed" ? "text-[#f64949fe]" : "text-[#3d584e]"
                }`}
              >
                {errMsg.message}
              </span>
            )}

            {isSubmitting ? (
              <Loading />
            ) : (
              <CustomButton
                type='submit'
                title='Create Account'
                containerStyles='inline-flex justify-center rounded-md bg-[#4c6c60] px-8 py-3 text-sm font-medium text-white outline-none hover:bg-[#3d584e]'
              />
            )}
          </form>

          <p className='text-sm text-ascent-2 text-center'>
            Already have an account?
            <Link
              to='/login'
              className='text-[#4c6c60] font-semibold ml-1 cursor-pointer'
            >
              Login
            </Link>
          </p>
        </div>

        {/* RIGHT IMAGE SECTION */}
        <div className='w-full lg:w-1/2 bg-[#a1baa2] flex flex-col items-center justify-center py-10 px-4 '>
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
