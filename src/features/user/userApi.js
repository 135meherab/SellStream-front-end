import { apiSlice } from "../api/apiSlice";

export const userApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllUser: builder.query({
            query: ()=>('/shop/user_details/'),

        }),
        getUser: builder.query({
            query: (id)=>(`/shop/user/${id}/`),

        }),
        addUser: builder.mutation({
            query: (data)=>({
                url: '/shop/sign_up/',
                method:"POST",
                body: data,
            }),

            

        }),

        updateUser : builder.mutation({
            query : ({id,data}) =>({
                url : `/shop/user_details/${id}/`,
                method: "PATCH",
                body: data
            })
        })
       
        
    })
})

export const {useGetAllUserQuery, useUpdateUserMutation, useAddUserMutation} = userApi;
