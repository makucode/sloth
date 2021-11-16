import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styles from "../styles/Register.module.scss";
import AuthForm from "../components/AuthForm";
import Loader from "../components/Loader";
import { useDispatch } from "react-redux";
import { registerUser } from "../store/auth";

const Register = ({ props }) => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmedPassword, setConfirmedPassword] = useState("");
    const [errMsg, setErrMsg] = useState();

    const dispatch = useDispatch();

    const auth = useSelector((state) => state.auth);

    useEffect(() => {
        if (auth.token) props.history.push("/home");
    }, [auth]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) dispatch(registerUser({ username, email, password }));
    };

    const validate = () => {
        if (username.length < 2) {
            setErrMsg("Username has to be at least 3 characters long.");
            return false;
        } else if (password.length < 8) {
            setErrMsg("Password has to be at least 8 character long.");
            return false;
        } else if (password !== confirmedPassword) {
            setErrMsg("Passwords don't match.");
            return false;
        } else {
            setErrMsg();
            return true;
        }
    };

    return (
        <>
            {auth.loading && <Loader />}
            {!auth.loading && (
                <main className={"main " + styles.Register}>
                    <AuthForm>
                        <h1>Register</h1>
                        <form onSubmit={handleSubmit}>
                            <div className={styles.AuthFormItems}>
                                <div className={styles.AuthFormItem}>
                                    <label htmlFor="username">Username</label>
                                    <input
                                        type="text"
                                        name="username"
                                        required
                                        placeholder="Enter a username"
                                        value={username}
                                        onChange={(e) =>
                                            setUsername(e.target.value)
                                        }
                                    />
                                </div>
                                <div className={styles.AuthFormItem}>
                                    <label htmlFor="email">Email address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        placeholder="Enter your email address"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                    />
                                </div>
                                <div className={styles.AuthFormItem}>
                                    <label htmlFor="password">Password</label>
                                    <input
                                        type="password"
                                        name="password"
                                        required
                                        placeholder="Enter a password"
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                    />
                                </div>
                                <div className={styles.AuthFormItem}>
                                    <label htmlFor="confirm-password">
                                        Confirm password
                                    </label>
                                    <input
                                        type="password"
                                        name="confirm-password"
                                        required
                                        placeholder="Confirm your password"
                                        value={confirmedPassword}
                                        onChange={(e) =>
                                            setConfirmedPassword(e.target.value)
                                        }
                                    />
                                </div>
                            </div>
                            <div className={styles.AuthInfoContainer}>
                                {errMsg && (
                                    <span
                                        className={`${styles.AuthInfo} ${styles.AuthErr}`}
                                    >
                                        {errMsg}
                                    </span>
                                )}
                                <span className={styles.AuthInfo}>
                                    Already registered?{" "}
                                    <Link to="/">Log In here.</Link>
                                </span>
                            </div>
                            <button type="submit">
                                <span>Sign Up</span>
                            </button>
                        </form>
                    </AuthForm>
                </main>
            )}
        </>
    );
};

export default Register;
