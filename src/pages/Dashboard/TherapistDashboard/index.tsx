import Loader from "@/components/Loader";
import apiDetails from "@/config/apiDetails";
import { authorizedGet } from "@/config/networkWithToken";
import useAuthStore from "@/store/authStore";
import Images from "@/utils/Images";
import { errorNotify } from "@/utils/MessageBar";
import { useQuery } from "@tanstack/react-query";
import { CheckCircle } from "lucide-react";
import React from "react";

const TherapistDashboard = () => {
  const userDetails = useAuthStore((state) => state.user);
  const therapistId = userDetails.id;

  const fetchTherapistSessions = async () => {
    try {
      const res = await authorizedGet(
        `${apiDetails.endPoint.getTherapistSessions}/${therapistId}`
      );
      if (res?.status && Array.isArray(res?.data?.data)) {
        return res?.data?.data;
      }
    } catch (err) {
      errorNotify(err.message || "Something went wrong");
      return [];
    }
  };
  const { data: sessions, isLoading } = useQuery({
    queryKey: ["getTherapistSessions"],
    queryFn: fetchTherapistSessions,
  });

  const handleJoinZoom = (url) => {
    if (url) {
      window.open(url, "_blank", "noopener,noreferrer");
    } else {
      errorNotify("Zoom link not available");
    }
  };

  const getStatusButton = (status, zoomUrl) => {
    switch (status) {
      case "Upcoming":
        return (
          <button
            onClick={() => handleJoinZoom(zoomUrl)}
            className="bg-secondary w-30 rounded px-5 py-2 text-sm text-white hover:opacity-90"
          >
            Join Now
          </button>
        );
      case "Ongoing":
        return (
          <button className="bg-secondary flex w-30 items-center gap-2 rounded border px-4 py-2 text-sm text-white transition hover:opacity-90">
            <CheckCircle className="bg-secondary h-4 w-4" />
            Complete
          </button>
        );
      case "Completed":
        return (
          <button className="bg-green-600 w-30 rounded px-5 py-2 text-sm text-white">
            Completed
          </button>
        );
      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="mx-auto w-[90%] px-4 pt-20 md:w-[80%] lg:w-[80%]">
      <div className="text-[14px] text-black">Upcoming sessions</div>
      <div className="w-full space-y-4 pt-3 pb-3">
        {sessions?.length === 0 ? (
          <div className="py-8 text-center font-medium text-gray-500">
            No Therapist Sessions are available
          </div>
        ) : (
          sessions?.map((session, index) => (
            <div
              key={session?.bookingId ?? `${index}`}
              className="flex flex-col justify-between rounded-md bg-white p-4 shadow md:flex-row md:items-center"
            >
              <div className="flex flex-1 items-start gap-4">
                {session?.status === "completed" && (
                  <CheckCircle className="text-green mt-1 text-lg" />
                )}

                <div className="flex flex-col gap-4 text-[14px] md:grid md:grid-cols-5 md:text-[14px] lg:text-[15px]">
                  <div>
                    <p className="text-yellow">Session date & time</p>
                    <p className="p-1 font-semibold">{session?.sessionTime}</p>
                  </div>
                  <div>
                    <p className="text-yellow">Session Duration</p>
                    <p className="p-1 font-semibold">
                      {session?.sessionDuration}
                    </p>
                  </div>
                  <div>
                    <p className="text-yellow">Clients Name</p>
                    <p className="p-1 font-semibold">{session?.clientName}</p>
                  </div>
                  <div>
                    <p className="text-yellow">Session Name</p>
                    <p className="p-1 font-semibold">{session?.sessionName}</p>
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <p className="text-yellow">Meeting Type</p>
                    <p className="flex max-w-[200px] items-center gap-1 overflow-x-auto font-medium whitespace-nowrap">
                      <img src={Images.ZOOM} alt="zoom" className="h-5 w-5" />
                      {session.meetType}
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex justify-center pl-5 md:mt-0 md:ml-4 md:justify-start">
                {getStatusButton(session?.status, session?.therapistMeetLink)}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TherapistDashboard;
