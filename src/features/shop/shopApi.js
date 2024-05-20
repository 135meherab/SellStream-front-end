
import { apiSlice } from '../api/apiSlice';

export const employeeApi = apiSlice.injectEndpoints({
  tagTypes: ["shops", 'branch',],
  endpoints: (builder) => ({

    // shop endpoints
    getShops: builder.query({
      query: () => '/shop/list',
      provideTags:["shops"]
    }),
    addShop: builder.mutation({
      query: (data) => ({
        url: "/shop/createshop",
        method: "POST",
        body: data,
      }),
      invalidatesTags:["shops"]
    }),
    updateShop: builder.mutation({
      query: (id, data) => ({
        url: `/shop/update/${id}`,
        method: "POST",
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
      query: (id) => `/shop/branch/${id}`,
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
      query: (id, data) => ({
        url: `/shop/branch/${id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags:["branch"]
    }),
    DeleteBranch: builder.mutation({
      query: (id) => ({
        url: `/shop/branch/${id}`,
        method: "POST",
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

} = apiSlice;