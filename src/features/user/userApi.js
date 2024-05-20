import { apiSlice } from "../api/apiSlice";
import { userLoggedIn } from "../auth/authSlice";

export const userApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllUser: builder.query({
            query: ()=>('/shop/user/'),

        }),
        getUser: builder.query({
            query: (id)=>(`/shop/user/${id}`),

        }),
        addUser: builder.mutation({
            query: (data)=>({
                url: '/shop/sign_up/',
                method:"POST",
                body: data,
            }),

            async onQueryStarted(arg, {queryFulfilled, dispatch}){
                try{
                    const result = await queryFulfilled;

                    localStorage.setItem("auth", JSON.stringify({
                        token: result.data.token,
                        
                    }))

                    dispatch(userLoggedIn({
                        token: result.data.token,
                        
                    }))
                }catch(err) {
                    // error part
                    }
            }

        }),

        updateUser : builder.mutation({
            query : (id,data) =>({
                url : `/shop/user_details/${id}`,
                method: "POST",
                body: data
            })
        })
       
        
    })
})

export const {useGetAllUserQuery, useUpdateUserMutation, useAddUserMutation} = userApi;
