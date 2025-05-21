import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/index.js";
import productReducer from "./products/index.js";

const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
  },
});

export default store;
