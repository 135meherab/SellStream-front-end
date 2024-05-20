import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../features/api/apiSlice";
import authSliceReducer from "../features/auth/authSlice";

const store = configureStore({
    reducer: {
        
        [apiSlice.reducerPath] : apiSlice.reducer,
        auth: authSliceReducer,
    },
    middleware: (getDefaultMIddlewares) => getDefaultMIddlewares().concat(apiSlice.middleware), 
})

export default store;

