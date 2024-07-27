import axios from "axios";

const apiRequest = axios.create({
    baseURL:"https://property-listing-website-backend-ln5y.onrender.com/api",
    withCredentials:true
})

export default apiRequest;