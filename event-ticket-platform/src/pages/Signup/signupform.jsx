import React, { Component } from 'react'
import api from '../../api';

export default class Signupform extends Component {
    constructor() {
        super();
        this.state = {
            username: "",
            email: "",
            password: "",
            passwordConfirmation: ""

        }
    }



    onSubmit = (e) => {
        e.preventDefault();
        console.log(this.state);
        api.register({
            username: this.state.username,
            password: this.state.password,
            email: this.state.email,
            passwordConfirmation: this.state.passwordConfirmation,
        }).then(res => {
            console.log(res.data);
        }).catch(error => {
            console.log("Registration failed:", error);

            if (error.response) {
                // 请求已经发出，但服务器返回状态码不在2xx范围内
                console.error("Response data:", error.response.data);
                console.error("Response status:", error.response.status);
                console.error("Response headers:", error.response.headers);
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
        const { username, email, password, passwordConfirmation } = this.state;
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <h1>Be a member of our website</h1>
                    <div className="form-group">
                        <label className="control-label">Username</label>
                        <input
                            className="form-control"
                            type="text"
                            name="username"
                            value={username}
                            onChange={this.changeHandle}
                        />

                    </div>
                    <div className="form-group">
                        <label className="control-label">Email</label>
                        <input
                            className="form-control"
                            type="text"
                            name="email"
                            value={email}
                            onChange={this.changeHandle}
                        />

                    </div>
                    <div className="form-group">
                        <label className="control-label">Password</label>
                        <input
                            className="form-control"
                            type="password"
                            name="password"
                            value={password}
                            onChange={this.changeHandle}
                        />

                    </div>
                    <div className="form-group">
                        <label className="control-label">PasswordConfirmation</label>
                        <input
                            className="form-control"
                            type="password"
                            name="passwordConfirmation"
                            value={passwordConfirmation}
                            onChange={this.changeHandle}
                        />
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary btn-lg">submit</button>
                    </div>

                </form >
            </div >
        )
    }
}
