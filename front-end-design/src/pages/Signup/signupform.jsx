import React, { Component } from 'react'
import api from '../../api';
import classNames from 'classnames';
import CryptoJS from 'crypto-js';
import validator from 'validator';
import { isEmpty } from 'lodash';
import axios from 'axios'






export default class Signupform extends Component {
    constructor() {
        super();
        this.state = {
            firstname: "",
            lastname: "",
            phonenum: "",
            address: "",
            city: "",
            province: "",
            postalCode: "",
            country: "",
            username: "",
            email: "",
            password: "",
            passwordConfirmation: "",
            usertype: "",
            errors: {},
            registrationStatus: ""

        }
    }
    onBlurCheckUserName = () => {

        api.repeatUserName({
            username: this.state.username
        }).then(res => {

            console.log(res.data)
            if (res.data.flag) {
                this.setState({
                    errors: {}
                })

            } else {
                this.setState({
                    errors: {
                        username: res.data.msg
                    }
                })
            }
        }).catch(error => {

        })


    }


    onSubmit = (e) => {
        e.preventDefault();
        console.log(this.state);
        const validation = validatorInput(this.state);
        if (!validation.isValid) {
            // Set errors and return
            this.setState({
                errors: validation.errors,
                registrationStatus: 'failure'
            });
            return;
        }
        // const fullregisterinfo = this.state
        // const registerinfo = {
        //     "customerId": "",
        //     "firstName": fullregisterinfo.firstname,
        //     "lastName": fullregisterinfo.lastname,
        //     "email": fullregisterinfo.email,
        //     "phoneNum": fullregisterinfo.phonenum,
        //     "address": fullregisterinfo.address,
        //     "city": fullregisterinfo.city,
        //     "province": fullregisterinfo.province,
        //     "postalCode": fullregisterinfo.postalCode,
        //     "country": fullregisterinfo.country,
        //     "userId": fullregisterinfo.username,
        //     "password": fullregisterinfo.password,
        //     "usertype"
        // };
        // console.log(registerinfo)
        // const backendinfo = JSON.stringify(registerinfo)


        api.register({
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            phonenum: this.state.phonenum,
            address: this.state.address,
            city: this.state.city,
            province: this.state.province,
            postalCode: this.state.postalCode,
            country: this.state.country,
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
            passwordConfirmation: this.state.passwordConfirmation,
            usertype: this.state.usertype,

        })

            .then(res => {
                console.log(res.data)
                this.setState({
                    errors: res.data
                })

                if (res.data.msg === "success") {


                    // Registration successful
                    this.setState({
                        errors: {},
                        registrationStatus: 'success',
                    });
                } else {
                    // Registration failed with an error message
                    this.setState({
                        errors: res.data,
                        registrationStatus: 'failure',
                    });
                }


                // this.setState({
                //     errors: res.data,
                //     registrationStatus: 'success',

                // })


                // if (res.data.registerinfo==) {


                //     // Registration successful
                //     this.setState({
                //         errors: {},
                //         registrationStatus: 'success',
                //     });
                // } else {
                //     // Registration failed with an error message
                //     this.setState({
                //         errors: res.data,
                //         registrationStatus: 'failure',
                //     });
                // }


            }).catch(error => {

                console.log("Error object:", error);

                if (error.response) {
                    // 请求已经发出，但服务器返回状态码不在2xx范围内
                    console.error("Response data:", error.response.data);
                    console.error("Response status:", error.response.status);
                    console.error("Response headers:", error.response.headers);
                    this.setState({
                        errors: error.response.data,
                        registrationStatus: 'failure', // Set registration status to failure
                    });
                } else if (error.request) {
                    // 请求已经发出，但没有收到响应
                    console.error("No response received:", error.request);

                } else {
                    // 在设置请求时触发错误
                    console.error("Error setting up the request:", error.message);
                }
            });







        // axios.post('http://localhost/petp/api/register', backendinfo)

        //     .then(res => {


        //         // this.setState({
        //         //     errors: res.data,
        //         //     registrationStatus: 'success',

        //         // })


        //         if (res.data.success === "true") {


        //             // Registration successful
        //             this.setState({
        //                 errors: {},
        //                 registrationStatus: 'success',
        //             });
        //         } else {
        //             // Registration failed with an error message
        //             this.setState({
        //                 errors: res.data,
        //                 registrationStatus: 'failure',
        //             });
        //         }


        //     }).catch(error => {

        //         console.log("Error object:", error);

        //         if (error.response) {
        //             // 请求已经发出，但服务器返回状态码不在2xx范围内
        //             console.error("Response data:", error.response.data);
        //             console.error("Response status:", error.response.status);
        //             console.error("Response headers:", error.response.headers);
        //             this.setState({
        //                 errors: error.response.data,
        //                 registrationStatus: 'failure', // Set registration status to failure
        //             });
        //         } else if (error.request) {
        //             // 请求已经发出，但没有收到响应
        //             console.error("No response received:", error.request);

        //         } else {
        //             // 在设置请求时触发错误
        //             console.error("Error setting up the request:", error.message);
        //         }
        //     });



    }

