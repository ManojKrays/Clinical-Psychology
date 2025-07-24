import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Video, MessageCircle, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import useIsScreenWidth from "@/hooks/useIsScreenWidth";

interface TherapistCardProps {
  id: string;
  name: string;
  image: string;
  specialties: string[];
  experience: number;
  rating: number;
  reviews: number;
  price: number;
  location: string;
  isOnline: boolean;
  bio: string;
}

const TherapistCard = ({
  id,
  name,
  image,
  specialties,
  experience,
  rating,
  reviews,
  price,
  location,
  isOnline,
  bio,
}: TherapistCardProps) => {
  const isExact320 = useIsScreenWidth(320);

  return (
    <div className="bg-card rounded-xl border border-border shadow-soft hover:shadow-medium transition-all duration-300 overflow-hidden group lg:w-[390px]">
      {/* Header with Image */}
      <div className="relative p-6 pb-4">
        <div className="flex items-center gap-4 ">
          <div className="relative">
            <img
              src={image}
              alt={`Dr. ${name}`}
              className="w-20 h-20 rounded-full object-cover border-2 border-primary-light"
            />
            {isOnline && (
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-success rounded-full border-2 border-card flex items-center justify-center">
                <div className="w-2 h-2 bg-success-foreground rounded-full"></div>
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-lg text-foreground mb-1">
              Dr. {name}
            </h3>
            <div className="flex items-center gap-2 mb-2">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-warning text-warning" />
                <span className="text-sm font-medium">{rating}</span>
                <span className="text-sm text-muted-foreground">
                  ({reviews} reviews)
                </span>
              </div>
            </div>
            <div
              className={`flex  gap-2 text-sm text-muted-foreground  ${
                isExact320 && "flex-col"
              }`}
            >
              <div className="flex items-center gap-2 justify-start">
                <MapPin className="w-4 h-4" />
                <span>{location}</span>
              </div>
              <div className="flex items-center gap-2 justify-start">
                <Clock className="w-4 h-4" />
                <span>{experience} years exp.</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 pb-4">
        {/* Specialties */}
        <div className="flex flex-wrap gap-2 mb-4">
          {specialties.slice(0, 3).map((specialty, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {specialty}
            </Badge>
          ))}
          {specialties.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{specialties.length - 3} more
            </Badge>
          )}
        </div>

        {/* Bio */}
        <p className="text-sm text-muted-foreground line-clamp-3 mb-4 text-justify">
          {bio}
        </p>

        {/* Session Types */}
        <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Video className="w-4 h-4" />
            <span>Video</span>
          </div>
          <div className="flex items-center gap-1">
            <MessageCircle className="w-4 h-4" />
            <span>Chat</span>
          </div>
        </div>

        {/* Price and CTA */}
        <div
          className={`flex  pt-4 border-t border-border ${
            isExact320 ? "flex-col " : "items-center justify-between"
          }`}
        >
          <div>
            <span className="text-2xl font-bold text-foreground">${price}</span>
            <span className="text-sm text-muted-foreground">/session</span>
          </div>

          <div className={`flex gap-2 ${isExact320 && "pt-3"}`}>
            <Link to={`/doctor/${id}`}>
              <Button variant="outline" size="sm" className="w-full">
                View Profile
              </Button>
            </Link>
            <Button variant="cta" size="sm" className="w-full">
              Book Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TherapistCard;
