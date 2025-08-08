import { ArrowRight, Eye, EyeClosed } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import { timeslots } from "../../../utils/data";
import { post } from "../../../config/network";
import apiDetails from "../../../config/apiDetails";
import { useNavigate } from "react-router-dom";
import { errorNotify, successNotify } from "@/utils/MessageBar";
import { Button } from "@/components/ui/button";
import EmailVerification from "@/components/email-verification";
import MultiSelectField from "@/components/Multiselectoption";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { languages } from "countries-list";

const Account = ({ onPrev, formProps, emailVerified, setEmailVerified }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    getValues,
    control,
    setValue,
  } = formProps;

  const [isProcessing, setIsProcessing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpValue, setOtpValue] = useState("");
  const [sendingOtp, setSendingOtp] = useState(false);
  const [verifyingOtp, setVerifyingOtp] = useState(false);
  const [timezone, setTimezone] = useState(null);
  const emailValue = watch("email");
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    setTimezone(userTimeZone);
  }, []);

  const navigate = useNavigate();

  const handleResumeChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const maxFileSize = 2 * 1024 * 1024;

    if (file.size > maxFileSize) {
      errorNotify("File size should not exceed 2MB");
      e.target.value = "";
      setValue("resume", null, { shouldValidate: true });
      return;
    }

    try {
      setIsUploading(true);

      const formData = new FormData();
      formData.append("file", file);

      const response = await post(apiDetails.endPoint.resume_upload, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.status) {
        successNotify(response.data.message);
        setValue("resume", response.data.data, { shouldValidate: true });
      }
    } catch (error) {
      console.error("Upload error:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const onSubmit = async (data) => {
    if (!emailVerified) {
      errorNotify("Please verify your email before proceeding.");
      return;
    }
    try {
      setIsProcessing(true);
      let categories = [];
      let availableTimes = [];
      let languages = [];
      let education = [];
      categories = (data.specialties || []).map((cat) => cat.value);
      availableTimes = (data.timeSlot || []).map((tim) => tim.value);
      languages = (data.language || []).map((lang) => lang.value);
      education = (data.education || []).map((edu) => edu.value);

      const details = {
        name: data.name,
        phone: data.phone,
        email: data.email,
        linkedinUrl: data.linkedin,
        profileUrl: data.profile,
        resumeUrl: data.resume,
        yearsOfExperience: data.experience,
        password: data.password,
        categories,
        summary: data.summary,
        amount: data.amount,
        terms: data.terms,
        location: data.location,
        termsAndConditions: data.terms_condition,
        languages: languages,
        education: education,
        timezone,
        timeSlots: availableTimes,
      };
      const res = await post(apiDetails.endPoint.therapist_register, details);
      if (res.data.status) {
        successNotify(res.data.message);

        setTimeout(() => {
          navigate("/login");
        }, 500);
      }
    } catch (error) {
      console.error("Registration error:", error);
      const message = error?.message || "Something went wrong";

      errorNotify(message);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="pt-16 px-4 md:px-8">
      <form onSubmit={handleSubmit(onSubmit)} className="font-avenir space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={control}
            name="email"
            rules={{
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email address",
              },
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel className={errors.email ? "text-red-600" : ""}>
                  Email Address
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Ex: you@example.com"
                    className="bg-white"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex flex-col justify-end">
            <EmailVerification
              email={emailValue}
              purpose="therapist-register"
              otpVerified={emailVerified}
              setOtpVerifiedExternally={setEmailVerified}
              otpSent={otpSent}
              otpValue={otpValue}
              sendingOtp={sendingOtp}
              verifyingOtp={verifyingOtp}
              setOtpSent={setOtpSent}
              setOtpValue={setOtpValue}
              setSendingOtp={setSendingOtp}
              setVerifyingOtp={setVerifyingOtp}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={control}
            name="password"
            rules={{
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel className={errors.password ? "text-red-600" : ""}>
                  Password
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      {...field}
                      type={showPassword ? "text" : "password"}
                      placeholder="At least 8 characters"
                      className="bg-white"
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
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="experience"
            rules={{
              required: "Experience is required",
              min: { value: 1, message: "Experience must be at least 1" },
              validate: {
                isInteger: (value) =>
                  Number.isInteger(Number(value)) ||
                  "Only whole numbers are allowed",
              },
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel className={errors.experience ? "text-red-600" : ""}>
                  Experience
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="number"
                    inputMode="numeric"
                    placeholder="Ex: 10"
                    className="bg-white"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Controller
            name="timeSlot"
            control={control}
            rules={{
              validate: (value) =>
                value && value.length > 0
                  ? true
                  : "Please select at least one timeSlot",
            }}
            render={({ field, fieldState }) => (
              <div>
                <label
                  className={`block mb-2 font-medium ${
                    fieldState.error ? "text-red-600" : ""
                  }`}
                >
                  Time Slot
                </label>
                <MultiSelectField
                  name="timeSlot"
                  options={timeslots}
                  value={field.value}
                  onChange={field.onChange}
                />
                {fieldState.error && (
                  <p className="mt-1 text-sm text-red-500">
                    {fieldState.error.message}
                  </p>
                )}
              </div>
            )}
          />

          <Controller
            name="resume"
            control={control}
            rules={{
              required: "Resume is required",
            }}
            render={({ field }) => (
              <div>
                <label className="mb-2 block font-medium">Resume</label>
                {errors.resume && (
                  <p className="mb-1 text-sm text-red-500">
                    {errors.resume.message}
                  </p>
                )}
                <input
                  type="file"
                  accept=".pdf, .doc, .docx"
                  className="w-full rounded-md border border-gray-300 p-2"
                  onChange={(e) => {
                    field.onChange(e);
                    handleResumeChange(e);
                  }}
                  disabled={isUploading}
                />
                {isUploading && <p>Uploading...</p>}
              </div>
            )}
          />
        </div>

        <div className="flex flex-col-reverse gap-4 pt-8 md:flex-row">
          <Button
            type="button"
            onClick={onPrev}
            className="w-full md:w-1/2 bg-gray-400 text-black"
          >
            Back
          </Button>
          <button
            type="submit"
            disabled={isUploading}
            className={`w-full md:w-1/2 rounded-md bg-secondary px-3 py-2 text-white ${
              isUploading ? "cursor-not-allowed" : "cursor-pointer"
            }`}
          >
            {isProcessing ? (
              "Loading..."
            ) : (
              <div className="flex items-center justify-center gap-2">
                Create Account <ArrowRight size={16} />
              </div>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Account;
