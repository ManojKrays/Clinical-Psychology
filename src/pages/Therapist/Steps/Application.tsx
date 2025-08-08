import React, { useRef, useState } from "react";
import { Controller } from "react-hook-form";
import String from "../../../utils/String";
import PhoneInput from "react-phone-input-2";
import Images from "../../../utils/Images";
import { ArrowRight } from "lucide-react";
import { post } from "../../../config/network";
import apiDetails from "../../../config/apiDetails";
import { Link } from "react-router-dom";
import { errorNotify, successNotify } from "@/utils/MessageBar";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const Application = ({ onNext, formProps }) => {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    getValues,
    formState: { errors },
  } = formProps;

  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileError, setFileError] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const maxFileSize = 2 * 1024 * 1024;

    if (file.size > maxFileSize) {
      errorNotify("File size should not exceed 2MB");
      e.target.value = "";
      setValue("profile", null, { shouldValidate: true });
      return;
    }

    try {
      setIsUploading(true);

      const formData = new FormData();
      formData.append("file", file);

      const response = await post(apiDetails.endPoint.image_upload, formData);
      if (response.data.status) {
        const imageUrl = response.data.data;
        setValue("profile", response.data.data, { shouldValidate: true });

        setSelectedFile(imageUrl);
        successNotify(response.data.message);
      }
    } catch (error) {
      console.error("Upload error:", error);
      setFileError("Image upload failed. Try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleClick = (data) => {
    setFileError("");
    if (onNext) onNext();
  };

  return (
    <div className="flex w-full flex-col items-center justify-center gap-6 pt-10">
      <form className="font-avenir w-full px-4">
        <div className="flex flex-col gap-4 pb-5 md:flex-row md:gap-6">
          <div className="w-full md:w-1/2">
            <FormField
              control={control}
              name="name"
              rules={{
                required: "Name is required",
                validate: (value) =>
                  value.trim() !== "" || "Name cannot be just empty spaces",
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={errors.name ? "text-red-600" : ""}>
                    {String.FULLNAME}
                    {errors.name && (
                      <span className="text-red-600"> is required</span>
                    )}
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      placeholder="Enter Name"
                      className="bg-white"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-full md:w-1/2">
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
                    {String.PHONENUMBER}
                    {errors.phone && (
                      <span className="text-red-600"> is required</span>
                    )}
                  </FormLabel>
                  <FormControl>
                    <PhoneInput
                      {...field}
                      country="in"
                      enableSearch
                      inputStyle={{
                        width: "100%",
                        height: "38px",
                        fontSize: "14px",
                        border: errors.phone
                          ? "1px solid red"
                          : "1px solid #ccc",
                      }}
                      placeholder="+91 98765 43210"
                      specialLabel=""
                      onChange={(value) => field.onChange(value)}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="flex flex-col gap-4 pb-5 md:flex-row md:items-start md:gap-6">
          <div className="w-full md:w-1/2">
            <FormField
              control={control}
              name="linkedin"
              rules={{
                required: "LinkedIn profile link is required",
                validate: (value) =>
                  value.trim() !== "" || "LinkedIn cannot be just empty spaces",
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={errors.linkedin ? "text-red-600" : ""}>
                    {String.LINKEDIN}
                    {errors.linkedin && (
                      <span className="text-red-600"> is required</span>
                    )}
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      placeholder="Paste your LinkedIn profile link"
                      className="bg-white text-sm placeholder:text-sm"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="w-full md:w-1/2">
            <FormField
              control={control}
              name="amount"
              rules={{
                required: "Amount is required",
                min: {
                  value: 1,
                  message: "Amount must be at least 1",
                },
                validate: {
                  isInteger: (value) =>
                    Number.isInteger(Number(value)) ||
                    "Only whole numbers are allowed",
                },
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={errors.amount ? "text-red-600" : ""}>
                    {String.EXPECTEDRATE}
                    {errors.amount && (
                      <span className="text-red-600"> is required</span>
                    )}
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      inputMode="numeric"
                      placeholder="Ex: $1000/session"
                      className="bg-white"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        {String.UPLOADPROFILE}
        <div
          className="mx-auto mt-2 flex cursor-pointer flex-col items-center justify-center border-2 border-dashed border-gray-400 p-6 transition hover:bg-gray-50"
          role="button"
          onClick={() => fileInputRef.current?.click()}
        >
          {selectedFile ? (
            <img
              src={selectedFile}
              alt="Selected"
              className="h-40 w-40 rounded-md object-cover"
            />
          ) : (
            <img src={Images.UPLOADICON} alt="Upload" className="h-18 w-20" />
          )}
          <p className="text-md p-2 text-center font-medium text-gray-800">
            Drag & drop files or Browse
          </p>
          <p className="p-2 text-center text-sm font-normal text-gray-600">
            JPEG or PNG, max size 2MB.
          </p>

          <Controller
            name="profile"
            control={control}
            rules={{
              required: "Profile image is required",
              validate: (value) => {
                if (!value) return "Profile image is required";
                if (typeof value === "string") return true;
                const isValidType =
                  value.type === "image/jpeg" || value.type === "image/png";
                if (!isValidType) return "Only JPEG or PNG files are allowed";
                const isValidSize = value.size <= 2 * 1024 * 1024;
                if (!isValidSize) return "File size must be under 2MB";
                return true;
              },
            }}
            render={({ field }) => (
              <>
                <input
                  type="file"
                  accept="image/jpeg, image/png"
                  className="hidden"
                  ref={fileInputRef}
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (!file) return;
                    handleImageChange(e);
                    field.onChange(file);
                  }}
                  disabled={isUploading}
                />
              </>
            )}
          />

          {isUploading && (
            <p className="mt-2 text-sm text-gray-500">Uploading...</p>
          )}
        </div>
        {errors.profile && (
          <p className="mt-2 text-sm text-red-500">{errors.profile.message}</p>
        )}
        {typeof getValues("profile") === "string" && (
          <p className="mt-1 text-sm text-green-600">
            Uploaded: {getValues("profile").split("/").pop()}
          </p>
        )}
        <div className="flex items-start gap-2 pt-4">
          <input
            type="checkbox"
            id="terms"
            {...register("terms", {
              required: "You must agree to the terms and conditions",
            })}
          />
          <label
            htmlFor="terms_condition"
            className="cursor-pointer text-sm text-gray-700"
          >
            I agree the{" "}
            <span className="text-secondary underline">
              <Link
                to="/terms"
                onClick={(e) => e.stopPropagation()}
                className="text-secondary underline"
              >
                Terms & Conditions
              </Link>
            </span>
          </label>
        </div>
        {errors.terms && (
          <p className="text-sm text-red-500">{errors.terms.message}</p>
        )}
        <div className="w-full p-2 pt-6 pb-4">
          <button
            onClick={handleSubmit(handleClick)}
            type="button"
            className="bg-secondary flex w-full cursor-pointer items-center justify-center gap-2 rounded-md px-3 py-2 text-white"
          >
            Apply to Become a Therapist
            <span>
              <ArrowRight />
            </span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Application;
