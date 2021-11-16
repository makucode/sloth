import { createSlice } from "@reduxjs/toolkit";
import { callRequest } from "./apiActions";

const initialLists = JSON.parse(localStorage.getItem("lists")) || [];

const slice = createSlice({
    name: "lists",
    initialState: { lists: initialLists, loading: false, error: null },
    reducers: {
        listRequested: (lists, action) => {
            lists.loading = true;
        },
        listError: (lists, action) => {
            lists.loading = false;
            lists.error = action.payload;
        },
        listsFetched: (lists, action) => {
            lists.loading = false;
            lists.lists = action.payload;
            localStorage.setItem("lists", JSON.stringify(action.payload));
        },
        listCreated: (lists, action) => {
            lists.loading = false;
        },
        listDeleted: (lists, action) => {
            lists.loading = false;
        },
        listsCleared: (lists, action) => {
            lists.lists = [];
            localStorage.removeItem("lists");
        },
    },
});

const {
    listsFetched,
    listRequested,
    listError,
    listCreated,
    listDeleted,
    listsCleared,
} = slice.actions;

export default slice.reducer;

// Action creators

const url = "lists";

export const fetchLists = () => (dispatch, getState) => {
    dispatch(
        callRequest({
            url,
            method: "get",
            headers: {
                "x-auth-token": getState().auth.token,
            },
            onRequest: listRequested.type,
            onError: listError.type,
            onSuccess: listsFetched.type,
        })
    );
};

export const createList = (name) => (dispatch, getState) => {
    dispatch(
        callRequest({
            url,
            data: { name },
            method: "post",
            headers: {
                "x-auth-token": getState().auth.token,
            },
            onRequest: listRequested.type,
            onError: listError.type,
            onSuccess: listCreated.type,
        })
    );
};

export const deleteList = (list_id) => (dispatch, getState) => {
    dispatch(
        callRequest({
            url: url + "/" + list_id,
            method: "delete",
            headers: {
                "x-auth-token": getState().auth.token,
            },
            onRequest: listRequested.type,
            onError: listError.type,
            onSuccess: listDeleted.type,
        })
    );
};

export const clearLists = () => (dispatch, getState) => {
    dispatch({ type: listsCleared.type });
};
