const apiDetails = {
  baseUrl: "http://56.228.24.109:8080/api",
  endPoint: {
    getAllSlotsForTherapist: "/getTimeSlotsForTherapist",
    checkout: "/checkout",
    therapist_profile: "/therapist/getProfileDetails",
    filter: "therapist/search",
    login: "/auth/login",
    signUp: "/client/register",
    sendOtp: "/auth/sendOtp",
    verifyOtp: "/auth/verifyOtp",
    changePassword: "/auth/changePassword",
    sseToken: "/ai-therapist/sse-token",
    resume_upload: "/s3/upload/therapist-resumes",
    therapist_register: "/therapist/register",
    image_upload: "/s3/upload/therapist-images",
    client_image: "/s3/upload/client-images",
  },
};

export default apiDetails;
