import axios from "axios";

const axiosBase = axios.create({
    //baseURL: "http://localhost:7000/api/"
    //baseURL: "https://evangadi-forumbackend2024.onrender.com/api",
    baseURL: "https://evangadi-forume.onrender.com",
});
export default axiosBase;