    changeHandle = (e) => {
        console.log(e.target.value)

        this.setState({
            [e.target.name]: e.target.value
        });
    }
    render() {
        const { firstname, lastname, phonenum, address, city, province, postalCode, country, username, email, password, passwordConfirmation, usertype, errors } = this.state;
        const registrationStatus = this.state.registrationStatus;

        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <h1>Be a member of our website</h1>
                    {registrationStatus === 'success' && (
                        <div className="alert alert-success" role="alert">
                            Registration successful!
                        </div>
                    )}
                    {registrationStatus === 'failure' && (
                        <div className="alert alert-danger" role="alert">
                            Registration failed. Please check your input.
                        </div>
                    )}
                    <div className="form-group">
                        <label className="control-label">Firstname</label>
                        <input

                            className={classNames("form-control", { "is-invalid": errors.firstname })}
                            type="text"
                            name="firstname"
                            value={firstname}
                            onChange={this.changeHandle}
                        />


                    </div>


                    <div className="form-group">
                        <label className="control-label">Lastname</label>
                        <input

                            className={classNames("form-control", { "is-invalid": errors.lastname })}
                            type="text"
                            name="lastname"
                            value={lastname}
                            onChange={this.changeHandle}
                        />


                    </div>

                    <div className="form-group">
                        <label className="control-label">Phone number</label>
                        <input

                            className={classNames("form-control", { "is-invalid": errors.phonenum })}
                            type="text"
                            name="phonenum"
                            value={phonenum}
                            onChange={this.changeHandle}
                        />


                    </div>

                    <div className="form-group">
                        <label className="control-label">Address</label>
                        <input

                            className={classNames("form-control", { "is-invalid": errors.address })}
                            type="text"
                            name="address"
                            value={address}
                            onChange={this.changeHandle}
                        />


                    </div>
                    <div className="form-group">
                        <label className="control-label">City</label>
                        <input

                            className={classNames("form-control", { "is-invalid": errors.address })}
                            type="text"
                            name="city"
                            value={city}
                            onChange={this.changeHandle}
                        />


                    </div>

                    <div className="form-group">
                        <label className="control-label">Province</label>
                        <input

                            className={classNames("form-control", { "is-invalid": errors.province })}
                            type="text"
                            name="province"
                            value={province}
                            onChange={this.changeHandle}
                        />


                    </div>
                    <div className="form-group">
                        <label className="control-label">Post code</label>
                        <input

                            className={classNames("form-control", { "is-invalid": errors.postalCode })}
                            type="text"
                            name="postalCode"
                            value={postalCode}
                            onChange={this.changeHandle}
                        />


                    </div>

                    <div className="form-group">
                        <label className="control-label">Country</label>
                        <input

                            className={classNames("form-control", { "is-invalid": errors.country })}
                            type="text"
                            name="country"
                            value={country}
                            onChange={this.changeHandle}
                        />


                    </div>

                    <div className="form-group">
                        <label className="control-label">Username</label>
                        <input

                            className={classNames("form-control", { "is-invalid": errors.username })}
                            type="text"
                            name="username"
                            value={username}
                            onChange={this.changeHandle}
                            onBlur={this.onBlurCheckUserName}
                        />
                        {errors.username ? <span style={{ color: 'red' }}>{errors.username}</span> : ""}

                    </div>

                    <div className="form-group">
                        <label className="control-label">Email</label>
                        <input
                            className={classNames("form-control", { "is-invalid": errors.email })}
                            type="text"
                            name="email"
                            value={email}
                            onChange={this.changeHandle}
                        />
                        {errors.email ? <span style={{ color: 'red' }}>{errors.email}</span> : ""}

                    </div>
                    <div className="form-group">
                        <label className="control-label">Password</label>
                        <input
                            className={classNames("form-control", { "is-invalid": errors.password })}
                            type="password"
                            name="password"
                            value={password}
                            onChange={this.changeHandle}
                        />
                        {errors.password ? <span style={{ color: 'red' }}>{errors.password}</span> : ""}
                    </div>
                    <div className="form-group">
                        <label className="control-label">PasswordConfirmation</label>
                        <input
                            className={classNames("form-control", { "is-invalid": errors.passwordConfirmation })}
                            type="password"
                            name="passwordConfirmation"
                            value={passwordConfirmation}
                            onChange={this.changeHandle}
                        />
                        {errors.passwordConfirmation ? <span style={{ color: 'red' }}>{errors.passwordConfirmation}</span> : ""}
                    </div>
                    <div className="form-group">
                        <select name="usertype" value={usertype} onChange={this.changeHandle}>
                            <option value="1">Eventholder</option>
                            <option value="2">Customer</option>
                        </select>
                        {errors.usertype ? <span style={{ color: 'red' }}>{errors.usertype}</span> : ""}
                    </div>


                    <div className="form-group">
                        <button className="btn btn-primary btn-lg">submit</button>
                    </div>

                </form >
            </div >
        )
    }
}



const validatorInput = (data) => {
    let errors = {};
    if (validator.isEmpty(data.username)) {
        errors.username = "Username can not be empty";
    }
    if (!validator.isEmail(data.email)) {
        errors.email = "This is not a valid ema il";
    }

    if (validator.isEmpty(data.password)) {
        errors.password = "Password can not be empty";
    }

    if (!validator.equals(data.password, data.passwordConfirmation)) {
        errors.passwordConfirmation = "Password does not match";
    }

    return {
        isValid: isEmpty(errors),
        errors
    };
};