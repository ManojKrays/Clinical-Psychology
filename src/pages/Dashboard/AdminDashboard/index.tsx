import React, { useState } from "react";
import TherapistOnboardingRequest from "./TherapistOnboardingRequest";
import TherapistSessions from "./TherapistSessions";
import { Loader } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { authorizedGet } from "@/config/networkWithToken";
import apiDetails from "@/config/apiDetails";
import ClientSessions from "./ClientSessions";
import AdminCard from "@/components/AdminCard";
import Images from "@/utils/Images";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("therapistOnboardingRequests");

  const fetchAllUserData = async () => {
    const res = await authorizedGet(
      `${apiDetails.endPoint.getAllNotApprovedTherapist}`
    );
    if (!res.status) throw new Error("Failed to fetch therapists");
    return res.data?.data || [];
  };
  const { data: userData, isLoading } = useQuery({
    queryKey: ["allUserData"],
    queryFn: fetchAllUserData,
  });
  return (
    <div className="flex h-full w-full pt-20">
      <div className="mx-auto w-[90%] px-4 md:w-[80%] lg:w-[80%]">
        {isLoading ? (
          <div className="py-4 text-center">
            <Loader />
          </div>
        ) : (
          <>
            <div className="flex flex-col items-center justify-center gap-4 p-4 md:flex-row md:items-start md:justify-start">
              <AdminCard
                title="Therapists"
                count={
                  (userData?.noOfTherapistApproved ?? 0) +
                  (userData?.noOfTherapistNotApproved ?? 0)
                }
                image={Images.THERAPISTIMAGE}
                onClick={"/AdminDashboard/therapist"}
              />
              <AdminCard
                title="Clients"
                count={userData?.noOfClients ?? 0}
                image={Images.CLIENTIMAGE}
                onClick={"/AdminDashboard/client"}
              />
            </div>

            <div className="mb-6 flex border-b border-gray-200 pt-5">
              <button
                className={`mr-10 cursor-pointer border-b-2 pb-2 text-[12px] font-medium sm:text-[14px] ${
                  activeTab === "therapistOnboardingRequests"
                    ? "border-secondary text-secondary"
                    : "border-white text-black"
                }`}
                onClick={() => setActiveTab("therapistOnboardingRequests")}
              >
                Therapist Onboarding Requests
              </button>
              <button
                className={`mr-10 cursor-pointer border-b-2 pb-2 text-[12px] font-medium sm:text-[14px] ${
                  activeTab === "therapistsSessions"
                    ? "border-secondary text-secondary"
                    : "border-white text-black"
                }`}
                onClick={() => setActiveTab("therapistsSessions")}
              >
                Therapist Sessions
              </button>
              <button
                className={`cursor-pointer border-b-2 pb-2 text-[12px] font-medium sm:text-[14px] ${
                  activeTab === "clientsSessions"
                    ? "border-secondary text-secondary"
                    : "border-white text-black"
                }`}
                onClick={() => setActiveTab("clientsSessions")}
              >
                Clients Sessions
              </button>
            </div>
            {activeTab === "therapistOnboardingRequests" && (
              <div>
                <TherapistOnboardingRequest />
              </div>
            )}
            {activeTab === "therapistsSessions" && (
              <div>
                <TherapistSessions />
              </div>
            )}
            {activeTab === "clientsSessions" && (
              <div>
                <ClientSessions />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
