import React, { Component } from 'react'

export default class Signinform extends Component {
    constructor() {
        super();
        this.state = {
            username: "",
            password: ""

        }
    }

    onSubmit = (e) => {
        e.preventDefault();
        console.log(this.state)

    }
    changeHandle = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }


    render() {

        const { username, password } = this.state;
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <h1>Log in our website</h1>
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
                        <button className="btn btn-primary btn-lg">Log in</button>
                    </div>

                </form >
            </div >
        )
    }
}
