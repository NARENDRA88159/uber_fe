import Cookies from "js-cookie";
import axios from "axios";

const axiosWithHeader = axios.create();
axiosWithHeader.interceptors.request.use( 
    (config) => {
        const token = Cookies.get("token") || null;
        if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
    );

axiosWithHeader.interceptors.response.use(    
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            Cookies.remove("token");
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);
export default axiosWithHeader;