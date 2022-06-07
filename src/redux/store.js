import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import preloaderReducer from "./preloaderSlice";

const store = configureStore({
    middleware: [logger],
    reducer: {
        preloader: preloaderReducer,
    }
})

export default store