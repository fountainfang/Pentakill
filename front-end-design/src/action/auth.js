import api from "../api"
function setUserObj(user) {
    return {
        type: "setUser",
        user
    }
}

export function logOut() {
    return dispatch => {
        dispatch(setUserObj({}))
    }
}

export function asyncsetUserObj(data) {
    return dispatch => {
        return api.login(data).then((res) => {
            if (res.data.status === 200) {
                dispatch(setUserObj({
                    token: res.data.token,
                    nick: res.data.nick,
                    customerid: res.data.customerid,
                    email: res.data.email,
                    phonenum: res.data.phonenumber,
                    address: res.data.address,
                    city: res.data.city,
                    state: res.data.province,
                    country: res.data.country,
                    postalCode: res.data.postalCode,
                    firstname: res.data.firstname,
                    lastname: res.data.lastname

                }))
                localStorage.setItem("rl", JSON.stringify({
                    token: res.data.token,
                    nick: res.data.nick,
                    customerid: res.data.customerid,
                    email: res.data.email,
                    phonenum: res.data.phonenumber,
                    address: res.data.address,
                    city: res.data.city,
                    state: res.data.province,
                    country: res.data.country,
                    postalCode: res.data.postalCode,
                    firstname: res.data.firstname,
                    lastname: res.data.lastname

                }))
            }
            return res


        })
    }
}

