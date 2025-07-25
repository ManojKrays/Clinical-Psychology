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
  },
};

export default apiDetails;
