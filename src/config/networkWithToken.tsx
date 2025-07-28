import axios from "axios";
import apiDetails from "./apiDetails";

const instance = axios.create({
  baseURL: apiDetails.baseUrl,
  withCredentials: false,
});

instance.interceptors.request.use(
  async (config) => {
    // const token = JSON.parse(localStorage.getItem("userDetails"));
    const token =
      "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbkBnbWFpbC5jb20iLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE3NTM2ODAyMjYsImV4cCI6MTc1Mzc2NjYyNn0.FOqyRWlSiDv2t6yqBIX0afyB0RMZAWySedTCoLDeGYk";
    // const parsedToken = token?.state?.user?.token;
    // if (parsedToken) {
    //   config.headers.Authorization = `Bearer ${parsedToken}`;
    // }
    config.headers.Authorization = `Bearer ${token}`;

    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    try {
      if (error.response) {
        // console.log("Error", error.response);
        const { data, status } = error.response;

        if (status === 401 && data?.error === "Token Expired") {
          localStorage.clear();
          //   add session expired logic here
        }

        return Promise.reject(data);
      } else {
        return Promise.reject(error);
      }
    } catch (error) {
      return Promise.reject(error);
    } finally {
    }
  }
);

export const authorizedGet = (url, config = {}) => {
  return instance.get(url, config);
};

export const authorizedPost = (url, data, config = {}) => {
  return instance.post(url, data, config);
};

export const authorizedPut = (url, data, config = {}) => {
  return instance.put(url, data, config);
};

export const authorizedPatch = (url, data, config = {}) => {
  return instance.patch(url, data, config);
};

export const authorizedDel = (url, config = {}) => {
  return instance.delete(url, config);
};

export default instance;
