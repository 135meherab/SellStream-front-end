import { apiSlice } from '../api/apiSlice';


export const productsApi = apiSlice.injectEndpoints({
  
  endpoints: (builder) => ({
    // products endpoints
    getProducts: builder.query({
      query: () => '/product/products/',
      providesTags:["Products"],


    }),

    getProduct: builder.query({
      query: (productId) => `/product/products/${productId}/`,
    }),
    addProduct: builder.mutation({
      query: (data) => ({
        url: "/product/products/",
        method: "POST",
        body: data,
      }),
      invalidatesTags:["Products"]
    }),
    updateProduct: builder.mutation({
      query: ({id, ...data}) => ({
        url: `/product/products/${id}/`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags:["Products"]
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/product/products/${id}/`,
        method: "DELETE",
        
      }),
      invalidatesTags:["Products"]
    }),

    // Categories endpoints
    getCategories: builder.query({
      query: () => '/product/categories/',
      keepUnusedDataFor: 30,
      providesTags:["Categories"]
    }),
    addCategory: builder.mutation({
      query: (data) => ({
        url: "/product/categories/",
        method: "POST",
        body: data,
      }),
      invalidatesTags:["Categories"]
    }),
    updateCategory: builder.mutation({
      query: ({id,...data}) => ({
        url: `/product/categories/${id}/`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags:["Categories"]
    }),
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/product/categories/${id}/`,
        method: "DELETE",
        
      }),
      invalidatesTags:["Categories"]
    }),
   
   
    // Order endpoints

    getOrder: builder.query({
      query: () => '/product/order/',
      providesTags:["Order"]
    }),
    getOrders: builder.query({
      query: () => '/product/order_list/',
      provideTags:["order"]
    }),
    addOrder: builder.mutation({
      query: (data) => ({
        url: "/product/order/",
        method: "POST",
        body: data,
      }),
      invalidatesTags:["Order"]
    }),
    updateOrder: builder.mutation({
      query: (id,data) => ({
        url: `/product/order/${id}/`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags:["Order"]
    }),
    deleteOrder: builder.mutation({
      query: (id) => ({
        url: `/product/order/${id}/`,
        method: "DELETE",
        
      }),
      invalidatesTags:["Order"]
    }),

    // Customer Endpoint
    getCustomers: builder.query({
      query: () => '/product/customer_list/',
      providesTags:["Customers"]
    }),
    addCustomer: builder.mutation({
      query: (data) => ({
        url: "/product/customer_list/",
        method: "POST",
        body: data,
      }),
      invalidatesTags:["Customers"]
    }),
    updateCustomer: builder.mutation({
      query: ({id, ...data}) => ({
        url: `product/customer_list/${id}/`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags:["Customers"]
    }),
    deleteCustomer: builder.mutation({
      query: (id) => ({
        url: `product/customer_list/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags:["Customers"]
    }),

  }),
});

export const { 
  //products
  useGetProductsQuery, 
  useGetProductQuery, 
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  
  //categories
  useGetCategoriesQuery,
  useAddCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,

  //Orders
  useGetOrderQuery,
  useGetOrdersQuery,
  useAddOrderMutation,
  useUpdateOrderMutation,
  useDeleteOrderMutation,

  // Customer

  useGetCustomersQuery,
  useAddCustomerMutation,
  useUpdateCustomerMutation,
  useDeleteCustomerMutation

} = productsApi;