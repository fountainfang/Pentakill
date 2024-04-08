import axios from "../utils/request";

const base = {
    baseUrl: "http://localhost:3300",
    register: "/api/register",
    repeatusername: "/api/repeat/username",
    login: "/api/login",
    createEvent: "/api/createEvent",
    updateStatus: "/api/updateStatus",
    getEvents: "/api/getEvents",
    updateUser: "/api/updateUser",
    createOrder: "/api/createOrder"
};

const api = {
    register(params) {

        return axios.post(base.baseUrl + base.register, params);
    },
    repeatUserName(params) {
        return axios.get(base.baseUrl + base.repeatusername, { params });
    },
    login(params) {

        return axios.post(base.baseUrl + base.login, params);
    },
    createEvent(params) {
        return axios.post(base.baseUrl + base.createEvent, params);
    },
    updateStatus(params) {
        return axios.post(base.baseUrl + base.updateStatus, params);
    },
    getEvents() {
        return axios.get(base.baseUrl + base.getEvents);
    },
    createOrder(params) {
        return axios.post(base.baseUrl + base.createOrder, params);
    }


};

export default api;
