import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import AuthService from "../services/auth.service";
import DbsLogo from "../assets/DBS-Bank-logo.png";
import { useAuth } from "../contexts/authContext";
import { Button, Space, Input, Form } from 'antd';
import CryptoJS from 'crypto-js';

const Login = () => {
    let navigate = useNavigate();
    const auth = useAuth();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const secretPass = "XkhZG4fW2t2W";

    const onChangeUsername = (e) => {
        const username = e.target.value;
        setUsername(username);
    };

    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    };

    const handleLogin = (values) => {

        // e.preventDefault();
        setUsername(values.username)

        const encryptedPassword = CryptoJS.AES.encrypt(
            JSON.stringify(values.password),
            secretPass
        ).toString();

        setPassword(encryptedPassword)
        console.log('encrypted password: ', encryptedPassword);

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
                                        ]}
                                    >
                                        <Input
                                            placeholder="Employee ID"
                                            type="text"
                                            value={username}
                                            onChange={onChangeUsername}
                                        />
                                    </Form.Item>
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
