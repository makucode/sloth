import React from "react";
import TodoLists from "../components/TodoLists";
import styles from "../styles/Home.module.scss";

const Home = () => {
    return (
        <div className={styles.Home}>
            <TodoLists />
        </div>
    );
};

export default Home;
