import React, { useState } from "react";
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

const DoctorDetails = () => {
  const { mentorId } = useParams();

  const [selectedDate, setSelectedDate] = useState(null);
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-24">
        <div>
          <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4">
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
                      src={doctor.image}
                      alt={doctor.name}
                      className="w-32 h-32 rounded-full object-cover border-4 border-medical-light"
                    />
                  </div>

                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                      <div>
                        <h1 className="text-3xl font-bold text-foreground mb-2">
                          {doctor.name}
                        </h1>
                        <div className="flex items-center gap-4 text-muted-foreground mb-3">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="font-medium">{doctor.rating}</span>
                            <span>({doctor.reviewCount} reviews)</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            <span>{doctor.location}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>{doctor.experience}</span>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {doctor.specializations.map((spec) => (
                            <Badge key={spec} variant="secondary">
                              {spec}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-bold text-foreground">
                          ${doctor.price}
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
                      {doctor.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* About Section */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>About Dr. {doctor.name.split(" ")[1]}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-2">Biography</h3>
                  <p className="text-muted-foreground text-justify">
                    {doctor.fullBio}
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
            <Card className="shadow-elegant sticky top-24">
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
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDetails;
