
import { apiSlice } from '../api/apiSlice';

export const shopApi = apiSlice.injectEndpoints({
  tagTypes: ["shops", 'branch',],
  endpoints: (builder) => ({

    // shop endpoints
    getShops: builder.query({
      query: () => '/shop/get/',
      keepUnusedDataFor: 5,
      providesTags:["Shops"]
    }),
    addShop: builder.mutation({
      query: (data) => ({
        url: "/shop/createshop/",
        method: "POST",
        body: data,
      }),
      invalidatesTags:["Shops"]
    }),
    updateShop: builder.mutation({
      query: ({id, ...data}) => ({
        url: `/shop/update/${id}/`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags:["Shops"]
    }),
    deleteShop: builder.mutation({
      query: (id) => ({
        url: `/shop/update/${id}/`,
        method: "DELETE",
        body: data,
      }),
      invalidatesTags:["Shops"]
    }),

    // branch endpoints
    getBranches: builder.query({
      query: () => '/shop/branch/',
      providesTags:["Branch"]
    }),
    getBranch: builder.query({
      query: (id) => `/shop/branch/${id}/`,
    }),
    addBranch: builder.mutation({
      query: (data) => ({
        url: "/shop/branch/",
        method: "POST",
        body: data,
      }),
      invalidatesTags:["Branch"]
    }),
    updateBranch: builder.mutation({
      query: ({id, data}) => ({
        url: `/shop/branch/${id}/`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags:["Branch"]
    }),
    DeleteBranch: builder.mutation({
      query: (id) => ({
        url: `/shop/branch/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags:["Branch"]
    }),


  }),
});

export const { 
  //shop
  useGetShopsQuery, 
  useAddShopMutation,
  useUpdateShopMutation,
  useDeleteShopMutation,
  // Branch
  useGetBranchesQuery,
  useGetBranchQuery,
  useAddBranchMutation,
  useUpdateBranchMutation,
  useDeleteBranchMutation,

} = shopApi;