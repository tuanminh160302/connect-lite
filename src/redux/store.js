import { configureStore } from "@reduxjs/toolkit";
import preloaderReducer from "./preloaderSlice";

const store = configureStore({
    reducer: {
        preloader: preloaderReducer,
    }
})

export default store