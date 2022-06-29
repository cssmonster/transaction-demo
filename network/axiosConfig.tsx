import axios from "axios";
import { _getCookie } from "utils/cookies";

axios.interceptors.request.use(
  (req: any) => {
    _getCookie("accessToken") &&
      (req.headers["Authorization"] = `Bearer ${_getCookie("accessToken")}`);
    return req;
  },
  (err) => {
    return Promise.reject(err);
  }
);

// For POST requests
axios.interceptors.response.use(
  (res) => {
    // Add configurations here
    if (res.status === 201) {
      console.log("Posted Successfully");
    }
    if (res.status === 401) {
      console.log("Unauthorized");
    }
    return res;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export default axios;
