import React from "react";
import { errorNotify, successNotify } from "@/utils/MessageBar";
import apiDetails from "@/config/apiDetails";
import { post } from "@/config/network";

interface EmailVerificationProps {
  email: string;
  purpose: string;
  otpVerified: boolean;
  otpSent: boolean;
  otpValue: string;
  sendingOtp: boolean;
  verifyingOtp: boolean;
  setOtpSent: (value: boolean) => void;
  setOtpValue: (value: string) => void;
  setSendingOtp: (value: boolean) => void;
  setVerifyingOtp: (value: boolean) => void;
  setOtpVerifiedExternally: (value: boolean) => void;
}

const EmailVerification = ({
  email,
  purpose,
  otpVerified,
  otpSent,
  otpValue,
  sendingOtp,
  verifyingOtp,
  setOtpSent,
  setOtpValue,
  setSendingOtp,
  setVerifyingOtp,
  setOtpVerifiedExternally,
}: EmailVerificationProps) => {
  const handleSendOtp = async () => {
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email ?? "");
    if (!email || !isValidEmail) {
      errorNotify("Please enter a valid email before sending OTP");
      return;
    }
    if (otpSent && !otpVerified) {
      errorNotify("OTP already sent. Please verify or resend.");
      return;
    }
    try {
      setSendingOtp(true);
      const response = await post(
        `${apiDetails.endPoint.sendOtp}?email=${email}&purpose=${purpose}`
      );
      if (response.status) {
        successNotify("OTP sent successfully!");
        setOtpSent(true);
      } else {
        errorNotify("Failed to send OTP.");
      }
    } catch (err) {
      errorNotify("Error sending OTP.");
      console.error(err);
    } finally {
      setSendingOtp(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otpValue) {
      errorNotify("Enter OTP to verify.");
      return;
    }

    try {
      setVerifyingOtp(true);
      const response = await post(
        `${apiDetails.endPoint.verifyOtp}?email=${encodeURIComponent(
          email
        )}&otp=${encodeURIComponent(otpValue)}`,
        {}
      );

      if (response?.status) {
        successNotify("OTP verified successfully!");
        setOtpVerifiedExternally(true);
      } else {
        errorNotify("Invalid OTP. Please try again.");
        setOtpVerifiedExternally(false);
      }
    } catch (error) {
      errorNotify("Error verifying OTP.");
      setOtpVerifiedExternally(false);
      console.error(error);
    } finally {
      setVerifyingOtp(false);
    }
  };

  return (
    <div className="mt-2 flex items-center gap-2">
      <button
        type="button"
        onClick={handleSendOtp}
        className="rounded bg-blue-500 px-3 py-1 lg:text-[12px] md:text-[10px] text-sm text-white hover:bg-blue-600"
        disabled={sendingOtp || otpVerified}
      >
        {sendingOtp ? "Sending..." : otpVerified ? "Verified" : "Send OTP"}
      </button>

      {otpSent && !otpVerified && (
        <>
          <input
            type="text"
            className="w-24 rounded border px-2 py-1 lg:text-[12px] md:text-[10px] text-sm"
            placeholder="Enter OTP"
            value={otpValue}
            onChange={(e) => setOtpValue(e.target.value)}
          />
          <button
            type="button"
            onClick={handleVerifyOtp}
            className="rounded bg-green-500 px-3 py-1 lg:text-[12px] md:text-[10px] text-sm text-white hover:bg-green-600"
            disabled={verifyingOtp}
          >
            {verifyingOtp ? "Verifying..." : "Verify"}
          </button>
        </>
      )}
    </div>
  );
};
export default EmailVerification;
