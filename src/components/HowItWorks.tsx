import { Calendar, MessageCircle, Heart, UserCheck } from "lucide-react";

const steps = [
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

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            How PsyConnect Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Getting started with professional mental health support is simple
            and straightforward
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-primary to-secondary transform -translate-y-1/2 z-0"></div>
              )}

              {/* Step Card */}
              <div className="relative bg-card rounded-xl p-6 border border-border shadow-soft hover:shadow-medium transition-all duration-300 lg:h-[290px] xl:h-[260px] text-center">
                {/* Step Number */}
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </div>

                {/* Icon */}
                <div
                  className={`w-16 h-16 rounded-full bg-gradient-to-br from-primary-light/20 to-secondary-light/20 flex items-center justify-center mx-auto mb-4 ${step.color}`}
                >
                  <step.icon className="w-8 h-8" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="space-y-2">
            <div className="text-3xl font-bold text-primary">500+</div>
            <div className="text-muted-foreground">Licensed Therapists</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-bold text-secondary">10k+</div>
            <div className="text-muted-foreground">Successful Sessions</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-bold text-accent">99%</div>
            <div className="text-muted-foreground">Client Satisfaction</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
