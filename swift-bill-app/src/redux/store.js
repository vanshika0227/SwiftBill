import { configureStore } from "@reduxjs/toolkit";
import clientReducer from "./clientData";

export const store = configureStore({
    reducer: {
        allClients: clientReducer
    }
})