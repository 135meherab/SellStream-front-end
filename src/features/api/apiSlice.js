import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    // For production
    baseUrl: 'https://sellstream.onrender.com',
    // For local server
    // baseUrl: 'http://127.0.0.1:8000',      
     prepareHeaders: (headers, {getState}) => {

      let token = getState()?.auth.token;
      // console.log(token)


      if (!token) {
        let authData;
        try {
          authData = JSON.parse(localStorage.getItem('auth'));
        } catch (e) {
          console.error('Error parsing auth data from localStorage:', e);
        }
    
        // Ensure authData is valid before assigning to token
        if (authData) {
          token = authData;
        }
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
