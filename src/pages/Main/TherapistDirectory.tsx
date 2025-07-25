import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import TherapistCard from "../../components/TherapistCard";
import { Search, Filter, MapPin, DollarSign, Star } from "lucide-react";
import { locations, specialties, therapists } from "@/utils/data";
import { useQuery } from "@tanstack/react-query";
import { errorNotify } from "@/utils/MessageBar";
import { get } from "@/config/network";
import apiDetails from "@/config/apiDetails";

const TherapistDirectory = () => {
  // const [searchTerm, setSearchTerm] = useState("");
  // const [selectedSpecialty, setSelectedSpecialty] = useState("");
  // const [selectedLocation, setSelectedLocation] = useState("");
  // const [priceRange, setPriceRange] = useState("");

  type FilterType = {
    name: string;
    category: string;
    location: string;
    price: string;
  };

  const [filter, setFilter] = useState<FilterType>({
    name: "",
    category: "",
    location: "",
    price: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilter((pre) => ({ ...pre, [name]: value }));
  };

  const filterTherapist = async ({ queryKey }) => {
    try {
      const [_key, filter] = queryKey;
      const params = new URLSearchParams(filter).toString();
      const res = await get(`${apiDetails.endPoint.filter}?${params}`);
      return res?.data?.data || [];
    } catch (err) {
      errorNotify(err.message || "something went wrong..!");
      return [];
    }
  };

  const { data, isLoading } = useQuery({
    queryKey: ["filter", filter],
    queryFn: filterTherapist,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  return (
    <section id="therapists" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Find Your Perfect Therapist
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Browse our network of licensed clinical psychologists and find the
            right match for your needs
          </p>
        </div>

        {/* Filters */}
        <div className="bg-card rounded-xl border border-border shadow-soft p-6 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search by name or specialty"
                name="name"
                value={filter?.name}
                onChange={(e) => handleChange(e)}
                className="pl-10"
              />
            </div>

            {/* Specialty Filter */}
            <Select
              value={filter?.category}
              onValueChange={handleChange}
              name="category"
            >
              <SelectTrigger>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-muted-foreground" />
                  <SelectValue placeholder="Specialty" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-specialties">All Specialties</SelectItem>
                {specialties.map((specialty) => (
                  <SelectItem key={specialty} value={specialty}>
                    {specialty}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Location Filter */}
            <Select
              value={filter?.location}
              onValueChange={(e) => handleChange(e)}
              name="location"
            >
              <SelectTrigger>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <SelectValue placeholder="Location" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-locations">All Locations</SelectItem>
                {locations.map((location) => (
                  <SelectItem key={location} value={location}>
                    {location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Price Range */}
            <Select
              value={filter?.price}
              onValueChange={(e) => handleChange(e)}
              name="price"
            >
              <SelectTrigger>
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-muted-foreground" />
                  <SelectValue placeholder="Price Range" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any-price">Any Price</SelectItem>
                <SelectItem value="0-100">$0 - $100</SelectItem>
                <SelectItem value="100-150">$100 - $150</SelectItem>
                <SelectItem value="150-200">$150 - $200</SelectItem>
                <SelectItem value="200+">$200+</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Filter Actions */}
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                {therapists.length} therapists found
              </span>
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setFilter({
                  name: "",
                  speciality: "",
                  location: "",
                  price: "",
                });
              }}
            >
              Clear Filters
            </Button>
          </div>
        </div>

        {/* Therapist Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8 lg:w-[85%] xl:w-full mx-auto">
          {/* <div className="flex flex-wrap flex-row gap-8"> */}
          {therapists.map((therapist) => (
            <TherapistCard key={therapist.id} {...therapist} />
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button variant="soft" size="lg">
            Load More Therapists
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TherapistDirectory;
