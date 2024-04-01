import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Signinform(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const onSubmit = (e) => {
        e.preventDefault();
        console.log({ username, password });
        props.authActions.asyncsetUserObj({ username, password })
            .then(res => {
                console.log(res.data);
                console.log(res.data.status);
                if (res.data.status === 200) {

                    navigate('/', { state: { userData: res.data } });

                } else {
                    alert('Login failed! Please check your credentials.');

                    const changeHandle = (e) => {
                        const { name, value } = e.target;
                        if (name === 'username') {
                            setUsername(value);
                        } else if (name === 'password') {
                            setPassword(value);
                        }
                    };

                }
            });
    };

    const changeHandle = (e) => {
        const { name, value } = e.target;
        if (name === 'username') {
            setUsername(value);
        } else if (name === 'password') {
            setPassword(value);
        }
    };

    return (
        <div>
            <form onSubmit={onSubmit}>
                <h1>Log in our website</h1>
                <div className="form-group">
                    <label className="control-label">Username</label>
                    <input
                        className="form-control"
                        type="text"
                        name="username"
                        value={username}
                        onChange={changeHandle}
                    />
                </div>

                <div className="form-group">
                    <label className="control-label">Password</label>
                    <input
                        className="form-control"
                        type="password"
                        name="password"
                        value={password}
                        onChange={changeHandle}
                    />
                </div>

                <div className="form-group">
                    <button className="btn btn-primary btn-lg">Log in</button>
                </div>
            </form>
        </div>
    );
}

export default Signinform;
