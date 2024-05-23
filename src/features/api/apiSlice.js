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
      console.log(token)


      if (!token) {
        const authData = JSON.parse(localStorage.getItem('auth'));
        token = authData;
      }
      // console.log(token)
      if(token){
        headers.set('Authorization', `Bearer ${token}`),
        headers.set('Content-Type', 'application/json')
      }
      // headers.set('Access-Control-Allow-Origin', '*');
      // console.log('Headers set:', headers);
      return headers;
    },
    // fetchFn: (input, init) => {
    //   init.mode = 'no-cors'; // Setting mode to no-cors
    //   return fetch(input, init);
    // },
   
  }),
  keepUnusedDataFor: 30,
  endpoints: () => ({}),
  
});
