import axios from "../utils/request";

const base = {
    baseUrl: "http://localhost:3300",
    register: "/api/register",
};

const api = {
    register(params) {
        return axios.post(base.baseUrl + base.register, params);
    }
};

export default api;
