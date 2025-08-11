import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Edit, X, Edit2, Download } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { authorizedGet, authorizedPatch } from "@/config/networkWithToken";
import { successNotify, errorNotify } from "@/utils/MessageBar";
import apiDetails from "@/config/apiDetails";
import useAuthStore from "@/store/authStore";
import Loader from "@/components/Loader";
import MultiSelectField from "@/components/Multiselectoption";
import {
  educations,
  languagesOption,
  specialtiesList,
  timeslots,
} from "@/utils/data";
import { post } from "@/config/network";
import { updateValueInLocalStorage } from "@/utils/helper";
import { useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-input-2";

type TherapistProfileType = {
  name: string;
  phone: string;
  email: string;
  linkedinUrl: string;
  profileUrl: string;
  resumeUrl: string;
  yearsOfExperience: number;
  categories: string[];
  summary: string;
  amount: number;
  location: string;
  timeSlots: string[];
  languages: string[];
  education: string[];
};

const TherapistProfile = () => {
  const [editMode, setEditMode] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [pdfFile, setPdfFile] = useState(null);
  const { setUser: setAuthUser, updateUser } = useAuthStore();
  const [formData, setFormData] = useState({});
  const [isuser, setUser] = useState({});
  const [resumeUrl, setResumeUrl] = useState("");
  const [validationErrors, setValidationErrors] = useState({});
  const userDetails = useAuthStore((state) => state.user);
  const queryClient = useQueryClient();
  const therapistId = userDetails.id;
  const therapistName = userDetails.name;
  const fieldsList = [
    { label: "Email", name: "email" },
    { label: "Phone Number", name: "phone" },
    { label: "LinkedIn", name: "linkedinUrl" },
    { label: "Location", name: "location" },
    { label: "Years of Experience", name: "yearsOfExperience" },
    { label: "Resume", name: "resumeUrl", isLink: true },
  ];
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (editMode) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [editMode]);
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { isDirty },
  } = useForm<TherapistProfileType>();

  const fetchTherapistProfile = async () => {
    try {
      const res = await authorizedGet(
        `${apiDetails.endPoint.therapist_profile}/${therapistId}`
      );
      return res.data.data;
    } catch (error) {
      const errorMsg =
        error?.response?.data?.message ||
        error.message ||
        "Unexpected error while updating profile";
      errorNotify(errorMsg);
      console.error("Error fetching Therapist profile:", error);
      throw error;
    }
  };

  const updateTherapistProfile = async (data) => {
    try {
      const res = await authorizedPatch(
        `${apiDetails.endPoint.therapist_update}/${therapistId}`,
        data
      );
      if (!res.status || !res.data)
        throw new Error("Failed to update user data");
      const message = res?.data?.message;
      if (message) successNotify(message);
    } catch (error) {
      const errorMsg =
        error?.response?.data?.message ||
        error.message ||
        "Unexpected error while updating profile";
      errorNotify(errorMsg);
      console.error("Error updating Therapist profile:", error);
      throw error;
    }
  };

  const { data: profileData, isLoading } = useQuery<TherapistProfileType>({
    queryKey: ["therapistProfile", therapistId],
    queryFn: fetchTherapistProfile,
    refetchOnMount: true,
    staleTime: 0,
  });

  useEffect(() => {
    if (profileData) {
      reset(profileData);
      setImageUrl(profileData.profileUrl);
    }
  }, [profileData, reset]);

  useMutation({
    mutationFn: updateTherapistProfile,
    onSuccess: (updatedData) => {
      queryClient.setQueryData(["therapistProfile", therapistId], updatedData);
      queryClient.invalidateQueries({
        queryKey: ["therapistProfile", therapistId],
      });
      setEditMode(false);
    },
  });

  const onSubmit = async (formData: TherapistProfileType) => {
    const errors: Record<string, string> = {};

    if (!formData.name?.trim()) errors.name = "Name is required";
    if (!formData.phone?.trim()) errors.phone = "Phone number is required";
    if (!formData.linkedinUrl?.trim())
      errors.linkedinUrl = "Linkedin is required";
    if (!formData.amount) errors.amount = "Amount is required";
    if (!formData.summary?.trim()) errors.summary = "Bio is required";
    if (!formData.yearsOfExperience)
      errors.yearsOfExperience = "Years of experience is required";
    if (!formData.categories?.length)
      errors.categories = "Categories are required";
    if (!formData.timeSlots?.length)
      errors.timeSlots = "Time slots are required";
    if (!formData.languages?.length)
      errors.languages = "Languages are required";
    if (!formData.education?.length) errors.education = "Education is required";

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }
    setValidationErrors({});
    updateValueInLocalStorage("userDetails", formData);
    setUser((prev) => ({ ...prev, ...formData }));
    const dataToSave = {
      profileUrl: imageUrl,
      resumeUrl: resumeUrl || formData?.resumeUrl,
      name: formData?.name,
      phone: formData?.phone,
      email: formData?.email,
      location: formData?.location,
      amount: formData?.amount,
      linkedinUrl: formData?.linkedinUrl,
      yearsOfExperience: formData?.yearsOfExperience,
      summary: formData?.summary,
      timeSlots: formData?.timeSlots,
      categories: formData?.categories,
      education: formData?.education,
      languages: formData?.languages,
    };

    updateUser({ profileUrl: imageUrl, name: formData?.name });

    try {
      const updatedData = await updateTherapistProfile(dataToSave);
      queryClient.setQueryData(["therapistProfile"], updatedData);
      setEditMode(false);
    } catch (err) {
      console.error("Update failed:", err);
      errorNotify("Failed to update profile. Please try again.");
    }
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files[0];
    if (!file) return;

    const maxFileSize = 2 * 1024 * 1024; // 2MB
    if (file.size > maxFileSize) {
      errorNotify("File size should not exceed 2MB");
      e.target.value = "";
      setValue("profileUrl", null, { shouldValidate: true });
      return;
    }

    try {
      setIsUploading(true);
      const formData = new FormData();
      formData.append("file", file);

      const response = await post(apiDetails.endPoint.image_upload, formData);
      if (response.data.status) {
        const uploadedUrl = response.data.data;
        setImageUrl(uploadedUrl);
        setValue("profileUrl", uploadedUrl, { shouldValidate: true });
        successNotify(response.data.message);
      }
    } catch (error) {
      console.error("Upload error:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleResumeChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files[0];
    if (!file) return;

    const maxFileSize = 2 * 1024 * 1024;
    if (file.size > maxFileSize) {
      errorNotify("File size should not exceed 2MB");
      e.target.value = "";
      setValue("resumeUrl", null, { shouldValidate: true });
      return;
    }

    try {
      setIsUploading(true);

      const formDataUpload = new FormData();
      formDataUpload.append("file", file);

      const response = await post(
        apiDetails.endPoint.resume_upload,
        formDataUpload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.status) {
        const uploadedUrl = response.data.data;

        setFormData((prev) => ({
          ...prev,
          resumeUrl: uploadedUrl,
        }));

        setValue("resumeUrl", uploadedUrl, { shouldValidate: true });

        setUser((prevUser) => ({
          ...prevUser,
          resumeUrl: uploadedUrl,
        }));

        setPdfFile(uploadedUrl);

        successNotify(response.data.message);
      }
    } catch (error) {
      console.error("Upload error:", error);
    } finally {
      setIsUploading(false);
    }
  };

  if (isLoading)
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader />
      </div>
    );

  const showValue = (val: any) => val || "—";

  return (
    <div className="bg-white h-full w-full flex pt-20">
      <div className="mx-auto h-full lg:w-[80%] w-[90%] p-6 ">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold font-agency">
            {therapistName}'s Profile
          </h2>
          {editMode ? (
            <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
              <Button
                onClick={handleSubmit(onSubmit)}
                className="flex items-center justify-center"
              >
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline ml-1">Save</span>
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setEditMode(false);
                  reset(profileData);
                }}
                className="flex items-center justify-center"
              >
                <X className="w-4 h-4" />
                <span className="hidden sm:inline ml-1">Cancel</span>
              </Button>
            </div>
          ) : (
            <Button onClick={() => setEditMode(true)} variant="ghost">
              <Edit className="w-4 h-4 mr-1" /> Edit
            </Button>
          )}
        </div>

        <div className="flex flex-col md:flex-row gap-6 mb-6">
          <div className="flex flex-col items-center text-center md:w-1/3 relative">
            <img
              src={imageUrl}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover mb-3"
            />

            {editMode && (
              <label className="absolute top-1 right-1 cursor-pointer">
                <Edit2 className="w-4 h-4 text-blue-600" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  hidden
                />
              </label>
            )}

            {/* Name */}
            <Controller
              control={control}
              name="name"
              render={({ field }) =>
                editMode ? (
                  <Input {...field} className="text-center" />
                ) : (
                  <h3 className="text-xl font-semibold">{field.value}</h3>
                )
              }
            />
            <div className="relative w-full mt-3">
              {editMode ? (
                <Controller
                  control={control}
                  name="summary"
                  render={({ field }) => (
                    <Textarea
                      {...field}
                      rows={10}
                      className="resize-none text-left text-[14px]"
                      placeholder="Enter your summary"
                    />
                  )}
                />
              ) : (
                <div className="line-clamp-6 text-gray-500 text-justify text-[14px] md:p-5">
                  {profileData?.summary}
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:gap-10 lg:gap-5 gap-5 text-sm md:w-2/3">
            {[...fieldsList].map((field) => (
              <div key={field.name}>
                <p className="font-semibold text-gray-700 mb-1">
                  {field.label}
                </p>
                <Controller
                  control={control}
                  name={field.name as keyof TherapistProfileType}
                  render={({ field: f }) => {
                    if (editMode) {
                      if (field.name === "phone") {
                        return (
                          <PhoneInput
                            country={"us"}
                            value={f.value ? String(f.value) : ""}
                            onChange={f.onChange}
                            inputStyle={{ width: "100%" }}
                            inputClass="!w-full"
                          />
                        );
                      }

                      return (
                        <Input
                          {...f}
                          type="text"
                          value={f.value || ""}
                          onChange={(e) => f.onChange(e.target.value)}
                        />
                      );
                    } else {
                      if (field.isLink) {
                        return (
                          <a
                            href={String(f.value)}
                            target="_blank"
                            rel="noreferrer"
                            className="text-primary underline"
                          >
                            Attached.pdf
                          </a>
                        );
                      }
                      return (
                        <p className="text-gray-600">{showValue(f.value)}</p>
                      );
                    }
                  }}
                />
                {editMode && field.name === "resumeUrl" && (
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleResumeChange}
                  />
                )}
              </div>
            ))}
            <div>
              <p className="font-semibold text-gray-700 mb-1">Status</p>
              <span className="inline-block mt-1 px-4 py-1 rounded-full bg-green-500 text-white text-sm font-medium">
                Active
              </span>

              <p className="mt-6 font-semibold text-gray-700 mb-1">
                Availability
              </p>
              <Controller
                control={control}
                name="timeSlots"
                render={({ field }) => {
                  const selectedOptions = timeslots.filter((opt) =>
                    (field.value || []).includes(opt.value)
                  );

                  return editMode ? (
                    <MultiSelectField
                      name="timeSlots"
                      value={selectedOptions}
                      onChange={(selected) =>
                        field.onChange(selected.map((opt) => opt.value))
                      }
                      options={timeslots}
                    />
                  ) : (
                    <div className="flex gap-3 flex-wrap">
                      {field.value?.length > 0 ? (
                        field.value.map((slot: string) => (
                          <span
                            key={slot}
                            className="bg-secondary text-white px-2 py-0 rounded-full text-[10px] overflow-x-auto"
                          >
                            {slot}
                          </span>
                        ))
                      ) : (
                        <span>—</span>
                      )}
                    </div>
                  );
                }}
              />
              <p className="mt-6 font-semibold text-gray-700 mb-1">Language</p>
              <Controller
                control={control}
                name="languages"
                render={({ field }) => {
                  const selectedOptions = languagesOption.filter((opt) =>
                    (field.value || []).includes(opt.value)
                  );

                  return editMode ? (
                    <MultiSelectField
                      name="languages"
                      type="searchable"
                      value={selectedOptions}
                      onChange={(selected) =>
                        field.onChange(selected.map((opt) => opt.value))
                      }
                      options={languagesOption}
                    />
                  ) : (
                    <div className="flex gap-3 flex-wrap">
                      {field.value?.length > 0 ? (
                        field.value.map((slot: string) => (
                          <span
                            key={slot}
                            className="bg-secondary text-white px-2 py-0 rounded-full text-[10px] overflow-x-auto"
                          >
                            {slot}
                          </span>
                        ))
                      ) : (
                        <span>—</span>
                      )}
                    </div>
                  );
                }}
              />
            </div>

            <div>
              <p className="font-semibold text-gray-700 mb-1">
                Expected Rate per Session
              </p>
              <Controller
                control={control}
                name="amount"
                render={({ field }) =>
                  editMode ? (
                    <Input {...field} type="number" />
                  ) : (
                    <div className="bg-primary text-white px-4 py-1 rounded-full text-sm font-medium inline-block">
                      ${field.value}/Session
                    </div>
                  )
                }
              />
              <p className="font-semibold text-gray-700 mb-1 mt-4">
                Specialties
              </p>
              <Controller
                control={control}
                name="categories"
                render={({ field }) => {
                  const selectedOptions = specialtiesList.filter((opt) =>
                    (field.value || []).includes(opt.value)
                  );

                  return editMode ? (
                    <MultiSelectField
                      name="categories"
                      type="searchable"
                      value={selectedOptions}
                      onChange={(selected) =>
                        field.onChange(selected.map((opt) => opt.value))
                      }
                      options={specialtiesList}
                    />
                  ) : (
                    <div className="flex gap-3 flex-wrap">
                      {field.value?.length > 0 ? (
                        field.value.map((slot: string) => (
                          <span
                            key={slot}
                            className="bg-secondary text-white px-2 py-0 rounded-full text-[10px] overflow-x-auto"
                          >
                            {slot}
                          </span>
                        ))
                      ) : (
                        <span>—</span>
                      )}
                    </div>
                  );
                }}
              />
              <p className="font-semibold text-gray-700 mb-1 mt-4">Education</p>
              <Controller
                control={control}
                name="education"
                render={({ field }) => {
                  const selectedOptions = educations.filter((opt) =>
                    (field.value || []).includes(opt.value)
                  );

                  return editMode ? (
                    <MultiSelectField
                      name="education"
                      type="searchable"
                      value={selectedOptions}
                      onChange={(selected) =>
                        field.onChange(selected.map((opt) => opt.value))
                      }
                      options={educations}
                    />
                  ) : (
                    <div className="flex gap-3 flex-wrap">
                      {field.value?.length > 0 ? (
                        field.value.map((slot: string) => (
                          <span
                            key={slot}
                            className="bg-secondary text-white  px-2 py-0 rounded-full text-[10px] overflow-auto"
                          >
                            {slot}
                          </span>
                        ))
                      ) : (
                        <span>—</span>
                      )}
                    </div>
                  );
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TherapistProfile;
