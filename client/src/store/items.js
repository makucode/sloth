import { createSlice } from "@reduxjs/toolkit";
import { callRequest } from "./apiActions";

const slice = createSlice({
    name: "items",
    initialState: { items: [], loading: false, error: "null" },
    reducers: {
        itemRequested: (items, action) => {
            items.loading = true;
            items.error = null;
        },
        itemError: (items, action) => {
            items.loading = false;
            items.error = action.payload;
        },
        itemsFetched: (items, action) => {
            items.loading = false;
            items.items = action.payload;
            localStorage.setItem("items", JSON.stringify(action.payload));
        },
        itemCreated: (items, action) => {
            items.loading = false;
        },
        itemUpdated: (items, action) => {
            items.loading = false;
        },
        itemDeleted: (items, action) => {
            items.loading = false;
        },
        itemsCleared: (items, action) => {
            items.items = [];
            localStorage.removeItem("items");
        },
    },
});

const {
    itemRequested,
    itemError,
    itemsFetched,
    itemCreated,
    itemDeleted,
    itemUpdated,
    itemsCleared,
} = slice.actions;

export default slice.reducer;

// Action creators

const url = "items";

export const fetchItems = () => (dispatch, getState) => {
    dispatch(
        callRequest({
            url,
            method: "get",
            headers: {
                "x-auth-token": getState().auth.token,
            },
            onRequest: itemRequested.type,
            onError: itemError.type,
            onSuccess: itemsFetched.type,
        })
    );
};

export const createItem = (todo) => (dispatch, getState) => {
    dispatch(
        callRequest({
            url,
            data: todo,
            method: "post",
            headers: {
                "x-auth-token": getState().auth.token,
            },
            onRequest: itemRequested.type,
            onError: itemError.type,
            onSuccess: itemCreated.type,
        })
    );
};

export const deleteItem = (item_id) => (dispatch, getState) => {
    dispatch(
        callRequest({
            url: url + "/" + item_id,
            method: "delete",
            headers: {
                "x-auth-token": getState().auth.token,
            },
            onRequest: itemRequested.type,
            onError: itemError.type,
            onSuccess: itemDeleted.type,
        })
    );
};

export const updateItem =
    (item_id, todo, isComplete) => (dispatch, getState) => {
        dispatch(
            callRequest({
                url: url + "/" + item_id,
                data: { isComplete, todo },
                method: "put",
                headers: {
                    "x-auth-token": getState().auth.token,
                },
                onRequest: itemRequested.type,
                onError: itemError.type,
                onSuccess: itemUpdated.type,
            })
        );
    };

export const clearItems = () => (dispatch, getState) => {
    dispatch({ type: itemsCleared.type });
};

// Selectors

export const getListItems = (state, items) => {
    return state.entities.items.items.filter((item) =>
        items.includes(item._id)
    );
};
