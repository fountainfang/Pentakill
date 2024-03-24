import axios from "../utils/request";



const base = {
    baseUrl: "http://localhost:3300",
    //baseUrl: "http://localhost/petp",
    register: "/api/register",
    repeatusername: "/api/repeat/username",
    login: "/api/login"
};

const api = {
    register(params) {

        return axios.post(base.baseUrl + base.register, params);
    },
    repeatUserName(params) {
        console.log(params);
        return axios.get(base.baseUrl + base.repeatusername, {
            params
        })
    },

    //log in api
    login(params) {
        return axios.post(base.baseUrl + base.login, params)
    }
};

export default api;
