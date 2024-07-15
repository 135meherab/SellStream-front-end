import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    // For production
    baseUrl: 'https://sellstreams1.onrender.com',
    // For local server
    // baseUrl: 'http://127.0.0.1:8000',      
     prepareHeaders: (headers, {getState}) => {

      let token = getState()?.auth.token;
      // console.log(token)


      if (!token) {
        // const authData = JSON.parse(localStorage.getItem('auth'));
        // token = authData
        token  = localStorage.getItem('auth');
      }
      // console.log(token)
      if(token){
        headers.set('Authorization', `Token ${token}`),
        headers.set('Content-Type', 'application/json')
      }

      return headers;
    },
   
   
  }),
  keepUnusedDataFor: 30,
  tagTypes: ["Products", "Categories", "Customers", "Order", "Customer",  "Shop","Branch",  "Employee", "Attendance", "Designation", "Leave", "Occasion"],
  endpoints: () => ({}),
  
});
