import { apiSlice } from '../api/apiSlice';


// Api for products, categories, orders, and customers
export const productsApi = apiSlice.injectEndpoints({
  
  endpoints: (builder) => ({


    //starting products endpoints
    // Get products
    getProducts: builder.query({
      query: () => '/product/products/',
      providesTags:["Products"],


    }),

    getProduct: builder.query({
      query: (productId) => `/product/products/${productId}/`,
    }),

    // Add products
    addProduct: builder.mutation({
      query: (data) => ({
        url: "/product/products/",
        method: "POST",
        body: data,
      }),
      invalidatesTags:["Products"]
    }),

    // Update products
    updateProduct: builder.mutation({
      query: ({id, ...data}) => ({
        url: `/product/products/${id}/`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags:["Products"]
    }),

    // Delete products
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/product/products/${id}/`,
        method: "DELETE",
        
      }),
      invalidatesTags:["Products"]
    }),

    // start Categories endpoints
    // Get categories
    getCategories: builder.query({
      query: () => '/product/categories/',
      keepUnusedDataFor: 30,
      providesTags:["Categories"]
    }),
    // Add categories
    addCategory: builder.mutation({
      query: (data) => ({
        url: "/product/categories/",
        method: "POST",
        body: data,
      }),
      invalidatesTags:["Categories"]
    }),
    // Update categories
    updateCategory: builder.mutation({
      query: ({id,...data}) => ({
        url: `/product/categories/${id}/`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags:["Categories"]
    }),
    // Delete categories
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/product/categories/${id}/`,
        method: "DELETE",
        
      }),
      invalidatesTags:["Categories"]
    }),
   
   
    // start Order endpoints
    //  Get Order
    getOrder: builder.query({
      query: () => '/product/order/',
      providesTags:["Order"]
    }),
    getOrders: builder.query({
      query: () => `/product/order_list/`,
      provideTags:["order"]
    }),
    // Add Order
    addOrder: builder.mutation({
      query: (data) => ({
        url: "/product/order_create/",
        method: "POST",
        body: data,
      }),
      invalidatesTags:["Order"]
    }),
    // Update Order
    updateOrder: builder.mutation({
      query: (id,data) => ({
        url: `/product/order/${id}/`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags:["Order"]
    }),
    // Delete Order
    deleteOrder: builder.mutation({
      query: (id) => ({
        url: `/product/order/${id}/`,
        method: "DELETE",
        
      }),
      invalidatesTags:["Order"]
    }),

    //start Customer Endpoint
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