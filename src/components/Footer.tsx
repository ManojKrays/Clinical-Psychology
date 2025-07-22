import { Brain, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
                <Brain className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="text-2xl font-bold">PsyConnect</span>
            </div>
            <p className="text-background/80 leading-relaxed">
              Connecting you with licensed mental health professionals for a healthier, happier life.
            </p>
            <div className="flex gap-3">
              <Button variant="ghost" size="icon" className="hover:bg-background/10">
                <Facebook className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-background/10">
                <Twitter className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-background/10">
                <Instagram className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-background/10">
                <Linkedin className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li><a href="#therapists" className="text-background/80 hover:text-background transition-colors">Find Therapists</a></li>
              <li><a href="#how-it-works" className="text-background/80 hover:text-background transition-colors">How It Works</a></li>
              <li><a href="#about" className="text-background/80 hover:text-background transition-colors">About Us</a></li>
              <li><a href="#pricing" className="text-background/80 hover:text-background transition-colors">Pricing</a></li>
              <li><a href="#blog" className="text-background/80 hover:text-background transition-colors">Blog</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Support</h4>
            <ul className="space-y-3">
              <li><a href="#help" className="text-background/80 hover:text-background transition-colors">Help Center</a></li>
              <li><a href="#faq" className="text-background/80 hover:text-background transition-colors">FAQ</a></li>
              <li><a href="#privacy" className="text-background/80 hover:text-background transition-colors">Privacy Policy</a></li>
              <li><a href="#terms" className="text-background/80 hover:text-background transition-colors">Terms of Service</a></li>
              <li><a href="#contact" className="text-background/80 hover:text-background transition-colors">Contact Us</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary" />
                <span className="text-background/80">support@psyconnect.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-secondary" />
                <span className="text-background/80">1-800-PSY-HELP</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-accent" />
                <span className="text-background/80">Available Nationwide</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-background/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-background/60 text-sm">
            © 2025 PsyConnect. All rights reserved.
          </p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#privacy" className="text-background/60 hover:text-background text-sm transition-colors">
              Privacy
            </a>
            <a href="#terms" className="text-background/60 hover:text-background text-sm transition-colors">
              Terms
            </a>
            <a href="#accessibility" className="text-background/60 hover:text-background text-sm transition-colors">
              Accessibility
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;