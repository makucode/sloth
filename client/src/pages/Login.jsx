import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styles from "../styles/Login.module.scss";
import AuthForm from "../components/AuthForm";
import { logInUser } from "../store/auth";
import { useDispatch } from "react-redux";
import Loader from "../components/Loader";

const Login = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errMsg, setErrMsg] = useState();

    const dispatch = useDispatch();

    const auth = useSelector((state) => state.auth);

    useEffect(() => {
        if (auth.token) props.history.push("/home");
    }, [auth]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            dispatch(logInUser({ email, password }));
        }
    };

    const validate = () => {
        if (password.length < 8) {
            setErrMsg("Please enter a valid password.");
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
                <main className={"main " + styles.Login}>
                    <AuthForm>
                        <h1>Sloth.</h1>
                        <h2>A Todo-List-App</h2>
                        <form onSubmit={handleSubmit}>
                            {" "}
                            <div className={styles.AuthFormItems}>
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
                                    No account?{" "}
                                    <Link to="/register">Sign up here.</Link>
                                </span>
                            </div>
                            <button type="submit">
                                <span>Log In</span>
                            </button>
                        </form>
                    </AuthForm>
                </main>
            )}
        </>
    );
};

export default Login;
