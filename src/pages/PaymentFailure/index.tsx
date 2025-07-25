import { Link, useParams } from "react-router-dom";

const PaymentFailure = () => {
    const { sessionId } = useParams();

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 p-6">
            <div className="w-full max-w-md">
                <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl">
                    <div className="relative mx-auto h-24 w-24 pt-5">
                        <div className="absolute inset-0 top-6 animate-ping rounded-full bg-red-100 opacity-75"></div>
                        <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-red-500 shadow-lg">
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
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </div>
                    </div>

                    <div className="px-8 py-10 text-center">
                        <h1 className="mb-3 text-3xl font-bold text-gray-900">Payment Failed</h1>
                        <p className="mb-2 text-lg text-gray-600">We couldn't process your payment</p>
                        <p className="mb-8 text-sm text-gray-500">
                            This could be due to insufficient funds, an expired card, or the payment was cancelled. Don't worry - no charges were
                            made.
                        </p>

                        <div className="mb-8 rounded-xl border border-red-100 bg-red-50 p-6">
                            <div className="mb-3 flex items-center justify-between">
                                <span className="font-medium text-gray-600">Status</span>
                                <span className="inline-flex items-center rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-800">
                                    <div className="mr-2 h-1.5 w-1.5 rounded-full bg-red-500"></div>
                                    Failed
                                </span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="font-medium text-gray-600">Reference</span>
                                <span className="font-mono text-sm text-gray-900">#{sessionId.slice(1, 15)}</span>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <Link
                                to="/"
                                className="group flex w-full items-center justify-center rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition-colors duration-200 hover:bg-blue-700"
                            >
                                <svg
                                    className="mr-2 h-5 w-5 transition-transform group-hover:rotate-45"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                                    />
                                </svg>
                                Try Again
                            </Link>

                            <Link
                                to="/"
                                className="flex w-full items-center justify-center rounded-xl border border-gray-300 bg-white px-6 py-3 font-semibold text-gray-700 transition-colors duration-200 hover:bg-gray-50"
                            >
                                <svg
                                    className="mr-2 h-5 w-5"
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
                                Return to Home
                            </Link>
                        </div>
                    </div>

                    <div className="border-t border-gray-100 bg-gray-50 px-8 py-6">
                        <h3 className="mb-3 text-center text-sm font-semibold text-gray-900">Common Solutions</h3>
                        <ul className="space-y-2 text-xs text-gray-600">
                            <li className="flex items-start">
                                <div className="mt-1.5 mr-3 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gray-400"></div>
                                Check your card details and billing address
                            </li>
                            <li className="flex items-start">
                                <div className="mt-1.5 mr-3 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gray-400"></div>
                                Ensure sufficient funds are available
                            </li>
                            <li className="flex items-start">
                                <div className="mt-1.5 mr-3 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gray-400"></div>
                                Contact your bank if the issue persists
                            </li>
                        </ul>
                        <div className="mt-4 border-t border-gray-200 pt-4">
                            <Link
                                to="/"
                                className="block text-center text-sm font-medium text-blue-600 transition-colors hover:text-blue-700"
                            >
                                Still need help? Contact support →
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentFailure;
