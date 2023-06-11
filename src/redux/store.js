import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice/userSlice";
import mainItemSlice from "./slice/mainItemSlice";
import mainCategoriesSlice from "./slice/mainCategoriesSlice";

const store = configureStore({
    reducer :{
        user : userReducer,
        items: mainItemSlice,
        categories: mainCategoriesSlice,
    }
})

export default store