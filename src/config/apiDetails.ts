const apiDetails = {
  baseUrl: "http://56.228.24.109:8080/api",
  endPoint: {
    getAllSlotsForTherapist: "/getTimeSlotsForTherapist",
    checkout: "/checkout",
    therapist_profile: "/therapist/getProfileDetails",
    filter: "therapist/search",
    sseToken: "/ai-therapist/sse-token",
  },
};

export default apiDetails;
