import Loader from "@/components/Loader";
import Pagination from "@/components/Pagination";
import apiDetails from "@/config/apiDetails";
import { authorizedGet } from "@/config/networkWithToken";
import Images from "@/utils/Images";
import { useQuery } from "@tanstack/react-query";
import { CheckCircle } from "lucide-react";
import React, { useState } from "react";

const TherapistSessions = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;
  const fetchMentors = async () => {
    const res = await authorizedGet(
      `${apiDetails.endPoint.getAllAdminTherapists}`
    );
    if (!res.status) throw new Error("Failed to fetch mentors");
    return res.data?.data || [];
  };
  const {
    data: allTherapists = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["therapists"],
    queryFn: fetchMentors,
  });
  const flattenedSessions = allTherapists?.flatMap((therapist) =>
    therapist.therapistDashboardDTOS?.map((session) => ({
      ...session,
      therapistName: therapist.therapistName,
    }))
  );
  const totalPages = Math.ceil(flattenedSessions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedTherapists = flattenedSessions.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const getStatusButton = (status) => {
    switch (status) {
      case "upcoming":
        return (
          <button className="bg-secondary w-30 rounded px-5 py-2 text-sm text-white hover:opacity-90">
            Join Now
          </button>
        );
      case "ongoing":
        return (
          <button className="bg-secondary flex w-30 items-center gap-2 rounded border px-4 py-2 text-sm text-white transition hover:opacity-90">
            <CheckCircle className="bg-secondary h-4 w-4" />
            Complete
          </button>
        );
      case "completed":
        return (
          <button className="bg-green-700 w-30 rounded px-5 py-2 text-sm text-white">
            Completed
          </button>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full space-y-4 pb-3">
      {isLoading ? (
        <div className="flex items-center justify-center">
          <Loader />
        </div>
      ) : isError ? (
        <div className="text-center text-base text-red-600">
          {error?.message || "Something went wrong"}
        </div>
      ) : flattenedSessions?.length === 0 ? (
        <div className="text-center text-base">Therapists not Found</div>
      ) : (
        <>
          {paginatedTherapists.map((session) => (
            <div
              key={session?.bookingId}
              className="flex flex-col justify-between rounded-md bg-white p-4 shadow md:flex-row md:items-center"
            >
              <div className="flex flex-1 items-start gap-4">
                {session?.status === "completed" && (
                  <CheckCircle className="text-green mt-1 text-lg" />
                )}

                <div className="flex flex-col gap-4 text-[12px] md:grid md:grid-cols-5 md:text-[8px] lg:text-[12px]">
                  <div>
                    <p className="text-secondary font-bold">
                      Session date & time
                    </p>
                    <p className="font-medium">{session?.sessionTime}</p>
                  </div>
                  <div>
                    <p className="text-secondary font-bold">Session Duration</p>
                    <p className="font-medium">{session?.sessionDuration}</p>
                  </div>
                  <div>
                    <p className="text-secondary font-bold">Client Name</p>
                    <p className="font-medium">{session?.clientName}</p>
                  </div>
                  <div>
                    <p className="text-secondary font-bold">Therapist Name</p>
                    <p className="font-medium">{session?.therapistName}</p>
                  </div>
                  <div>
                    <p className="text-secondary font-bold">Session Name</p>
                    <p className="font-medium">{session?.sessionName}</p>
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <p className="text-secondary font-bold">Meeting Type</p>
                    <p className="flex items-center gap-1 font-medium">
                      <img src={Images.ZOOM} alt="zoom" className="h-5 w-5" />
                      {session?.meetType}
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex justify-center md:mt-0 md:ml-4 md:justify-start">
                {getStatusButton(session?.status)}
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

export default TherapistSessions;
