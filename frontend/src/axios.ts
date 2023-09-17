import axios from "axios";
import { toast } from "react-toastify";

let API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;
if (process.env.REACT_APP_DEV === "dev") {
    API_ENDPOINT = "http://localhost:8000";
}

const axiosInstance = axios.create({
    baseURL: API_ENDPOINT,
    timeout: 5000,
    headers: {
        Authorization: localStorage.getItem("access")
            ? "Bearer " + localStorage.getItem("access")
            : null,
        "Content-Type": "application/json",
        accept: "application/json",
    },
});

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        const originalRequest = error.config;

        if (error.response.status === 401) {
            const refresh = localStorage.getItem("refresh");

            if (refresh && !originalRequest._retry) {
                originalRequest._retry = true;

                return new Promise((resolve, reject) => {
                    axiosInstance
                        .post("api/v1/token/refresh/", {
                            refresh: localStorage.getItem("refresh"),
                        })
                        .then((response) => {
                            localStorage.setItem(
                                "access",
                                response.data["access"]
                            );
                            localStorage.setItem(
                                "refresh",
                                response.data["refresh"]
                            );
                            axiosInstance.defaults.headers[
                                "Authorization"
                            ] = `Bearer ${response.data["access"]}`;
                            originalRequest.headers[
                                "Authorization"
                            ] = `Bearer ${response.data["access"]}`;
                            resolve(axiosInstance(originalRequest));
                        })
                        .catch((error) => {
                            reject(error);
                            toast.error("Unknown Error(31522)");
                        });
                });
            }
        }
        // if(originalRequest._retry){
        return Promise.reject(error);
        // }
    }
);

export default axiosInstance;
