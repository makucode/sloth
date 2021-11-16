import React, { useEffect } from "react";
import styles from "../styles/Page404.module.scss";

const Page404 = () => {
    useEffect(() => {
        document.title = "Sloth -npm rund ev Page not found";
    }, []);

    return (
        <div className={"main " + styles.Page404}>
            <div className={styles.Page404Content}>
                <span>404</span>
                <div className={styles.Line}></div>
                <span>Page not found.</span>
            </div>
        </div>
    );
};

export default Page404;
