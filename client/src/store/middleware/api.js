import axios from "axios";
import { callFailed, callRequest, callSuccess } from "../apiActions";
import { fetchItems } from "../items";
import { fetchLists } from "../lists";

const api =
    ({ dispatch }) =>
    (next) =>
    async (action) => {
        if (action.type !== callRequest.type) return next(action);

        const { url, data, method, onSuccess, onError, onRequest, headers } =
            action.payload;

        if (onRequest) dispatch({ type: onRequest });

        next(action);

        try {
            const res = await axios.request({
                url: process.env.REACT_APP_API_URL + url,
                method,
                data,
                headers,
            });

            dispatch(callSuccess(res.data));
            if (onSuccess) dispatch({ type: onSuccess, payload: res.data });

            if (
                url.includes("lists") &&
                ["post", "put", "delete"].includes(method)
            ) {
                dispatch(fetchLists());
            } else if (
                url.includes("items") &&
                ["post", "put", "delete"].includes(method)
            ) {
                dispatch(fetchItems());
            }

            if (url.includes("items") && ["post"].includes(method)) {
                dispatch(fetchLists());
            }
        } catch (error) {
            dispatch(callFailed(error.message));
            if (onError) dispatch({ type: onError, payload: error.message });
        }
    };

export default api;
