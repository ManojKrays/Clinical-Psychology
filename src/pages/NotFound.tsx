import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Home, ArrowLeft, Search } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
      <div className="w-full max-w-2xl text-center">
        {/* 404 Animation */}
        <div className="relative mb-8">
          <div className="animate-pulse bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-9xl font-bold text-transparent">
            404
          </div>
          <div className="absolute inset-0 -z-10 translate-x-2 translate-y-2 transform text-9xl font-bold text-blue-100">
            404
          </div>
        </div>

        {/* Main Content */}
        <div className="mb-8">
          <h1 className="mb-4 text-4xl font-bold text-gray-900">
            Oops! Page Not Found
          </h1>
          <p className="mb-2 text-xl text-gray-600">
            The page you're looking for doesn't exist.
          </p>
          <p className="text-gray-500">
            It might have been moved, deleted, or you entered the wrong URL.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="mb-8 flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            to="/"
            className="group inline-flex items-center justify-center rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition-colors duration-200 hover:bg-blue-700"
          >
            <Home className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
            Go Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="group inline-flex items-center justify-center rounded-xl border border-gray-300 bg-white px-6 py-3 font-semibold text-gray-700 transition-colors duration-200 hover:bg-gray-50"
          >
            <ArrowLeft className="mr-2 h-5 w-5 transition-transform group-hover:-translate-x-1" />
            Go Back
          </button>
        </div>

        {/* Helpful Links */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">
            Maybe you're looking for:
          </h3>
          <div className="grid grid-cols-1 gap-4 text-sm sm:grid-cols-3">
            <Link
              to="/"
              className="text-blue-600 hover:text-blue-700 hover:underline"
            >
              Homepage
            </Link>
            <Link
              to="/categories"
              className="text-blue-600 hover:text-blue-700 hover:underline"
            >
              Mentors
            </Link>
            <Link
              to="/"
              className="text-blue-600 hover:text-blue-700 hover:underline"
            >
              Contact Support
            </Link>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-xs text-gray-500">
          Error Code: 404 | Route: {location.pathname}
        </div>
      </div>
    </div>
  );
};

export default NotFound;
