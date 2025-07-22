import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Users, Clock } from "lucide-react";
import heroImage from "@/assets/hero-therapy.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center bg-gradient-to-br from-background via-primary-light/10 to-secondary-light/10 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9ImhzbCgyMTAgNjAlIDU1JSAvIDAuMDMpIiBmaWxsLXJ1bGU9Im5vbnplcm8iPjxjaXJjbGUgY3g9IjMwIiBjeT0iMzAiIHI9IjQiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-40"></div>
      
      <div className="container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-light/20 border border-primary-light">
                <Shield className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">Licensed & Secure</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold leading-tight text-foreground">
                Find Your Perfect{" "}
                <span className="bg-gradient-hero bg-clip-text text-transparent">
                  Therapist
                </span>{" "}
                Today
              </h1>
              
              <p className="text-xl text-muted-foreground leading-relaxed">
                Connect with licensed clinical psychologists who understand your journey. 
                Secure, confidential, and designed for your mental wellness.
              </p>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-primary" />
                <span>500+ Licensed Therapists</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-secondary" />
                <span>Available 24/7</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-accent" />
                <span>HIPAA Compliant</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button variant="hero" size="xl" className="group">
                Book Your First Session
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="soft" size="xl">
                Browse Therapists
              </Button>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-strong">
              <img 
                src={heroImage} 
                alt="Professional therapy session in a calming environment"
                className="w-full h-[500px] md:h-[600px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"></div>
            </div>
            
            {/* Floating Cards */}
            <div className="absolute -top-6 -left-6 bg-card rounded-xl p-4 shadow-medium border border-border">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center">
                  <Shield className="w-6 h-6 text-success" />
                </div>
                <div>
                  <p className="font-semibold text-sm">Secure & Private</p>
                  <p className="text-xs text-muted-foreground">End-to-end encrypted</p>
                </div>
              </div>
            </div>
            
            <div className="absolute -bottom-6 -right-6 bg-card rounded-xl p-4 shadow-medium border border-border">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-sm">Expert Care</p>
                  <p className="text-xs text-muted-foreground">Licensed professionals</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;