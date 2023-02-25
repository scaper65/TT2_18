import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import AuthService from "../services/auth.service";
import DbsLogo from "../assets/DBS-Bank-logo.png";
import { useAuth } from "../contexts/authContext";
import { Button, Space, Input, Form } from 'antd';

const Login = () => {
    let navigate = useNavigate();
    const auth = useAuth();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [errorUsername, setErrorUsername] = useState("")
    const [errorPassword, setErrorPassword] = useState("")

    const onChangeUsername = (e) => {
        const username = e.target.value;
        setUsername(username);
    };

    const onChangePassword = (e) => {
        const password = e.target.value;
        console.log('password: ', password);

        setPassword(password);
    };

    const handleLogin = (values) => {

        // e.preventDefault();
        console.log(values);
        setUsername(values.username)
        setPassword(values.password)

        /*
        if (!isNaN(username)) {
            alert('Username should be all digits.')
        }

        if (username.length != 8 && password.length != 8) {
            alert(`Username should be 8 characters. Password should be at least 8 characters.`)
        } else if (username.length != 8) {
            alert('Username should be 8 characters and should be all digits.')
        } else if (password.length != 8) {
            alert('Password should be 8 characters.')
        }
        */

        setMessage("");
        setLoading(true);

        auth.login(username, password).then(
            () => {
                navigate("/homepage");
                // window.location.reload();
            },
            (error) => {
                console.log("ERROR: Auth.login");
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                setLoading(false);
                setMessage(resMessage);
            }
        );
    };

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-lg-6"></div>
                    <div className="col-lg-6">
                        <div className="card card-container">
                            <img
                                src={DbsLogo}
                                alt="profile-img"
                                className="profile-img-card"
                            />

                            <Form onFinish={handleLogin}>
                                {/* <div className="mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="username"
                                        placeholder="Username"
                                        value={username}
                                        onChange={onChangeUsername}
                                    />
                                </div> */}

                                <div>
                                    <Form.Item
                                        name="username"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input your employee ID.',

                                            },
                                            {
                                                min: 8,
                                                max: 8,
                                                message: 'Employee ID should be exactly 8 digits.'
                                            },
                                            {
                                                pattern: new RegExp(/^[0-9]+$/),
                                                message: 'Employee ID should only contain digits.'
                                            }
                                        ]}
                                    >
                                        <Input
                                            placeholder="Employee ID"
                                            type="text"
                                            value={username}
                                            onChange={onChangeUsername}
                                        />
                                    </Form.Item>
                                    <p>{errorUsername}</p>
                                </div>


                                {/* <div className="mb-3">
                                    <Input
                                        type="password"
                                        className="form-control"
                                        name="password"
                                        placeholder="Password"
                                        value={password}
                                        onChange={onChangePassword}
                                    ></Input>
                                </div> */}

                                <div>
                                    <Form.Item
                                        name="password"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input your password.',
                                            },
                                            {
                                                min: 8,
                                                message: 'Password should be at least 8 characters.'

                                            }
                                        ]}
                                    >
                                        <Input
                                            placeholder="Password"
                                            type="password"
                                            value={password}
                                            onChange={onChangePassword}
                                        />
                                    </Form.Item>
                                </div>

                                <div>
                                    <Button
                                        htmlType="submit"
                                        type="primary"
                                        style={{ 'backgroundColor': 'red' }}
                                        disabled={loading}
                                    >
                                        {loading && (
                                            <span className="spinner-border spinner-border-sm"></span>
                                        )}
                                        <span>Login</span>
                                    </Button>
                                </div>

                                {message && (
                                    <div className="form-group">
                                        <div
                                            className="alert alert-danger"
                                            role="alert"
                                        >
                                            {message}
                                        </div>
                                    </div>
                                )}
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
