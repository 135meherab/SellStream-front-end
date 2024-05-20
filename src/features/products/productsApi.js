import { apiSlice } from '../api/apiSlice';


export const productsApi = apiSlice.injectEndpoints({
  tagTypes: ["products, categories", "order", "customer"],
  endpoints: (builder) => ({
    // products endpoints
    getProducts: builder.query({
      query: () => '/product/products',
      provideTags:["products"]
    }),
    getProduct: builder.query({
      query: (productId) => `/product/products/${productId}`,
    }),
    addProduct: builder.mutation({
      query: (data) => ({
        url: "/product/products",
        method: "POST",
        body: data,
      }),
      invalidatesTags:["products"]
    }),
    updateProduct: builder.mutation({
      query: (id, data) => ({
        url: `/product/products/${id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags:["products"]
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/product/products/${id}`,
        method: "POST",
        
      }),
      invalidatesTags:["products"]
    }),

    // Categories endpoints
    getCategories: builder.query({
      query: () => '/product/categories',
      provideTags:["categories"]
    }),
    addCategory: builder.mutation({
      query: (data) => ({
        url: "/product/categories",
        method: "POST",
        body: data,
      }),
      invalidatesTags:["categories"]
    }),
    updateCategory: builder.mutation({
      query: (id,data) => ({
        url: `/product/categories/${id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags:["categories"]
    }),
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/product/categories/${id}`,
        method: "POST",
        
      }),
      invalidatesTags:["categories"]
    }),
   
   
    // Order endpoints

    getOrder: builder.query({
      query: () => '/product/order/',
      provideTags:["order"]
    }),
    getOrders: builder.query({
      query: () => '/product/order_list/',
      provideTags:["order"]
    }),
    addOrder: builder.mutation({
      query: (data) => ({
        url: "/product/order",
        method: "POST",
        body: data,
      }),
      invalidatesTags:["order"]
    }),
    updateOrder: builder.mutation({
      query: (id,data) => ({
        url: `/product/order/${id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags:["order"]
    }),
    deleteOrder: builder.mutation({
      query: (id) => ({
        url: `/product/order/${id}`,
        method: "POST",
        
      }),
      invalidatesTags:["order"]
    }),

    // Customer Endpoint
    getCustomers: builder.query({
      query: () => '/product/customer_list/',
      provideTags:["customer"]
    }),
    addCustomer: builder.mutation({
      query: (data) => ({
        url: "/product/customer_list/",
        method: "POST",
        body: data,
      }),
      invalidatesTags:["customer"]
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

} = productsApi;