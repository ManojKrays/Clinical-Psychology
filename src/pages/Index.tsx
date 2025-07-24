import Header from "@/components/Header";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import TherapistDirectory from "@/components/TherapistDirectory";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen pt-16">
      <Hero />
      <HowItWorks />
      <TherapistDirectory />
      <Footer />
    </div>
  );
};

export default Index;
