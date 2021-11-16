import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styles from "../styles/Header.module.scss";
import ArrowIcon from "./icons/ArrowIcon";
import PencilIcon from "./icons/PencilIcon";
import XIcon from "./icons/XIcon";
import { logOutUser } from "../store/auth";
import UserIcon from "./icons/UserIcon";

const Header = () => {
    const { username } = useSelector((state) => state.auth);
    const isLoggedIn = username ? true : false;

    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logOutUser());
    };

    return (
        <nav className={styles.Header}>
            <div className={styles.HeaderContent}>
                <div className={styles.HeaderLeft}>
                    <Link to="/">
                        <span className={styles.HeaderLogo}>Sloth.</span>
                        <span className={styles.HeaderLogoSub}>
                            A Todo-List-App
                        </span>
                    </Link>
                </div>
                <div className={styles.HeaderRight}>
                    {!isLoggedIn && (
                        <div className={styles.HeaderLogIn}>
                            <Link to="/">
                                <ArrowIcon />
                                Log In
                            </Link>
                            <Link to="/register">
                                <PencilIcon />
                                Sign Up
                            </Link>
                        </div>
                    )}
                    {isLoggedIn && (
                        <div className={styles.HeaderLogIn}>
                            <span className={styles.HeaderProfile}>
                                <UserIcon />
                                {username}
                            </span>
                            <span
                                className={styles.HeaderLogout}
                                onClick={handleLogout}
                            >
                                <XIcon />
                                Logout
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Header;
