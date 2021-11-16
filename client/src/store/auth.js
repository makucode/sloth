import { createSlice } from "@reduxjs/toolkit";
import { callRequest } from "./apiActions";
import { clearLists } from "./lists";

const slice = createSlice({
    name: "auth",
    initialState: JSON.parse(localStorage.getItem("user")) || {
        _id: null,
        username: null,
        token: null,
        loading: false,
    },
    reducers: {
        userRequested: (auth, action) => {
            auth.loading = true;
            auth.error = null;
        },
        userRequestFailed: (auth, action) => {
            auth.loading = false;
            if (action.payload.includes("404")) {
                auth.error = "You have entered an invalid username or password";
            } else {
                auth.error = action.payload;
            }
        },
        userRegistered: (auth, action) => {
            auth.username = action.payload.username;
            auth._id = action.payload._id;
            auth.token = action.payload.token;
            auth.loading = false;
            localStorage.setItem(
                "user",
                JSON.stringify({
                    username: action.payload.username,
                    _id: action.payload._id,
                    token: action.payload.token,
                    loading: false,
                })
            );
        },
        userLoggedIn: (auth, action) => {
            auth.username = action.payload.username;
            auth._id = action.payload._id;
            auth.token = action.payload.token;
            auth.loading = false;
            localStorage.setItem("user", JSON.stringify(action.payload));
        },
        userLoggedOut: (auth, action) => {
            auth._id = null;
            auth.token = null;
            auth.username = null;
            auth.loading = false;
            localStorage.removeItem("user");
        },
    },
});

const {
    userRegistered,
    userLoggedIn,
    userLoggedOut,
    userRequested,
    userRequestFailed,
} = slice.actions;

export default slice.reducer;

// Action creators

const loginUrl = "auth";
const userUrl = "users";

export const registerUser = (user) => (dispatch) => {
    dispatch(
        callRequest({
            url: userUrl,
            data: user,
            method: "post",
            onSuccess: userRegistered.type,
            onRequest: userRequested.type,
            onError: userRequestFailed.type,
        })
    );
};

export const logInUser = (user) => (dispatch, getState) => {
    dispatch(
        callRequest({
            url: loginUrl,
            data: user,
            method: "post",
            onSuccess: userLoggedIn.type,
            onRequest: userRequested.type,
            onError: userRequestFailed.type,
        })
    );
};

export const logOutUser = () => (dispatch, getState) => {
    dispatch({ type: userLoggedOut.type });
    dispatch(clearLists());
};
