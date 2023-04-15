import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./clientData";

export const store = configureStore({
    reducer:  rootReducer
})