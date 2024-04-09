import axios from "../utils/request";

const base = {
    baseUrl: "http://localhost:3300",
    register: "/api/register",
    repeatusername: "/api/repeat/username",
    login: "/api/login",
    createEvent: "/api/createEvent",
    updateStatus: "/api/updateStatus",
    getEvents: "/api/getEvents",
    getUserEvents:"/api/getUserEvents",
    updateUser: "/api/updateUser",
    createOrder: "/api/createOrder",
    getOrder: "/api/getOrder",
    updateEvent:"/api/updateEvent",
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
    getUserEvents(params) {
        return axios.get(base.baseUrl + base.getUserEvents,  {params} );
    },
    createOrder(params) {
        return axios.post(base.baseUrl + base.createOrder, params);
    },
    getOrder(params) {
        return axios.get(base.baseUrl + base.getOrder, { params })
    },
    updateEvent(params){
        return axios.get(base.baseUrl + base.getOrder, { params })

    }

};

export default api;
