import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api/v1/",
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {

    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  // (error) => {
  //   if (error.response?.status === 401) {
  //     console.error("Unauthorized");
  //   }
  //   return Promise.reject(error);
  // }
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // const res = await axios.get(
        //   "http://localhost:8080/api/v1/refresh-token",
        //   {
        //     withCredentials: true,
        //   }
        // );
        const res = await api.get("refreshToken");

        const newAccessToken = res.data.accessToken;

        localStorage.setItem("accessToken", newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        console.error("Refresh token invalid or expired", refreshError);

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
