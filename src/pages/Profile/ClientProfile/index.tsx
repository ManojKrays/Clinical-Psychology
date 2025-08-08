import Loader from "@/components/Loader";
import MultiSelectField from "@/components/Multiselectoption";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import apiDetails from "@/config/apiDetails";
import { post } from "@/config/network";
import { authorizedGet, authorizedPatch } from "@/config/networkWithToken";
import useAuthStore from "@/store/authStore";
import { languagesOption } from "@/utils/data";
import { updateValueInLocalStorage } from "@/utils/helper";
import Images from "@/utils/Images";
import { errorNotify, successNotify } from "@/utils/MessageBar";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Download, Edit, Edit2, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import { useNavigate } from "react-router-dom";

interface ClientProfileType {
  name: string;
  email: string;
  phone: string;
  dob: string;
  gender: string;
  languages: string[];
  address: string;
  summary: string;
  profileUrl: string;
}

const ClientProfile = () => {
  const [editMode, setEditMode] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const { setUser: updateUser } = useAuthStore();
  const [isUploading, setIsUploading] = useState(false);
  const [isuser, setUser] = useState({});
  const [validationErrors, setValidationErrors] = useState({});
  const userDetails = useAuthStore((state) => state.user);
  const clientId = userDetails.id;
  const queryClient = useQueryClient();
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
  } = useForm<ClientProfileType>();

  const fetchClientProfile = async () => {
    try {
      const res = await authorizedGet(
        `${apiDetails.endPoint.client_profile}/${clientId}`
      );
      return res.data.data;
    } catch (error) {
      const errorMsg =
        error?.response?.data?.message ||
        error.message ||
        "Unexpected error while updating profile";
      errorNotify(errorMsg);
      console.error("Error fetching Client profile:", error);
      throw error;
    }
  };

  const updateClientProfile = async (data) => {
    try {
      const res = await authorizedPatch(
        `${apiDetails.endPoint.client_update}/${clientId}`,
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
      console.error("Error updating Client profile:", error);
      throw error;
    }
  };

  const {
    data: profileData,
    isLoading,
    isFetching,
  } = useQuery<ClientProfileType>({
    queryKey: ["clientProfile", clientId],
    queryFn: fetchClientProfile,
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
    mutationFn: updateClientProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["clientProfile", clientId],
      });
      queryClient.prefetchQuery({
        queryKey: ["clientProfile", clientId],
        queryFn: fetchClientProfile,
      });
      setEditMode(false);
    },
  });

  const onSubmit = async (formData: ClientProfileType) => {
    const errors: Record<string, string> = {};

    if (!formData.name?.trim()) errors.name = "Name is required";
    if (!formData.phone?.trim()) errors.phone = "Phone number is required";
    if (!formData.gender?.trim()) errors.gender = "Gender is required";
    if (!formData.email?.trim()) errors.email = "Email is required";
    if (!formData.dob?.trim()) errors.dob = "Date of birth is required";
    if (!formData.languages?.length)
      errors.languages = "Languages are required";
    if (!formData.address?.trim()) errors.address = "Address is required";
    if (!formData.summary?.trim()) errors.summary = "Summary is required";
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }
    setValidationErrors({});
    updateValueInLocalStorage("userDetails", formData);
    setUser((prev) => ({ ...prev, ...formData }));
    const dataToSave = {
      profileUrl: imageUrl,
      name: formData?.name,
      phone: formData?.phone,
      email: formData?.email,
      gender: formData?.gender,
      dob: formData?.dob,
      languages: formData?.languages,
      address: formData?.address,
      summary: formData?.summary,
    };

    updateUser({ profileUrl: imageUrl });
    try {
      const updatedData = await updateClientProfile(dataToSave);
      queryClient.setQueryData(["clientProfile"], updatedData);
      setEditMode(false);
    } catch (err) {
      console.error("Update failed:", err);
      errorNotify("Failed to update profile. Please try again.");
    }
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
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

      const response = await post(apiDetails.endPoint.client_image, formData);
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

  if (isLoading || isFetching)
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader />
      </div>
    );

  const showValue = (val: any) => val || "—";

  return (
    <div className="bg-white h-full w-full flex md:pt-20 pt-20 ">
      <div className="mx-auto h-full lg:w-[80%] w-[90%] p-6 ">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold font-agency">
            {profileData?.name}'s Profile
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

        <div className="flex flex-col md:flex-row gap-6 md:gap-10 lg:gap-25 mb-6">
          <div className="flex flex-col items-center text-center md:w-1/3 relative">
            <img
              src={imageUrl || Images.PROFILE}
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

            <Controller
              control={control}
              name="name"
              render={({ field }) =>
                editMode ? (
                  <Input {...field} className="text-center" />
                ) : (
                  <h3 className="text-xl font-semibold">
                    {showValue(field.value)}
                  </h3>
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
                      className="resize-none text-justify"
                      placeholder="Enter your summary"
                    />
                  )}
                />
              ) : (
                <div className="line-clamp-6 text-gray-500 text-justify text-[14px] md:p-5">
                  {showValue(profileData?.summary || "No summary provided.")}
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-x-5 gap-y-2 text-sm md:w-2/3">
            {["email", "phone"].map((fieldName) => (
              <div key={fieldName}>
                <p className="font-semibold text-gray-700 mb-1">
                  {fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}
                </p>
                <Controller
                  control={control}
                  name={fieldName as keyof ClientProfileType}
                  render={({ field }) =>
                    editMode ? (
                      fieldName === "phone" ? (
                        <PhoneInput
                          country={"us"}
                          value={
                            typeof field.value === "string" ? field.value : ""
                          }
                          onChange={field.onChange}
                          inputStyle={{ width: "100%" }}
                          inputClass="!w-full"
                        />
                      ) : (
                        <Input
                          {...field}
                          type="text"
                          value={field.value || ""}
                          onChange={(e) => field.onChange(e.target.value)}
                        />
                      )
                    ) : (
                      <p>{showValue(field.value)}</p>
                    )
                  }
                />
              </div>
            ))}

            <div>
              <p className="font-semibold text-gray-700 mb-1">Date of Birth</p>
              <Controller
                control={control}
                name="dob"
                render={({ field }) =>
                  editMode ? (
                    <div className="relative w-full">
                      <input
                        {...field}
                        type="date"
                        value={field.value || ""}
                        onChange={(e) => field.onChange(e.target.value)}
                        className="w-full rounded border px-4 py-2 pr-3 text-gray-700 appearance-none"
                      />
                    </div>
                  ) : (
                    <p>
                      {showValue(field.value || "No date of birth provided.")}
                    </p>
                  )
                }
              />
            </div>
            <div>
              <p className="font-semibold text-gray-700 mb-1">Languages</p>
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
                        field.value.map((lang: string) => (
                          <span
                            key={lang}
                            className="bg-secondary text-white px-2 py-0 rounded-full text-[10px] overflow-x-auto"
                          >
                            {lang}
                          </span>
                        ))
                      ) : (
                        <span>No languages selected</span>
                      )}
                    </div>
                  );
                }}
              />
            </div>
            <div>
              <p className="font-semibold text-gray-700 mb-1">Gender</p>
              <Controller
                control={control}
                name="gender"
                render={({ field }) =>
                  editMode ? (
                    <select
                      {...field}
                      className="w-full border rounded px-3 py-2 text-sm"
                    >
                      <option value="">-- Select Gender --</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  ) : (
                    <p>
                      {showValue(profileData?.gender || "No gender provided.")}
                    </p>
                  )
                }
              />
            </div>
            <div>
              <p className="font-semibold text-gray-700 mb-1">Address</p>
              <Controller
                control={control}
                name="address"
                render={({ field }) =>
                  editMode ? (
                    <Textarea
                      {...field}
                      rows={4}
                      className="text-justify resize-none"
                      placeholder="Enter your address"
                    />
                  ) : (
                    <p>{showValue(field.value)}</p>
                  )
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ClientProfile;
