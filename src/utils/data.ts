import therapist1 from "@/assets/therapist-1.jpg";
import therapist2 from "@/assets/therapist-2.jpg";
import therapist3 from "@/assets/therapist-3.jpg";
import { Calendar, MessageCircle, Heart, UserCheck } from "lucide-react";
import String from "./String";

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
export const specialtiesList = [
  { label: "Anxiety", value: "Anxiety" },
  { label: "Depression", value: "Depression" },
  { label: "Trauma", value: "Trauma" },
  { label: "PTSD", value: "PTSD" },
  { label: "CBT", value: "CBT" },
  { label: "EMDR", value: "EMDR" },
  { label: "Couples Therapy", value: "Couples Therapy" },
  { label: "Family Therapy", value: "Family Therapy" },
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
export const timeslots = [
  { label: "01:00", value: "01:00" },
  { label: "02:00", value: "02:00" },
  { label: "03:00", value: "03:00" },
  { label: "04:00", value: "04:00" },
  { label: "05:00", value: "05:00" },
  { label: "06:00", value: "06:00" },
  { label: "07:00", value: "07:00" },
  { label: "08:00", value: "08:00" },
  { label: "09:00", value: "09:00" },
  { label: "10:00", value: "10:00" },
  { label: "11:00", value: "11:00" },
  { label: "12:00", value: "12:00" },
  { label: "13:00", value: "13:00" },
  { label: "14:00", value: "14:00" },
  { label: "15:00", value: "15:00" },
  { label: "16:00", value: "16:00" },
  { label: "17:00", value: "17:00" },
  { label: "18:00", value: "18:00" },
  { label: "19:00", value: "19:00" },
  { label: "20:00", value: "20:00" },
  { label: "21:00", value: "21:00" },
  { label: "22:00", value: "22:00" },
  { label: "23:00", value: "23:00" },
  { label: "24:00", value: "24:00" },
];
export const therapistTerms = [
  {
    title: String.terms.independentTherapistTitle,
    body: [
      String.terms.independentTherapistBody1,
      String.terms.independentTherapistBody2,
    ],
  },
  {
    title: String.terms.profileConductTitle,
    body: [String.terms.profileConductBody1, String.terms.profileConductBody2],
  },
  {
    title: String.terms.licenseTitle,
    body: [String.terms.licenseBody1, String.terms.licenseBody2],
  },
  {
    title: String.terms.confidentialityTitle,
    body: [
      String.terms.confidentialityBody1,
      String.terms.confidentialityBody2,
    ],
  },
  {
    title: String.terms.terminationTitle,
    body: [String.terms.terminationBody1, String.terms.terminationBody2],
  },
];
export const cardDetails = [
  {
    heading: "Expand Your Reach",
    des: "Connect with individuals worldwide who are actively seeking professional mental health support.",
  },
  {
    heading: "Build Your Professional Reputation",
    des: "Enhance your credibility with client reviews, testimonials, and greater visibility on our platform.",
  },
  {
    heading: "Earn While Making a Difference",
    des: "Provide paid therapy sessions and grow your private practice or online presence.",
  },
  {
    heading: "Make a Global Impact",
    des: "Support mental well-being across diverse cultures and communities.",
  },
  {
    heading: "Offer Free Intro Sessions",
    des: "Optionally provide free first-time sessions for new clients or platform promotions.",
  },
];
