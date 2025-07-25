import { successNotify } from "@/utils/MessageBar";
import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const PaymentSuccess = () => {
  const { sessionId } = useParams();

  useEffect(() => {
    successNotify("Your Booking Has Been Completed!");
    console.log("payment completed");
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 p-6">
      <div className="w-full max-w-md">
        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl">
          <div className="relative mx-auto h-24 w-24 pt-5">
            <div className="absolute inset-0 top-5 animate-ping rounded-full bg-emerald-100 opacity-75"></div>
            <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-emerald-500 shadow-lg">
              <svg
                className="h-12 w-12 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>

          <div className="px-8 py-10 text-center">
            <h1 className="mb-3 text-3xl font-bold text-gray-900">
              Payment Successful!
            </h1>
            <p className="mb-2 text-lg text-gray-600">
              Thank you for your purchase
            </p>
            <p className="mb-8 text-sm text-gray-500">
              Your payment has been processed successfully. You'll receive a
              confirmation email shortly.
            </p>

            <div className="mb-8 rounded-xl bg-gray-50 p-6">
              <div className="mb-3 flex items-center justify-between">
                <span className="font-medium text-gray-600">Payment ID</span>
                <span className="font-mono text-sm text-gray-900">
                  #{sessionId.slice(1, 15)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium text-gray-600">Status</span>
                <span className="inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-800">
                  <div className="mr-2 h-1.5 w-1.5 rounded-full bg-emerald-500"></div>
                  Completed
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <Link
                to="/"
                className="group flex w-full items-center justify-center rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white transition-colors duration-200 hover:bg-emerald-700"
              >
                <svg
                  className="mr-2 h-5 w-5 transition-transform group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                Continue
              </Link>
            </div>
          </div>

          <div className="border-t border-gray-100 bg-gray-50 px-8 py-4">
            <p className="text-center text-xs text-gray-500">
              Need help? Contact our{" "}
              <Link
                to="/support"
                className="font-medium text-emerald-600 hover:text-emerald-700"
              >
                customer support
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
