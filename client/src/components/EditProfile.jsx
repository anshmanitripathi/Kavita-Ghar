import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { MdClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {TextInput} from "./TextInput";
import {Loading} from "./Loading";
import { CustomButton } from "./CustomButton";
import { UpdateProfile } from "../redux/userSlice";

export const EditProfile = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [errMsg, setErrMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [picture, setPicture] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: { ...user },
  });

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      setErrMsg("");

      // FormData for image + data
      const formData = new FormData();
      for (const key in data) {
        formData.append(key, data[key]);
      }
      if (picture) formData.append("profile", picture);

      // You can add your API call here to update the user
      // await api.updateProfile(formData);

      // Example dispatch or notification here
      dispatch(UpdateProfile(false));
    } catch (error) {
      setErrMsg({ status: "failed", message: "Failed to update profile." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    dispatch(UpdateProfile(false));
  };

  const handleSelect = (e) => {
    setPicture(e.target.files[0]);
  };

  return (
    <div className='fixed z-50 inset-0 overflow-y-auto'>
      <div className='flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
        <div className='fixed inset-0 transition-opacity'>
          <div className='absolute inset-0 bg-[#000] opacity-70'></div>
        </div>
        <span className='hidden sm:inline-block sm:align-middle sm:h-screen'></span>
        &#8203;
        <div
          className='inline-block align-bottom bg-primary rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full'
          role='dialog'
          aria-modal='true'
          aria-labelledby='modal-headline'
        >
          <div className='flex justify-between px-6 pt-5 pb-2'>
            <label className='block font-medium text-xl text-ascent-1 text-left'>
              Edit Profile
            </label>
            <button className='text-ascent-1' onClick={handleClose}>
              <MdClose size={22} />
            </button>
          </div>

          <form
            className='px-4 sm:px-6 flex flex-col gap-3 2xl:gap-6'
            onSubmit={handleSubmit(onSubmit)}
          >
            <TextInput
              name='firstName'
              label='First Name'
              placeholder='First Name'
              type='text'
              styles='w-full'
              register={register("firstName", {
                required: "First Name is required!",
              })}
              error={errors.firstName?.message || ""}
            />

            <TextInput
              name='lastName'
              label='Last Name'
              placeholder='Last Name'
              type='text'
              styles='w-full'
              register={register("lastName", {
                required: "Last Name is required!",
              })}
              error={errors.lastName?.message || ""}
            />

            <TextInput
              name='profession'
              label='Profession'
              placeholder='Profession'
              type='text'
              styles='w-full'
              register={register("profession", {
                required: "Profession is required!",
              })}
              error={errors.profession?.message || ""}
            />

            <TextInput
              name='location'
              label='Location'
              placeholder='Location'
              type='text'
              styles='w-full'
              register={register("location", {
                required: "Location is required!",
              })}
              error={errors.location?.message || ""}
            />

            <label
              className='flex items-center gap-1 text-base text-ascent-2 hover:text-ascent-1 cursor-pointer my-4'
              htmlFor='imgUpload'
            >
              <input
                type='file'
                className='hidden'
                id='imgUpload'
                onChange={handleSelect}
                accept='.jpg, .png, .jpeg'
              />
              Upload Profile Picture
            </label>

            {errMsg?.message && (
              <span
                role='alert'
                className={`text-sm ${
                  errMsg?.status === "failed"
                    ? "text-[#f64949fe]"
                    : "text-[#2ba150fe]"
                } mt-0.5`}
              >
                {errMsg?.message}
              </span>
            )}

            <div className='py-5 sm:flex sm:flex-row-reverse border-t border-[#66666645]'>
              {isSubmitting ? (
                <Loading />
              ) : (
                <CustomButton
                  type='submit'
                  containerStyles='inline-flex justify-center rounded-md bg-blue px-8 py-3 text-sm font-medium text-white outline-none'
                  title='Submit'
                />
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
