import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

instance.interceptors.request.use(
  function (config) {
       if(typeof window !== "undefined" && window 
       && window.localStorage && window.localStorage.getItem("token")
       ){
              config.headers.Authorization = 'Bearer ' + window.localStorage.getItem("token")
       }
    // Do something before the request is sent
    return config;
  },
  function (error) {
    // Do something with the request error
    return Promise.reject(error);
  },
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // 2xx: Nếu response có wrapper ApiResponse { success, data, message } thì unwrap
    if (response.data && response.data.data !== undefined && 'success' in response.data) {
      return response.data;
    }
    return response;
  },
  function (error) {
    // 4xx/5xx: PHẢI reject để try-catch trong service bắt được
    // Không resolve error - đây là root cause của bug "tạo thành công nhưng hiện lỗi"
    return Promise.reject(error);
  },
);
export default instance