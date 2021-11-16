import React from "react";
import styles from "../styles/Loader.module.scss";

const Loader = () => {
    return <div className={styles.Loader}><div className={styles.LoaderSpinner}></div></div>;
};

export default Loader;
