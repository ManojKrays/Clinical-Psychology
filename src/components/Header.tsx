import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Brain, Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "@/store/authStore";
import Images from "@/utils/Images";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { clearUser } = useAuthStore();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const userDetails = useAuthStore((state) => state.user);
  const role = userDetails ? userDetails.role : "user";
  const logoutHandler = () => {
    navigate("/login");
    clearUser();
    localStorage.clear();
  };

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border shadow-soft">
      <div className="container mx-auto px-4 py-4">
        <div className="flex  items-center justify-between w-full">
          <div
            className="flex flex-row justify-between items-center lg:gap-60 gap-10"
            onClick={() => navigate("/")}
          >
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
                <Brain className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="text-2xl font-bold text-foreground">
                PsyConnect
              </span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center justify-center gap-8 text-[14px] lg:text-[16px]">
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
          </div>

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex">
            {userDetails ? (
              <div className="relative">
                <button
                  className="flex cursor-pointer items-center gap-3 rounded-full"
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                >
                  <img
                    src={userDetails?.profileUrl || Images.PROFILE}
                    alt="Profile"
                    className="h-8 w-8 rounded-full object-cover"
                  />
                </button>
                {isProfileMenuOpen && (
                  <div className="absolute right-4 z-50 mt-2 w-40 rounded-md bg-white shadow-lg">
                    {role !== "ADMIN" && (
                      <button
                        onClick={() => {
                          setIsProfileMenuOpen(false);
                        }}
                        className="w-full px-4 py-2 text-left hover:bg-gray-100"
                      >
                        Profile
                      </button>
                    )}

                    <button
                      onClick={() => {
                        setIsProfileMenuOpen(false);
                      }}
                      className="w-full px-4 py-2 text-left hover:bg-gray-100"
                    >
                      Dashboard
                    </button>

                    <button
                      className="w-full cursor-pointer px-4 py-2 text-left hover:bg-gray-100"
                      onClick={() => {
                        logoutHandler();
                        setIsProfileMenuOpen(false);
                      }}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-3">
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
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden cursor-pointer">
            {menuOpen ? (
              <X size={25} onClick={() => setMenuOpen(!menuOpen)} />
            ) : (
              <div className="relative flex items-center gap-3">
                {userDetails && (
                  <div className="relative">
                    <button
                      className="flex cursor-pointer items-center gap-3 rounded-full"
                      onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                    >
                      <div className="w-10 h-10 flex items-center justify-center overflow-hidden rounded-full border border-gray-300 bg-white">
                        <img
                          src={userDetails?.profileUrl || Images.PROFILE}
                          alt="Profile"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </button>

                    {isProfileMenuOpen && (
                      <div className="absolute top-5 right-3 z-50 w-32 rounded-md bg-white shadow-lg">
                        {role !== "ADMIN" && (
                          <button
                            onClick={() => {
                              setIsProfileMenuOpen(false);
                            }}
                            className="w-full px-4 py-2 text-left hover:bg-gray-100"
                          >
                            Profile
                          </button>
                        )}

                        <button
                          className="w-full cursor-pointer px-4 py-2 text-left hover:bg-gray-100"
                          onClick={() => {
                            setIsProfileMenuOpen(false);
                            setMenuOpen(false);
                          }}
                        >
                          Dashboard
                        </button>

                        <button
                          className="w-full cursor-pointer px-4 py-2 text-left hover:bg-gray-100"
                          onClick={() => {
                            logoutHandler();
                            setIsProfileMenuOpen(false);
                            setMenuOpen(false);
                          }}
                        >
                          Logout
                        </button>
                      </div>
                    )}
                  </div>
                )}
                <Menu size={25} onClick={() => setMenuOpen(!menuOpen)} />
              </div>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        {menuOpen && (
          <div className="md:hidden mt-4 space-y-4">
            <nav className="flex flex-col gap-4 ">
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
            {!userDetails && (
              <div className="flex flex-col gap-3">
                <Button
                  variant="soft"
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
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
