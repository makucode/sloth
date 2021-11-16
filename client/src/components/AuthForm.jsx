import React from "react";
import styles from "../styles/AuthForm.module.scss";

const AuthForm = ({ children }) => {
    return <div className={styles.AuthForm}>{children}</div>;
};

export default AuthForm;
