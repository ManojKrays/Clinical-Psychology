import React, { useState } from "react";
import { useForm } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar, Eye, EyeClosed, Loader } from "lucide-react";
import EmailVerification from "@/components/email-verification";
import { useNavigate } from "react-router-dom";
import { errorNotify, successNotify } from "@/utils/MessageBar";
import apiDetails from "@/config/apiDetails";
import { post } from "@/config/network";
import ButtonLoader from "@/components/ButtonLoader";

type FormData = {
  name: string;
  email: string;
  phone: string;
  password: string;
  dob: string;
  gender: string;
  address: string;
};

const Signup = () => {
  const form = useForm<FormData>({ mode: "onSubmit" });
  const {
    handleSubmit,
    reset,
    watch,
    control,
    formState: { errors, isSubmitted },
  } = form;
  const email = watch("email");
  const navigate = useNavigate();
  const [otpValue, setOtpValue] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [sendingOtp, setSendingOtp] = useState(false);
  const [verifyingOtp, setVerifyingOtp] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data: FormData) => {
    console.log("Form data:", data);
    if (!isEmailVerified) {
      errorNotify("Please verify your email before registering.");
      return;
    }

    setIsProcessing(true);
    try {
      const response = await post(apiDetails.endPoint.signUp, {
        name: data?.name,
        email: data?.email,
        password: data?.password,
        phone: data?.phone,
        address: data?.address,
        dob: data?.dob,
        gender: data?.gender,
      });
      console.log("eer", response);

      if (response.status) {
        successNotify(response?.data?.message);
        reset();
        navigate("/login");
      } else {
        errorNotify("Please check the Details");
      }
    } catch (error) {
      errorNotify(error.message);
      console.error("Signup error:", error.message);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="pt-24 pb-10  md:pt-30">
      <div className="mx-auto md:w-[80%] w-[90%] rounded-lg bg-white p-10 shadow-lg">
        <h2 className="mb-2 text-xl font-bold">Registration</h2>
        <h4 className="text-primary mb-6 text-base">Basic Information</h4>

        <Form {...form}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-1 gap-6 md:grid-cols-2"
          >
            <FormField
              control={control}
              name="name"
              rules={{ required: true }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={errors.name ? "text-red-600" : ""}>
                    Name{" "}
                    {isSubmitted && errors.name && (
                      <span className="text-red-600">*</span>
                    )}
                  </FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter your name" />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="relative">
              <FormField
                control={control}
                name="email"
                rules={{
                  required: true,
                  pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={errors.email ? "text-red-600" : ""}>
                      Email{" "}
                      {isSubmitted && errors.email && (
                        <span className="text-red-600">*</span>
                      )}
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        placeholder="Enter your Email"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <EmailVerification
                email={email}
                purpose={"client-register"}
                otpVerified={isEmailVerified}
                setOtpVerifiedExternally={setIsEmailVerified}
                otpValue={otpValue}
                otpSent={otpSent}
                sendingOtp={sendingOtp}
                verifyingOtp={verifyingOtp}
                setOtpSent={setOtpSent}
                setOtpValue={setOtpValue}
                setSendingOtp={setSendingOtp}
                setVerifyingOtp={setVerifyingOtp}
              />
            </div>

            <FormField
              control={control}
              name="phone"
              rules={{
                required: true,
                validate: (value) => {
                  const cleaned = value.replace(/\D/g, "");
                  return cleaned.length >= 10 && cleaned.length <= 15;
                },
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={errors.phone ? "text-red-600" : ""}>
                    Phone Number{" "}
                    {isSubmitted && errors.phone && (
                      <span className="text-red-600">*</span>
                    )}
                  </FormLabel>
                  <FormControl>
                    <PhoneInput
                      {...field}
                      country="in"
                      enableSearch
                      inputStyle={{ width: "100%" }}
                      placeholder="+91 98765 43210"
                      specialLabel=""
                      onChange={(value) => field.onChange(value)}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="password"
              rules={{
                required: true,
                minLength: 8,
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={errors.password ? "text-red-600" : ""}>
                    Password{" "}
                    {isSubmitted && errors.password && (
                      <span className="text-red-600">*</span>
                    )}
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        type={showPassword ? "text" : "password"}
                        placeholder="At least 8 characters"
                      />
                      <span
                        className="absolute right-3 top-2.5 cursor-pointer text-gray-600"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <Eye size={20} />
                        ) : (
                          <EyeClosed size={20} />
                        )}
                      </span>
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="dob"
              rules={{ required: true }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={errors.dob ? "text-red-600" : ""}>
                    Date of Birth{" "}
                    {isSubmitted && errors.dob && (
                      <span className="text-red-600">*</span>
                    )}
                  </FormLabel>
                  <FormControl>
                    <div className="relative w-full">
                      <input
                        {...field}
                        type="date"
                        className="w-full rounded border px-4 py-2 pr-3 text-gray-700 appearance-none"
                      />
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="gender"
              rules={{ required: true }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={errors.gender ? "text-red-600" : ""}>
                    Gender{" "}
                    {isSubmitted && errors.gender && (
                      <span className="text-red-600">*</span>
                    )}
                  </FormLabel>
                  <FormControl>
                    <select
                      {...field}
                      className="w-full rounded border border-gray-300 px-3 py-2"
                    >
                      <option value="">-- Select Gender --</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="address"
              rules={{ required: true, minLength: 10 }}
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel className={errors.address ? "text-red-600" : ""}>
                    Address{" "}
                    {isSubmitted && errors.address && (
                      <span className="text-red-600">*</span>
                    )}
                  </FormLabel>
                  <FormControl>
                    <textarea
                      {...field}
                      rows={4}
                      placeholder="Enter your full address"
                      className="w-full resize-none rounded border border-gray-300 px-3 py-2"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="md:col-span-2 text-center">
              <Button
                type="submit"
                variant="cta"
                className="md:w-[300px] w-[200px]"
                disabled={isProcessing || !isEmailVerified}
              >
                {isProcessing
                  ? isProcessing && (
                      <div className="flex items-center justify-center">
                        <ButtonLoader />
                      </div>
                    )
                  : "Submit"}
              </Button>
            </div>
          </form>
        </Form>
        {
          <div className="flex items-center  justify-center gap-4 pt-5">
            <hr className="flex-1" />
            <span className="text-sm text-gray-400">{"OR"}</span>
            <hr className="flex-1" />
          </div>
        }
        <p className="text-center text-sm font-bold lg:pr-20">
          {"Already have an account ?"}{" "}
          <span
            className="text-secondary cursor-pointer"
            onClick={() => {
              navigate("/login");
            }}
          >
            {"Sign In"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
