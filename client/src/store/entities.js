import { combineReducers } from "redux";
import lists from "./lists";
import items from "./items";

const reducer = combineReducers({ lists, items });

export default reducer;
