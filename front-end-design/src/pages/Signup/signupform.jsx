import React, { Component } from 'react'
import api from '../../api';
import classNames from 'classnames';



export default class Signupform extends Component {
    constructor() {
        super();
        this.state = {
            username: "",
            email: "",
            password: "",
            passwordConfirmation: "",
            errors: {},
            registrationStatus: ""

        }
    }



    onSubmit = (e) => {
        e.preventDefault();
        // console.log(this.state);
        api.register({
            username: this.state.username,
            password: this.state.password,
            email: this.state.email,
            passwordConfirmation: this.state.passwordConfirmation,
        }).then(res => {
            console.log(res.data)


            // this.setState({
            //     errors: res.data,
            //     registrationStatus: 'success',

            // })

            if (res.data.msg === 'success') {
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



    }

    changeHandle = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    render() {
        const { username, email, password, passwordConfirmation, errors } = this.state;
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
                        <label className="control-label">Username</label>
                        <input

                            className={classNames("form-control", { "is-invalid": errors.username })}
                            type="text"
                            name="username"
                            value={username}
                            onChange={this.changeHandle}
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
                        <button className="btn btn-primary btn-lg">submit</button>
                    </div>

                </form >
            </div >
        )
    }
}
