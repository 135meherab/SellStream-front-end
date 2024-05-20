import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://sellstream.onrender.com/',
     prepareHeaders: (headers, {getState}) => {
      const token = getState()?.auth?.token;
      if(token){
        headers.set('Authorization', `Bearer ${token}`)
      }
      // headers.set('Access-Control-Allow-Origin', '*');
      return headers;
    },
    // fetchFn: (input, init) => {
    //   init.mode = 'no-cors'; // Setting mode to no-cors
    //   return fetch(input, init);
    // },
   
  }),
  
  endpoints: () => ({}),
  
});
