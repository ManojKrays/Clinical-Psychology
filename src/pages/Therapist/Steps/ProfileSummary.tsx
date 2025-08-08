import React from "react";
import {
  educations,
  languagesOption,
  specialtiesList,
} from "../../../utils/data";
import { Controller } from "react-hook-form";
import MultiSelectField from "@/components/Multiselectoption";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";

const ProfileSummary = ({ onNext, onPrev, formProps }) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = formProps;

  const onSubmit = async (data) => {
    onNext();
  };

  return (
    <div className="px-[5%] pt-10">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="clear-start w-full flex flex-col gap-6 md:flex-row md:gap-10 md:w-[90%]">
          <div className="w-full md:w-1/2">
            <p className="text-[14px] font-medium text-gray-600 mb-2">
              Which specialties are you interested in?
            </p>

            <Controller
              name="specialties"
              control={control}
              rules={{
                validate: (value) =>
                  value && value.length > 0
                    ? true
                    : "Please select at least one Specialty",
              }}
              render={({ field, fieldState }) => (
                <>
                  <MultiSelectField
                    name="specialties"
                    type="searchable"
                    options={specialtiesList}
                    value={field.value}
                    onChange={field.onChange}
                  />
                  {fieldState.error && (
                    <p className="mt-1 text-sm text-red-500">
                      {fieldState.error.message}
                    </p>
                  )}
                </>
              )}
            />
          </div>

          {/* Location Field */}
          <div className="w-full md:w-1/2 mt-4 md:mt-0">
            <FormField
              control={control}
              name="location"
              rules={{ required: "Location is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                    className={`${
                      errors.location ? "text-red-600" : ""
                    } text-[14px] font-medium text-gray-600`}
                  >
                    Location{" "}
                    {errors.location && <span className="text-red-600">*</span>}
                  </FormLabel>
                  <FormControl>
                    <input
                      {...field}
                      type="text"
                      placeholder="Enter city"
                      className="w-full rounded border border-gray-300 px-3 py-2"
                    />
                  </FormControl>
                  {errors.location && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.location.message}
                    </p>
                  )}
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="clear-start w-full flex flex-col gap-6 md:flex-row md:gap-10 md:w-[90%] mt-3">
          <div className="w-full md:w-1/2">
            <p className="text-[14px] font-medium text-gray-600 mb-2">
              Languages
            </p>

            <Controller
              name="language"
              control={control}
              rules={{
                validate: (value) =>
                  value && value.length > 0
                    ? true
                    : "Please select at least one Specialty",
              }}
              render={({ field, fieldState }) => (
                <>
                  <MultiSelectField
                    name="language"
                    type="searchable"
                    options={languagesOption}
                    value={field.value}
                    onChange={field.onChange}
                  />
                  {fieldState.error && (
                    <p className="mt-1 text-sm text-red-500">
                      {fieldState.error.message}
                    </p>
                  )}
                </>
              )}
            />
          </div>
          <div className="w-full md:w-1/2">
            <p className="text-[14px] font-medium text-gray-600 mb-2">
              Education
            </p>

            <Controller
              name="education"
              control={control}
              rules={{
                validate: (value) =>
                  value && value.length > 0
                    ? true
                    : "Please select at least one Specialty",
              }}
              render={({ field, fieldState }) => (
                <>
                  <MultiSelectField
                    name="education"
                    type="searchable"
                    options={educations}
                    value={field.value}
                    onChange={field.onChange}
                  />
                  {fieldState.error && (
                    <p className="mt-1 text-sm text-red-500">
                      {fieldState.error.message}
                    </p>
                  )}
                </>
              )}
            />
          </div>
        </div>

        <p className="pt-5 text-[15px] font-medium text-gray-600">
          Create your therapist profile summary. Be as clear and professional as
          possible share your background, areas of expertise, therapeutic
          approach, and why individuals should feel confident working with you.
          You can always update this information later.
        </p>

        <div className="space-y-4 pt-6">
          <FormField
            control={control}
            name="summary"
            rules={{ required: true, minLength: 10 }}
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel className={errors.summary ? "text-red-600" : ""}>
                  Your Profile Summary{" "}
                  {errors.summary && <span className="text-red-600">*</span>}
                </FormLabel>
                <FormControl>
                  <textarea
                    {...field}
                    rows={4}
                    placeholder="Enter your profile summary"
                    className="w-full resize-none rounded border border-gray-300 px-3 py-2"
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <div className="flex w-full gap-5 pt-14">
          <Button
            type="button"
            onClick={() => onPrev()}
            className="font-avenir flex-1 bg-gray-400 text-black"
          >
            Back
          </Button>

          <Button
            type="submit"
            className="font-avenir bg-secondary flex-1 text-black"
          >
            Next
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProfileSummary;
