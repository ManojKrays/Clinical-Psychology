import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import TherapistCard from "./TherapistCard";
import { Search, Filter, MapPin, DollarSign, Star } from "lucide-react";
import therapist1 from "@/assets/therapist-1.jpg";
import therapist2 from "@/assets/therapist-2.jpg";
import therapist3 from "@/assets/therapist-3.jpg";

// Mock data for therapists
const therapists = [
  {
    id: "1",
    name: "Sarah Johnson",
    image: therapist1,
    specialties: ["Anxiety", "Depression", "CBT", "Mindfulness"],
    experience: 8,
    rating: 4.9,
    reviews: 124,
    price: 120,
    location: "New York, NY",
    isOnline: true,
    bio: "Specializing in cognitive behavioral therapy with a focus on anxiety and depression. I believe in creating a safe, non-judgmental space where clients can explore their thoughts and feelings while developing practical coping strategies."
  },
  {
    id: "2", 
    name: "Michael Chen",
    image: therapist2,
    specialties: ["Trauma", "PTSD", "EMDR", "Adults"],
    experience: 12,
    rating: 4.8,
    reviews: 89,
    price: 150,
    location: "Los Angeles, CA",
    isOnline: true,
    bio: "Licensed clinical psychologist with extensive experience in trauma therapy and EMDR. I work with individuals who have experienced various forms of trauma, helping them process difficult experiences and rebuild their sense of safety."
  },
  {
    id: "3",
    name: "Dr. Aisha Williams",
    image: therapist3,
    specialties: ["Couples Therapy", "Family", "Communication", "Relationships"],
    experience: 10,
    rating: 4.9,
    reviews: 156,
    price: 130,
    location: "Chicago, IL", 
    isOnline: true,
    bio: "Passionate about helping couples and families strengthen their relationships through improved communication and understanding. I use evidence-based approaches to address conflicts and build healthier relationship patterns."
  }
];

const TherapistDirectory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [priceRange, setPriceRange] = useState("");

  const specialties = ["Anxiety", "Depression", "Trauma", "PTSD", "CBT", "EMDR", "Couples Therapy", "Family Therapy"];
  const locations = ["New York, NY", "Los Angeles, CA", "Chicago, IL", "Online Only"];

  return (
    <section id="therapists" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Find Your Perfect Therapist
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Browse our network of licensed clinical psychologists and find the right match for your needs
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
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Specialty Filter */}
            <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
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
            <Select value={selectedLocation} onValueChange={setSelectedLocation}>
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
            <Select value={priceRange} onValueChange={setPriceRange}>
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
            
            <Button variant="ghost" size="sm" onClick={() => {
              setSearchTerm("");
              setSelectedSpecialty("all-specialties");
              setSelectedLocation("all-locations");
              setPriceRange("any-price");
            }}>
              Clear Filters
            </Button>
          </div>
        </div>

        {/* Therapist Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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