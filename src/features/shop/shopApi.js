
import { apiSlice } from '../api/apiSlice';

export const shopApi = apiSlice.injectEndpoints({
  tagTypes: ["shops", 'branch',],
  endpoints: (builder) => ({

    // shop endpoints
    getShops: builder.query({
      query: () => '/shop/get/',
      keepUnusedDataFor: 5,
      provideTags:["shops"]
    }),
    addShop: builder.mutation({
      query: (data) => ({
        url: "/shop/createshop/",
        method: "POST",
        body: data,
      }),
      invalidatesTags:["shops"]
    }),
    updateShop: builder.mutation({
      query: ({id, ...data}) => ({
        url: `/shop/update/${id}/`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags:["shops"]
    }),

    // branch endpoints
    getBranches: builder.query({
      query: () => '/shop/branch/',
      provideTags:["branch"]
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
      invalidatesTags:["branch"]
    }),
    updateBranch: builder.mutation({
      query: ({id, data}) => ({
        url: `/shop/branch/${id}/`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags:["branch"]
    }),
    DeleteBranch: builder.mutation({
      query: (id) => ({
        url: `/shop/branch/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags:["branch"]
    }),


  }),
});

export const { 
  //shop
  useGetShopsQuery, 
  useAddShopMutation,
  useUpdateShopMutation,

  // Branch
  useGetBranchesQuery,
  useGetBranchQuery,
  useAddBranchMutation,
  useUpdateBranchMutation,
  useDeleteBranchMutation,

} = shopApi;