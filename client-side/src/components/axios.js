import axios from "axios";

const axiosBase = () => {
    return axios.create({
        baseURL: "https://evangadi-forumbackend2024.onrender.com/api",
        // baseURL: "http://localhost:7000/api",
    });
};
export default axiosBase;
