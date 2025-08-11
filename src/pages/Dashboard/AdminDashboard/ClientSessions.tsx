import Loader from "@/components/Loader";
import Pagination from "@/components/Pagination";
import apiDetails from "@/config/apiDetails";
import { authorizedGet } from "@/config/networkWithToken";
import Images from "@/utils/Images";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";

const ClientSessions = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;
  const fetchMentees = async () => {
    const res = await authorizedGet(
      `${apiDetails.endPoint.getAllAdminClients}`
    );
    if (!res.status) throw new Error("Failed to fetch therapists");
    return res.data?.data || [];
  };
  const {
    data: AllClients = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["clients"],
    queryFn: fetchMentees,
  });
  const flattenedSessions = AllClients?.flatMap((client) =>
    client.clientDashboardDTOS?.map((session) => ({
      ...session,
      clientName: client.clientName,
    }))
  );
  const totalPages = Math.ceil(flattenedSessions?.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedClient = flattenedSessions?.slice(
    startIndex,
    startIndex + itemsPerPage
  );

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
        <div className="text-center text-base">Client not Found</div>
      ) : (
        <>
          {paginatedClient.map((session) => (
            <div
              key={session?.bookingId}
              className="flex flex-col justify-between rounded-md bg-white p-4 shadow md:flex-row md:items-center"
            >
              <div className="flex flex-1 items-start">
                <div className="flex flex-col gap-4 text-[12px] md:grid md:grid-cols-4 md:gap-4 md:text-[8px] lg:text-[12px]">
                  <div>
                    <p className="font-bold text-secondary">
                      Appointment date & time
                    </p>
                    <p className="font-medium">{session?.sessionTime}</p>
                  </div>
                  <div>
                    <p className="text-secondary font-bold">Therapist Name</p>
                    <p className="font-medium">{session?.therapistName}</p>
                  </div>
                  <div>
                    <p className="text-secondary font-bold">Client Name</p>
                    <p className="font-medium">{session?.clientName}</p>
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

export default ClientSessions;
