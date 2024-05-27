import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../features/api/apiSlice";
import authSliceReducer from "../features/auth/authSlice";
import productReducer from "../features/products/productSlice";

const store = configureStore({
    reducer: {
        
        [apiSlice.reducerPath] : apiSlice.reducer,
        auth: authSliceReducer,
        products: productReducer,
    },
    middleware: (getDefaultMIddlewares) => getDefaultMIddlewares().concat(apiSlice.middleware), 
})

export default store;

