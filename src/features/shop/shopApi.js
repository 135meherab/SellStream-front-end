
import { apiSlice } from '../api/apiSlice';

export const shopApi = apiSlice.injectEndpoints({
  tagTypes: ["shops", 'branch',],
  endpoints: (builder) => ({

    // start shop endpoints
    // Get shops
    getShops: builder.query({
      query: () => '/shop/get/',
      keepUnusedDataFor: 5,
      providesTags:["Shops"]
    }),
    // Add shop
    addShop: builder.mutation({
      query: (data) => ({
        url: "/shop/createshop/",
        method: "POST",
        body: data,
      }),
      invalidatesTags:["Shops"]
    }),
    // Update shop
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

    // start branch endpoints
    // Get branches
    getBranches: builder.query({
      query: () => '/shop/branch/',
      providesTags:["Branch"]
    }),
    getBranch: builder.query({
      query: (id) => `/shop/branch/${id}/`,
    }),
    // Add branches
    addBranch: builder.mutation({
      query: (data) => ({
        url: "/shop/branch/",
        method: "POST",
        body: data,
      }),
      invalidatesTags:["Branch"]
    }),
    // Update branches
    updateBranch: builder.mutation({
      query: ({id, data}) => ({
        url: `/shop/branch/${id}/`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags:["Branch"]
    }),
    // Delete branches
    DeleteBranch: builder.mutation({
      query: (id) => ({
        url: `/shop/branch/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags:["Branch"]
    }),
  }),
});

// Add authentication headers to each request
export const authEnhancer = (fetchBaseQuery) => (args, api, extraOptions) => {
    // retrieve the authentication token
    const token = localStorage.getItem('auth');

    // call the original fetchBaseQuery function
    const result = fetchBaseQuery(args, api, extraOptions);

    // Include authentication token
    if (token) {
        result.headers['Authorization'] = `Token ${token}`;
    }

    return result;
}

// Inject the authentication enhancer
shopApi.injectEndpoints({
  endpoints: (builder) => ({
    getShops: builder.query({
      ...shopApi.endpoints.getShops,
      queryFn: authEnhancer(shopApi.endpoints.getShops.queryFn)
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