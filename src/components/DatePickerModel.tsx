import apiDetails from "@/config/apiDetails";
import { authorizedGet, authorizedPatch } from "@/config/networkWithToken";
import useAuthStore from "@/store/authStore";
import React, { useEffect, useState } from "react";
import { format, parse } from "date-fns";
import { errorNotify, successNotify } from "@/utils/MessageBar";
import { Loader } from "lucide-react";
import CustomDatePicker from "@/pages/DoctorDetails/CustomDatePicker";

const DatePickerModel = ({ session, onUpdate }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedTimeObj, setSelectedTimeObj] = useState(null);
  const [slots, setSlots] = useState([]);
  const [slotLoader, setSlotLoader] = useState(false);
  const [timezone, setTimezone] = useState(null);
  const [buttonLabel, setButtonLabel] = useState("Re-Schedule");
  const [isUploading, setIsUploading] = useState(false);
  const userDetails = useAuthStore((state) => state.user);

  useEffect(() => {
    if (selectedDate) getTimeSlots();
  }, [selectedDate]);

  useEffect(() => {
    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    setTimezone(userTimeZone);
  }, []);

  const toggleModal = () => setShowModal(!showModal);

  const getTimeSlots = async () => {
    try {
      setSlotLoader(true);
      setSelectedTime(null);
      const formattedDate = format(new Date(selectedDate), "yyyy-MM-dd");

      const res = await authorizedGet(
        `${apiDetails.endPoint.getAllSlotsForTherapist}?therapistId=${session.therapistId}&clientId=${userDetails.id}&date=${formattedDate}`
      );

      if (res.status) {
        setSlots(res.data?.data || []);
      }
    } catch (err) {
      errorNotify(err.message || "something is wrong");
    } finally {
      setSlotLoader(false);
    }
  };

  const handleSelectedTime = (time) => {
    setSelectedTime(time.timeStart);
    setSelectedTimeObj(time);
  };

  const handleSave = async () => {
    try {
      setIsUploading(true);
      if (!selectedDate || !selectedTimeObj?.id) {
        errorNotify("Please select both date and time");
        return;
      }

      const formattedDate = format(new Date(selectedDate), "yyyy-MM-dd");

      const payload = {
        date: formattedDate,
        timeSlotId: selectedTimeObj.id,
      };

      const res = await authorizedPatch(
        `${apiDetails.endPoint.getScheduleBooking}/${session.bookingId}/reschedule`,
        payload
      );

      if (res.status) {
        successNotify("Session rescheduled successfully");
        setButtonLabel("Re-Schedule");
        onUpdate();
        toggleModal();
      } else {
        errorNotify("Failed to update session");
      }
    } catch (err) {
      errorNotify(err.message || "Update failed");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div>
      <button
        onClick={toggleModal}
        className="bg-yellow h-10 w-20 lg:w-30 rounded border px-2 py-1 text-[12px] lg:text-sm text-white hover:opacity-90"
      >
        {buttonLabel}
      </button>

      {showModal && (
        <div className="bg-opacity-30 fixed inset-0 z-50 flex items-center justify-center bg-black">
          <div className="w-[90%] max-w-md rounded bg-white p-6 shadow-lg">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Select a Date</h2>
              <button
                onClick={toggleModal}
                className="text-gray-500 hover:text-black"
              >
                ✕
              </button>
            </div>

            <CustomDatePicker
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
            />

            <div className="flex flex-wrap gap-4 pt-4">
              {slotLoader ? (
                <Loader />
              ) : slots.length === 0 ? (
                <p className="text-sm text-gray-600">
                  Choose a date to see availability
                </p>
              ) : (
                slots.map((time, i) => {
                  const parsedTime = parse(time.timeStart, "HH:mm", new Date());
                  const formattedTime = format(parsedTime, "hh:mm a");

                  return (
                    <div
                      key={i}
                      onClick={() =>
                        time.status !== "Occupied" &&
                        time.status !== "Not available"
                          ? handleSelectedTime(time)
                          : null
                      }
                      className={`w-[100px] cursor-pointer rounded p-2 text-center text-sm ${
                        time.status === "Occupied" ||
                        time.status === "Not available"
                          ? "cursor-not-allowed bg-gray-300"
                          : "bg-secondary/20"
                      } ${
                        selectedTime === time.timeStart ? "bg-secondary/60" : ""
                      }`}
                    >
                      {formattedTime}
                      <div className="text-xs text-gray-600">{time.status}</div>
                    </div>
                  );
                })
              )}
            </div>

            <div className="mt-6 flex justify-end gap-4">
              {isUploading && (
                <p className="mt-2 text-sm text-gray-500">Updating...</p>
              )}
              <button onClick={toggleModal} className="text-gray-500">
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DatePickerModel;
