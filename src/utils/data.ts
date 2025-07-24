import therapist1 from "@/assets/therapist-1.jpg";
import therapist2 from "@/assets/therapist-2.jpg";
import therapist3 from "@/assets/therapist-3.jpg";
import { Calendar, MessageCircle, Heart, UserCheck } from "lucide-react";

export const doctor = {
  id: "1",
  name: "Dr. Sarah Johnson",
  image: therapist1,
  rating: 4.9,
  reviewCount: 124,
  location: "New York, NY",
  experience: "8 years exp.",
  price: 120,
  specializations: ["Anxiety", "Depression", "CBT"],
  description:
    "Specializing in cognitive behavioral therapy with a focus on anxiety and depression. I believe in creating a safe, non-judgmental space where clients can explore their thoughts and emotions.",
  fullBio:
    "Dr. Sarah Johnson is a licensed clinical psychologist with over 8 years of experience in treating anxiety disorders, depression, and trauma. She specializes in Cognitive Behavioral Therapy (CBT) and has helped hundreds of clients overcome their mental health challenges. Dr. Johnson received her Ph.D. in Clinical Psychology from Columbia University and completed her internship at Mount Sinai Hospital.",
  education: [
    "Ph.D. in Clinical Psychology - Columbia University",
    "M.A. in Psychology - New York University",
    "B.A. in Psychology - Harvard University",
  ],
  languages: ["English", "Spanish"],
  availability: {
    "2024-01-15": ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"],
    "2024-01-16": ["09:00", "10:00", "14:00", "15:00"],
    "2024-01-17": ["09:00", "11:00", "14:00", "15:00", "16:00", "17:00"],
    "2024-01-18": ["10:00", "11:00", "14:00", "15:00"],
    "2024-01-19": ["09:00", "10:00", "11:00", "14:00", "15:00"],
  },
  occupiedSlots: {
    "2024-01-15": ["10:00", "15:00"],
    "2024-01-16": ["09:00", "15:00"],
    "2024-01-17": ["11:00", "16:00"],
    "2024-01-18": ["14:00"],
    "2024-01-19": ["10:00", "14:00"],
  },
};

export const therapists = [
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
    bio: "Specializing in cognitive behavioral therapy with a focus on anxiety and depression. I believe in creating a safe, non-judgmental space where clients can explore their thoughts and feelings while developing practical coping strategies.",
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
    bio: "Licensed clinical psychologist with extensive experience in trauma therapy and EMDR. I work with individuals who have experienced various forms of trauma, helping them process difficult experiences and rebuild their sense of safety.",
  },
  {
    id: "3",
    name: "Dr. Aisha Williams",
    image: therapist3,
    specialties: [
      "Couples Therapy",
      "Family",
      "Communication",
      "Relationships",
    ],
    experience: 10,
    rating: 4.9,
    reviews: 156,
    price: 130,
    location: "Chicago, IL",
    isOnline: true,
    bio: "Passionate about helping couples and families strengthen their relationships through improved communication and understanding. I use evidence-based approaches to address conflicts and build healthier relationship patterns.",
  },
];

export const specialties = [
  "Anxiety",
  "Depression",
  "Trauma",
  "PTSD",
  "CBT",
  "EMDR",
  "Couples Therapy",
  "Family Therapy",
];

export const locations = [
  "New York, NY",
  "Los Angeles, CA",
  "Chicago, IL",
  "Online Only",
];

export const steps = [
  {
    icon: UserCheck,
    title: "Browse & Choose",
    description:
      "Explore our network of licensed therapists and find one that matches your needs and preferences.",
    color: "text-primary",
  },
  {
    icon: Calendar,
    title: "Book Your Session",
    description:
      "Schedule your appointment at a time that works for you. Online or in-person options available.",
    color: "text-secondary",
  },
  {
    icon: MessageCircle,
    title: "Start Your Journey",
    description:
      "Connect with your therapist in a secure, confidential environment designed for your comfort.",
    color: "text-accent",
  },
  {
    icon: Heart,
    title: "Ongoing Support",
    description:
      "Continue your mental health journey with regular sessions and personalized care plans.",
    color: "text-success",
  },
];
