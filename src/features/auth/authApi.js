
import { apiSlice } from "../api/apiSlice";
// import { userLoggedIn } from "./authSlice";

export const authApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({

        // try login
        login: builder.mutation({
            query: (data)=>({
                url: '/shop/login/',
                method:"POST",
                body: data,
            }),

            async onQueryStarted(arg, {queryFulfilled}){
                try{
                    const result = await queryFulfilled;
                    console.log(result.data.token)

                    localStorage.setItem('auth', result.data.token) 

                    // dispatch(userLoggedIn({
                    //     token: result.data.token,
                        
                    // }))
                }catch(error) {
                    console.error('Error saving token to local storage', error);
                    }
                }

        }),

        // try logout
        logout: builder.mutation({
            query:()=>({
                url: '/shop/logout/',
                method: "GET",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('auth')}`,
                },
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
