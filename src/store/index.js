// import { legacy_createStore } from "redux";
import Redux from "@/libs/redux";
import reducer from "./reducers/taskReducer";

const store = Redux.createStore(reducer);

export default store;
