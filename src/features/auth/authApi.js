import { apiSlice } from "../api/apiSlice";
import { userLoggedIn } from "./authSlice";

export const authApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // register: builder.mutation({
        //     query: (data)=>({
        //         url: '/shop/sign_up/',
        //         method:"POST",
        //         body: data,
        //     }),

        //     async onQueryStarted(arg, {queryFulfilled, dispatch}){
        //         try{
        //             const result = await queryFulfilled;

        //             localStorage.setItem("auth", JSON.stringify({
        //                 token: result.data.token,
                        
        //             }))

        //             dispatch(userLoggedIn({
        //                 token: result.data.token,
                        
        //             }))
        //         }catch(err) {
        //             // error part
        //             }
        //     }

        // }),
        login: builder.mutation({
            query: (data)=>({
                url: '/shop/login/',
                method:"POST",
                body: data,
            }),

            async onQueryStarted(arg, {queryFulfilled}){
                try{
                    const result = await queryFulfilled;
                    // console.log(result.data.token)

                    localStorage.setItem("auth", JSON.stringify({
                        token: result.data.token,
                        
                        
                    }))

                    // dispatch(userLoggedIn({
                    //     token: result.data.token,
                        
                    // }))
                }catch(error) {
                    console.error('Error saving token to local storage', error);
                    }
          
                }

        }),

        logout: builder.mutation({
            query:()=>({
                url: '/shop/logout/',
                method: "POST"
            }),

            async onQueryStarted(arg, {queryFulfilled}){
                try{
                     await queryFulfilled;

                    localStorage.removeItem("auth")

                }catch(error) {
                    console.error('Error during logout:', error);
                    }
          
                }
        })
        
    })
})

export const {useLoginMutation, useRegisterMutation, useLogoutMutation} = authApi;
