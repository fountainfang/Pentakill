import axios from "../utils/request";



const base = {
    baseUrl: "http://localhost:3300",
    //baseUrl: "http://localhost/petp",
    register: "/api/register",
    repeatusername: "/api/repeat/username",
    login: "/api/login",
    updateUser: "/api/updateUser"
};

const api = {
    register(params) {



        return axios.post(base.baseUrl + base.register, params);
    },
    repeatUserName(params) {

        return axios.get(base.baseUrl + base.repeatusername, {
            params
        })
    },

    //log in api
    login(params) {
        return axios.post(base.baseUrl + base.login, params)
    },
    updateUser(params) {
        return axios.put(base.baseUrl + base.updateUser, params);
    }


};

export default api;
