import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { CustomButton } from "../components/CustomButton";
import { Loading } from "../components/Loading";
import { TextInput } from "../components/TextInput";

export const ResetPassword = () => {
  const [errMsg, setErrMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    // Simulate async process
    setTimeout(() => {
      setIsSubmitting(false);
      setErrMsg({ status: "success", message: "Reset link sent to email!" });
    }, 1500);
  };

  return (
    <div className='w-full min-h-screen bg-[#EEEFE0] flex items-center justify-center p-4'>
      <div className='w-full max-w-md bg-[#D1D8BE] px-6 py-8 shadow-md rounded-xl'>

        <div className='mb-4'>
          <p className='text-lg sm:text-xl font-semibold text-[#4c6c60]'>Reset Password</p>
          <span className='text-sm text-[#52616b]'>
            Enter the email you used during registration
          </span>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-5'>
          <TextInput
            name='email'
            placeholder='email@example.com'
            type='email'
            register={register("email", {
              required: "Email Address is required!",
            })}
            styles='w-full rounded-lg'
            labelStyle='ml-2'
            error={errors.email?.message}
          />

          {errMsg?.message && (
            <span
              role='alert'
              className={`text-sm ${
                errMsg.status === "failed" ? "text-[#f64949fe]" : "text-[#2ba150fe]"
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
              title='Submit'
              containerStyles='inline-flex justify-center rounded-md bg-[#4c6c60] px-8 py-3 text-sm font-medium text-white outline-none hover:bg-[#3d584e]'
            />
          )}
        </form>
      </div>
    </div>
  );
};
