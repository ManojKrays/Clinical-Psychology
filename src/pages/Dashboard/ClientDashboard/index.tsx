import ConfirmDeleteModal from "@/components/ConfirmDeleteModal";
import DatePickerModel from "@/components/DatePickerModel";
import Loader from "@/components/Loader";
import apiDetails from "@/config/apiDetails";
import { authorizedDel, authorizedGet } from "@/config/networkWithToken";
import useAuthStore from "@/store/authStore";
import Images from "@/utils/Images";
import { errorNotify, successNotify } from "@/utils/MessageBar";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";

const ClientDashboard = () => {
  const userDetails = useAuthStore((state) => state.user);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState(null);
  const clientId = userDetails.id;
  const queryClient = useQueryClient();

  const fetchClientSessions = async () => {
    try {
      const res = await authorizedGet(
        `${apiDetails.endPoint.getClientSessions}/${clientId}`
      );
      if (res.status && Array.isArray(res.data.data)) {
        return res?.data?.data;
      }
    } catch (err) {
      errorNotify(err.message || "Something went wrong");
      return [];
    }
  };
  const { data: sessions, isLoading } = useQuery({
    queryKey: ["getClientSessions"],
    queryFn: fetchClientSessions,
  });

  const handleDelete = async (bookingId) => {
    try {
      const res = await authorizedDel(
        `${apiDetails.endPoint.clientSessionCancel}/${bookingId}`
      );
      console.log("bookingid", bookingId);
      if (res.status) {
        successNotify(res?.data?.message || "Session deleted successfully");
        queryClient.invalidateQueries({ queryKey: ["getClientSessions"] });
      } else {
        errorNotify("Failed to delete session");
      }
    } catch (err) {
      errorNotify(err.message || "Delete failed");
    }
  };

  const handleJoinZoom = (url) => {
    if (url) {
      window.open(url, "_blank", "noopener,noreferrer");
    } else {
      errorNotify("Zoom link not available");
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
    <div className="mx-auto w-[90%] px-4 pt-20 pb-20 md:w-[80%] lg:w-[80%]">
      <div>
        <h2 className="mb-2 pt-2 text-2xl font-bold">{"DASHBOARD"}</h2>
      </div>
      <div className="pt-4 text-[16px] text-black">
        View Booked Appointments
      </div>
      <div className="w-full space-y-4 pt-3 pb-3">
        {sessions.length === 0 ? (
          <div className="py-8 text-center font-medium text-gray-500">
            No Client Sessions are available
          </div>
        ) : (
          sessions.map((session, index) => (
            <div
              key={session?.id ?? `${index}`}
              className="flex flex-col justify-between rounded-md bg-white p-6 shadow md:flex-row md:items-center"
            >
              <div className="flex flex-col md:flex-row">
                <div>
                  <div className="flex flex-1 items-start">
                    <div className="flex flex-col gap-4 text-[16px] md:grid md:grid-cols-3 md:gap-2 md:text-[12px] lg:text-[16px]">
                      <div>
                        <p className="text-primary">Appointment date & time</p>
                        <p className="pt-1 font-semibold">
                          {session?.sessionTime}
                        </p>
                      </div>
                      <div className="md:pl-10 lg:pl-20">
                        <p className="text-primary">Therapist Name</p>
                        <p className="pt-1 font-semibold">
                          {session?.therapistName}
                        </p>
                      </div>

                      <div className="col-span-2 sm:col-span-1 md:pl-10 lg:pl-20">
                        <p className="text-primary">Meeting Type</p>
                        <p className="flex items-center gap-1 pt-1 font-semibold">
                          <img
                            src={Images.ZOOM}
                            alt="zoom"
                            className="h-5 w-5"
                          />
                          {session?.meetType}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-row justify-center gap-3 pt-5 md:pl-10 lg:justify-end lg:pl-20">
                  <button
                    onClick={() => {
                      setSelectedBookingId(session.bookingId);
                      setShowConfirmModal(true);
                    }}
                    className="h-10 w-20 rounded border px-2 py-1 text-[12px] hover:opacity-90 lg:w-30"
                  >
                    Cancel
                  </button>
                  <DatePickerModel
                    session={session}
                    onUpdate={() =>
                      queryClient.invalidateQueries({
                        queryKey: ["getClientSessions"],
                      })
                    }
                  />
                  <button
                    onClick={() => handleJoinZoom(session?.clientMeetLink)}
                    className="bg-primary h-10 w-20 rounded text-sm text-white hover:opacity-90 lg:w-30"
                  >
                    Join Now
                  </button>
                </div>

                <ConfirmDeleteModal
                  isOpen={showConfirmModal}
                  onClose={() => setShowConfirmModal(false)}
                  onConfirm={() => handleDelete(selectedBookingId)}
                  message="Are you sure you want to cancel this session?"
                />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ClientDashboard;
