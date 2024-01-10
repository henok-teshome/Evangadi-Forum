import axios from "axios";

const axiosBase = () => {
    return axios.create({
        baseURL: "http://localhost:7000/api",
    });
};
export default axiosBase;
