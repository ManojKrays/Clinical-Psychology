import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowLeft,
  Calendar,
  Check,
  Clock,
  MapPin,
  MessageCircle,
  Star,
  Video,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import CustomDatePicker from "./CustomDatePicker";
import { useNavigate, useParams } from "react-router-dom";
import { doctor } from "@/utils/data";
import apiDetails from "@/config/apiDetails";
import { errorNotify } from "@/utils/MessageBar";
import { authorizedGet, authorizedPost } from "@/config/networkWithToken";
import { format, parse } from "date-fns";
import useAuthStore from "@/store/authStore";
import { useQuery } from "@tanstack/react-query";
import Images from "@/utils/Images";
import Loader from "@/components/Loader";

const DoctorDetails = () => {
  const { therapistId } = useParams();
  const navigate = useNavigate();
  const userDetails = useAuthStore((state) => state.user);
  const clientId = userDetails?.id;
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedTimeObj, setSelectedTimeObj] = useState(null);
  const [selectedOption, setSelectedOption] = useState("Zoom");
  const [slots, setSlots] = useState([]);
  const [slotLoader, setSlotLoader] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [timezone, setTimezone] = useState(null);

  const fetchMentorProfile = async () => {
    try {
      const response = await authorizedGet(
        `${apiDetails.endPoint.therapist_profile}/${therapistId}`
      );
      if (!response.status || !response.data)
        throw new Error("Failed to fetch user data");
      return response?.data?.data || [];
    } catch (err) {
      errorNotify("Mentor not found.");
      navigate("/");
      return [];
    }
  };

  const { data: therapist, isLoading } = useQuery({
    queryKey: ["therapistProfile", therapistId],
    queryFn: fetchMentorProfile,
    enabled: !!therapistId,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  useEffect(() => {
    if (selectedDate != null) {
      getTimeSlots();
    }
  }, [selectedDate, therapistId]);

  useEffect(() => {
    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    setTimezone(userTimeZone);
  }, [timezone]);

  const getTimeSlots = async () => {
    try {
      setSlotLoader(true);
      setSelectedTime(null);
      const date = new Date(selectedDate);
      const formattedDate = format(date, "yyyy-MM-dd");

      const res = await authorizedGet(
        `${apiDetails.endPoint.getAllSlotsForTherapist}?therapistId=${therapistId}&clientId=${clientId}&date=${formattedDate}`
      );
      if (res.status) {
        setSlots(res.data?.data || []);
      }
    } catch (err) {
      errorNotify(err.message || "something is wrong");
      console.log("error", err.message);
    } finally {
      setSlotLoader(false);
    }
  };

  const handleSelectedTime = (time) => {
    setSelectedTime(time.timeStart);
    setSelectedTimeObj(time);
  };

  const handleBooking = async () => {
    try {
      setPaymentLoading(true);
      const data = {
        therapistId: therapist?.therapistId,
        clientId: userDetails?.id,
        timeSlotId: selectedTimeObj?.id,
        bookingDate: format(selectedDate, "yyyy-MM-dd"),
        category: "Design",
        connectMethod: selectedOption || "Zoom",
        amount: 10,
        currency: "CAD",
        productName: therapist?.name,
        quantity: 1,
      };
      console.log("Booking Details", data);

      const res = await authorizedPost(apiDetails.endPoint.checkout, data);
      console.log(res);
      if (res.status) {
        window.location.href = res?.data?.data?.sessionUrl;
      }
    } catch (err) {
      console.log(err);
    } finally {
      setPaymentLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {isLoading ? (
        <div className="flex items-center justify-center min-h-screen w-full">
          <Loader />
        </div>
      ) : (
        <div className="container mx-auto px-4 py-24">
          <div>
            <Button
              variant="ghost"
              onClick={() => navigate(-1)}
              className="mb-4"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
          </div>
          <div className="flex flex-col lg:flex-row">
            {/* Doctor Profile */}
            <div className=" space-y-6 lg:w-[60%] lg:px-6">
              {/* Main Profile Card */}
              <Card className="shadow-card">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="relative">
                      <img
                        src={therapist?.profileUrl}
                        alt={therapist?.name}
                        className="w-32 h-32 rounded-full object-cover border-4 border-medical-light"
                      />
                    </div>

                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                        <div>
                          <h1 className="text-3xl font-bold text-foreground mb-2">
                            {therapist?.name}
                          </h1>
                          <div className="flex items-center gap-4 text-muted-foreground mb-3">
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              <span className="font-medium">
                                {doctor.rating}
                              </span>
                              <span>({doctor?.reviewCount} reviews)</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              <span>{doctor?.location}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              <span>{therapist?.yearsOfExperience}</span>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {therapist?.categories.map((spec: string) => (
                              <Badge key={spec} variant="secondary">
                                {spec}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-3xl font-bold text-foreground">
                            ${therapist?.amount}
                          </div>
                          <div className="text-muted-foreground">/session</div>
                        </div>
                      </div>

                      <div className="flex gap-3 mb-4">
                        <Button variant="outline" size="sm">
                          <Video className="w-4 h-4 mr-2" />
                          Video
                        </Button>
                        <Button variant="outline" size="sm">
                          <MessageCircle className="w-4 h-4 mr-2" />
                          Chat
                        </Button>
                      </div>

                      <p className="text-muted-foreground text-justify">
                        {therapist?.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* About Section */}
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle>About Dr. {therapist?.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-2">Biography</h3>
                    <p className="text-muted-foreground text-justify">
                      {therapist?.summary}
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3">Education</h3>
                    <ul className="space-y-2">
                      {doctor.education.map((edu, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                          <span className="text-muted-foreground">{edu}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Languages</h3>
                    <div className="flex gap-2">
                      {doctor.languages.map((lang) => (
                        <Badge key={lang} variant="outline">
                          {lang}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Booking Sidebar */}
            <div className="pt-10 lg:w-[40%] lg:px-6 lg:pt-0">
              <div className="sticky top-24"></div>
              <Card className="shadow-elegant ">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-primary" />
                    Book Appointment
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CustomDatePicker
                    setSelectedDate={setSelectedDate}
                    selectedDate={selectedDate}
                  />

                  <div className="flex flex-wrap gap-8 pt-5 text-muted-foreground">
                    {slotLoader ? (
                      <Loader />
                    ) : slots.length === 0 ? (
                      <p className="">Choose Date to Check Availability</p>
                    ) : (
                      slots.map((time, i) => {
                        const parsedTime = parse(
                          time.timeStart,
                          "HH:mm",
                          new Date()
                        );
                        const formattedTime = format(parsedTime, "hh:mm a");
                        return (
                          <div
                            key={i}
                            className={`border-secondary w-[105px] rounded-[5px] border px-2 py-1 text-center text-[15px] font-medium ${
                              time.status === "Occupied" ||
                              time.status === "Not available"
                                ? "cursor-not-allowed bg-gray-300"
                                : "bg-secondary/[0.2] cursor-pointer"
                            } ${
                              time.timeStart === selectedTime
                                ? "bg-secondary/[0.6]"
                                : "null"
                            }`}
                            onClick={() =>
                              time.status === "Occupied" ||
                              time.status === "Not available"
                                ? null
                                : handleSelectedTime(time)
                            }
                          >
                            {formattedTime}
                            <div className="text-[12px] text-gray-600">
                              {time.status}
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                  <div className="pt-9 text-muted-foreground">
                    <p className=" text-xs">Session types</p>
                    <div className="flex items-center gap-5 pt-5">
                      <input
                        type="radio"
                        name="Zoom"
                        id="Zoom"
                        value={"Zoom"}
                        className="h-5 w-5 cursor-pointer"
                        checked={selectedOption === "Zoom"}
                        onChange={(e) => setSelectedOption(e.target.value)}
                      />
                      <img
                        src={Images.ZOOM}
                        alt="google-meet"
                        className="h-[50px]"
                      />
                    </div>
                  </div>

                  <div className="pt-9 text-muted-foreground">
                    <p className=" text-xs font-medium ">Summary</p>
                    <div>
                      {selectedDate && (
                        <div className=" mt-4 flex flex-col text-sm pb-3">
                          <p className="text-xl font-extrabold">Scheduled on</p>
                          <div className="flex">
                            <p className="text-xl font-medium">
                              {format(selectedDate, "EEE MMM dd yyyy")} {","}
                            </p>
                            <p className="text-xl font-medium">
                              {selectedTime}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                    {paymentLoading ? (
                      <Loader />
                    ) : (
                      <Button
                        variant="cta"
                        size="sm"
                        disabled={!selectedDate || !selectedTime}
                        onClick={
                          !selectedDate || !selectedTime ? null : handleBooking
                        }
                      >
                        Book Now
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorDetails;
