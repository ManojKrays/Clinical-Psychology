import EmailVerification from "@/components/email-verification";
import apiDetails from "@/config/apiDetails";
import { put } from "@/config/network";
import { errorNotify, successNotify } from "@/utils/MessageBar";
import { Eye, EyeClosed, Lock } from "lucide-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
type FormData = {
  email: string;
  password: string;
};
const ForgotPassword = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [otpSent, setOtpSent] = useState<boolean>(false);
  const [otpVerified, setOtpVerified] = useState<boolean>(false);
  const [otpValue, setOtpValue] = useState<string>("");
  const [sendingOtp, setSendingOtp] = useState<boolean>(false);
  const [verifyingOtp, setVerifyingOtp] = useState<boolean>(false);
  const [isEmailVerified, setIsEmailVerified] = useState<boolean>(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    const { email, password } = formData;
    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address");
      setIsLoading(false);
      return;
    }

    if (!password || password.length < 8) {
      setError("Password must be at least 8 characters");
      setIsLoading(false);
      return;
    }

    try {
      const response = await put(apiDetails.endPoint.changePassword, {
        email: email,
        newPassword: password,
      });
      if (response.status) {
        successNotify(
          response?.data?.message || "Password changed successfully"
        );
        navigate("/login");
      } else {
        errorNotify("Please check the credentials");
      }
    } catch (error) {
      errorNotify(error.message || "Something went wrong");
      console.error("Change password error:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4 pt-24">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-4 text-center">
          <h1 className="bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-3xl font-bold text-transparent">
            Reset Password
          </h1>
          <p className="mt-2 text-gray-600">
            Don't worry, we'll help you get back in
          </p>
        </div>

        {/* Card */}
        <div className="rounded-lg border-0 bg-white/80 shadow-2xl backdrop-blur-sm">
          {/* Card Header */}
          <div className="p-6 pb-6">
            {!isSubmitted ? (
              <>
                <h2 className="mb-2 text-center text-2xl font-semibold text-gray-800">
                  Forgot your password?
                </h2>
                <p className="text-center text-gray-600">
                  Enter your email and we'll send you a reset link
                </p>
              </>
            ) : (
              <div className="text-center">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                  <svg
                    className="h-6 w-6 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h2 className="mb-2 text-2xl font-semibold text-gray-800">
                  Check your email
                </h2>
                <p className="text-gray-600">
                  We've sent a password reset link to {formData.email}
                </p>
              </div>
            )}
          </div>

          {/* Card Content */}
          <div className="space-y-6 px-6 pb-6">
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email address
                  </label>
                  <div className="relative">
                    <svg
                      className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    <input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="h-12 w-full rounded-md border border-gray-200 bg-white px-3 py-2 pl-10 text-sm transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
                      required
                    />
                  </div>
                  {error && (
                    <div className="flex items-center gap-2 text-sm text-red-600">
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      {error}
                    </div>
                  )}
                </div>
                <EmailVerification
                  email={formData.email}
                  purpose={"forgot-password"}
                  otpVerified={isEmailVerified}
                  setOtpVerifiedExternally={setIsEmailVerified}
                  otpSent={otpSent}
                  otpValue={otpValue}
                  sendingOtp={sendingOtp}
                  verifyingOtp={verifyingOtp}
                  setOtpSent={setOtpSent}
                  setOtpValue={setOtpValue}
                  setSendingOtp={setSendingOtp}
                  setVerifyingOtp={setVerifyingOtp}
                />
                {isEmailVerified && (
                  <>
                    <div className="space-y-2">
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-700"
                      >
                        New Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />

                        <input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your new password"
                          value={formData.password}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              password: e.target.value,
                            })
                          }
                          className="h-12 w-full rounded-md border border-gray-200 bg-white px-3 py-2 pr-10 pl-10 text-sm transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
                          required
                        />

                        <button
                          type="button"
                          onClick={() => setShowPassword((prev) => !prev)}
                          className="absolute top-1/2 right-3 -translate-y-1/2 transform text-gray-400 focus:outline-none"
                        >
                          {showPassword ? (
                            <Eye className="h-4 w-4" />
                          ) : (
                            <EyeClosed className="h-4 w-4" />
                          )}
                        </button>
                      </div>

                      {error && (
                        <div className="flex items-center gap-2 text-sm text-red-600">
                          <svg
                            className="h-4 w-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          {error}
                        </div>
                      )}
                    </div>
                  </>
                )}

                <button
                  type="submit"
                  className="bg-primary h-12 w-full transform rounded-lg font-medium text-white shadow-lg transition-all duration-200 hover:shadow-xl disabled:transform-none disabled:cursor-not-allowed disabled:opacity-50"
                  disabled={
                    isLoading || sendingOtp || verifyingOtp || !isEmailVerified
                  }
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"></div>
                      Sending...
                    </div>
                  ) : (
                    "Send reset link"
                  )}
                </button>
              </form>
            ) : (
              <div className="space-y-4">
                <div className="rounded-lg border border-green-200 bg-green-50 p-4">
                  <p className="text-sm text-green-800">
                    Didn't receive the email? Check your spam folder or try
                    again in a few minutes.
                  </p>
                </div>

                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormData({ email: "", password: "" });
                  }}
                  className="h-12 w-full rounded-lg border border-gray-200 bg-white font-medium text-gray-700 transition-colors hover:bg-gray-50"
                >
                  Try different email
                </button>
              </div>
            )}

            <div className="text-center">
              <Link
                to="/login"
                className="group inline-flex items-center gap-2 font-medium text-gray-600 transition-colors hover:text-gray-800"
              >
                <svg
                  className="h-4 w-4 transition-transform group-hover:-translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                Back to sign in
              </Link>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>
            Need help?{" "}
            <Link to={"/contact"} className="text-blue-600 hover:underline">
              Contact support
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
