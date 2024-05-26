import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://sellstream.onrender.com',
     prepareHeaders: (headers, {getState}) => {
      let token = getState()?.auth.token;
      // console.log(token)

      if (!token) {
        const authData = JSON.parse(localStorage.getItem('auth'));
        token = authData?.token;
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
  tagTypes: ["Products", "Categories", "Order", "Customer", "Branch", "Shop", "Customers", "Employee", "Designation", "Attendance", "Leave", "Occasion"],
  endpoints: () => ({}),
  
});
