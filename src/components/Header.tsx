import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Brain, Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border shadow-soft">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between cursor-pointer">
          {/* Logo */}
          <div
            className="flex items-center gap-2"
            onClick={() => navigate("/")}
          >
            <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
              <Brain className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold text-foreground">
              PsyConnect
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a
              href="#therapists"
              className="text-foreground hover:text-primary transition-colors"
            >
              Find Therapists
            </a>
            <a
              href="#how-it-works"
              className="text-foreground hover:text-primary transition-colors"
            >
              How It Works
            </a>
            <a
              href="#about"
              className="text-foreground hover:text-primary transition-colors"
            >
              About
            </a>
            <a
              href="#contact"
              className="text-foreground hover:text-primary transition-colors"
            >
              Contact
            </a>
          </nav>

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                navigate("/login");
              }}
            >
              Sign In
            </Button>
            <Button
              variant="cta"
              size="sm"
              onClick={() => {
                navigate("/signup");
              }}
            >
              Signup
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {menuOpen && (
          <div className="md:hidden mt-4 space-y-4">
            <nav className="flex flex-col gap-4">
              <a
                href="#therapists"
                className="text-foreground hover:text-primary transition-colors"
              >
                Find Therapists
              </a>
              <a
                href="#how-it-works"
                className="text-foreground hover:text-primary transition-colors"
              >
                How It Works
              </a>
              <a
                href="#about"
                className="text-foreground hover:text-primary transition-colors"
              >
                About
              </a>
              <a
                href="#contact"
                className="text-foreground hover:text-primary transition-colors"
              >
                Contact
              </a>
            </nav>
            <div className="flex flex-col gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setMenuOpen(false);
                  navigate("/login");
                }}
              >
                Sign In
              </Button>
              <Button
                variant="cta"
                size="sm"
                onClick={() => {
                  setMenuOpen(false);
                  navigate("/signup");
                }}
              >
                Signup
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
