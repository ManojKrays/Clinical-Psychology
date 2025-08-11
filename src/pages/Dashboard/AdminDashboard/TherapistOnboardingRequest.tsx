import Pagination from "@/components/Pagination";
import apiDetails from "@/config/apiDetails";
import { authorizedGet, authorizedPatch } from "@/config/networkWithToken";
import { errorNotify, successNotify } from "@/utils/MessageBar";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import React, { useState } from "react";

const TherapistOnboardingRequest = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const queryClient = useQueryClient();
  const fetchNotApprovedTherapist = async () => {
    const res = await authorizedGet(
      `${apiDetails.endPoint.getAllNotApprovedTherapist}`
    );
    if (!res.status) throw new Error("Failed to fetch therapists");
    return res.data?.data?.therapistProfileDTOS || [];
  };
  const {
    data: allNotApprovedTherapist = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["notApproveTherapists"],
    queryFn: fetchNotApprovedTherapist,
  });
  const updateTherapistStatus = async (therapistId, dataToSave) => {
    try {
      const response = await authorizedPatch(
        `${apiDetails.endPoint.therapistStatusUpdate}/${therapistId}/approval-status`,
        dataToSave
      );
      if (!response.status || !response.data)
        throw new Error("Failed to update user data");
      return response?.data?.data;
    } catch (error) {
      console.error("Error updating therapist profile:", error?.message);
      errorNotify(error?.message);
      throw error;
    }
  };
  const handleStatusUpdate = async (therapistId, status) => {
    const dataToSave = { status };
    try {
      await updateTherapistStatus(therapistId, dataToSave);
      successNotify(`Therapist status updated to ${status}`);
      queryClient.invalidateQueries({ queryKey: ["notApproveTherapists"] });
    } catch (err) {
      console.error("Status update failed:", err?.message);
      errorNotify(err?.message);
    }
  };

  const totalPages = Math.ceil(allNotApprovedTherapist.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedTherapists = allNotApprovedTherapist.slice(
    startIndex,
    startIndex + itemsPerPage
  );
  return (
    <div className="mx-auto w-full space-y-6 pb-3">
      {isLoading ? (
        <div className="flex items-center justify-center">
          <Loader />
        </div>
      ) : isError ? (
        <div className="text-center text-base text-red-600">
          {error?.message || "Something went wrong"}
        </div>
      ) : allNotApprovedTherapist?.length === 0 ? (
        <div className="text-center text-base">Therapists not Found</div>
      ) : (
        <>
          {paginatedTherapists.map((data, index) => (
            <div
              key={index}
              className="rounded-md bg-white p-6 shadow-sm lg:p-10"
            >
              <div className="flex flex-col lg:flex-row lg:gap-80">
                <div>
                  <div className="mb-4 grid grid-cols-1 gap-x-1 text-[12px] md:grid-cols-4">
                    <div>
                      <span className="text-secondary font-semibold">
                        Therapist Name
                      </span>
                      <div className="font-bold">{data?.name}</div>
                    </div>
                    <div>
                      <span className="text-secondary font-semibold">
                        Profile
                      </span>
                      <div className="font-bold text-black">
                        {data?.categories[0]}
                      </div>
                    </div>
                    <div>
                      <span className="text-secondary font-semibold">
                        Expected Per Session
                      </span>
                      <div className="font-bold text-black">{data?.amount}</div>
                    </div>
                    <div>
                      <span className="text-secondary font-semibold">
                        Interests
                      </span>
                      <div className="font-bold text-black">
                        {data?.categories[1] || data?.categories[0]}
                      </div>
                    </div>
                  </div>

                  <div className="text-[12px]">
                    <span className="text-secondary mb-1 block font-semibold">
                      Therapist Profile Summary
                    </span>
                    <p className="line-clamp-2 text-justify text-gray-700">
                      {data?.summary}
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex flex-row justify-center space-x-2 sm:space-y-2 md:space-y-0 lg:flex-col lg:space-y-2 lg:pr-10 ">
                  {
                    // data?.approvalStatus === "approved" ? (
                    //     <button
                    //         className="bg-secondary w-25 cursor-not-allowed rounded px-4 py-2 text-sm text-white opacity-60"
                    //         disabled
                    //     >
                    //         Approved
                    //     </button>
                    // ) : data?.approvalStatus === "rejected" ? (
                    //     <button
                    //         className="bg-red w-25 cursor-not-allowed rounded px-4 py-2 text-sm text-white opacity-60"
                    //         disabled
                    //     >
                    //         Rejected
                    //     </button>
                    // ) :
                    <>
                      <button
                        className="bg-secondary w-[80px] rounded px-4 py-2 text-sm text-white hover:opacity-90 lg:ml-2"
                        onClick={() =>
                          handleStatusUpdate(data?.therapistId, "approved")
                        }
                      >
                        Approve
                      </button>
                      <button
                        className="bg-red-600 w-[80px] rounded px-4 py-2 text-sm text-white hover:opacity-90"
                        onClick={() =>
                          handleStatusUpdate(data?.therapistId, "rejected")
                        }
                      >
                        Reject
                      </button>
                    </>
                  }
                </div>
              </div>
            </div>
          ))}
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              handlePageChange={(page) => setCurrentPage(page)}
            />
          )}
        </>
      )}
    </div>
  );
};

export default TherapistOnboardingRequest;
