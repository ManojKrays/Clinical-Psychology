import Hero from "@/pages/Main/Hero";
import HowItWorks from "@/pages/Main/HowItWorks";
import TherapistDirectory from "./TherapistDirectory";

const Index = () => {
  return (
    <div className="min-h-screen pt-16">
      <Hero />
      <HowItWorks />
      <TherapistDirectory />
    </div>
  );
};

export default Index;
