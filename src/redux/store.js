import { configureStore } from "@reduxjs/toolkit";
import preloaderReducer from "./preloaderSlice";
import popUpReducer from "./popUp.slice";

const store = configureStore({
    reducer: {
        preloader: preloaderReducer,
        popup: popUpReducer
    }
})

export default store