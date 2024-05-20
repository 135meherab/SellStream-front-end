import { apiSlice } from "../api/apiSlice";

export const authApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllUser: builder.query({
            query: ()=>('/shop/user/'),

        }),
        getUser: builder.query({
            query: (id)=>(`/shop/user/${id}`),

        }),
        //add user == sign_up shop/sign_up

        updateUser : builder.mutation({
            query : (id,data) =>({
                url : `/shop/user_details/${id}`,
                method: "POST",
                body: data
            })
        })
       
        
    })
})

export const {useLoginMutation, useRegisterMutation} = authApi;
