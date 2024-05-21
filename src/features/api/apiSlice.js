import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { LiaEtsy } from 'react-icons/lia';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://sellstream.onrender.com',
     prepareHeaders: (headers, {getState}) => {
      let token = getState()?.auth?.token;
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
