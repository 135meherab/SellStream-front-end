import { apiSlice } from "../api/apiSlice";

export const forgetapi = apiSlice.injectEndpoints({
    tagType: ['password'],
    endpoints: (builder) => ({
        addemail: builder.mutation({
            query: (data) =>({
                url: "/shop/password/reset/request/",
                method: "POST",
                body: data,
            }),
            invalidatesTags:['Password']
        }),
        addotp: builder.mutation({
            query: (data) =>({
                url: "shop/verify-otp/",
                method: "POST",
                body: data,
            }),
            invalidatesTags:['Password']
        }),
        addpassword: builder.mutation({
            query: (data) =>({
                url: "shop/password-change/",
                method: "POST",
                body: data,
            }),
            invalidatesTags:['Password']
        }),


    }),
});

// Export hooks for usage in functional components
export const { useAddemailMutation, useAddotpMutation, useAddpasswordMutation } = forgetapi;