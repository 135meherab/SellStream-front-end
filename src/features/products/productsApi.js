import { apiSlice } from '../api/apiSlice';


// Api for products, categories, orders, and customers
export const productsApi = apiSlice.injectEndpoints({
  tagTypes: ["products, categories", "order", "customer"],
  endpoints: (builder) => ({


    //starting products endpoints
    // Get products
    getProducts: builder.query({
      query: () => '/product/products/',
      provideTags:["products"],


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
      invalidatesTags:["products"]
    }),

    // Update products
    updateProduct: builder.mutation({
      query: ({id, ...data}) => ({
        url: `/product/products/${id}/`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags:["products"]
    }),

    // Delete products
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/product/products/${id}/`,
        method: "DELETE",
        
      }),
      invalidatesTags:["products"]
    }),

    // start Categories endpoints
    // Get categories
    getCategories: builder.query({
      query: () => '/product/categories/',
      keepUnusedDataFor: 30,
      provideTags:["categories"]
    }),
    // Add categories
    addCategory: builder.mutation({
      query: (data) => ({
        url: "/product/categories/",
        method: "POST",
        body: data,
      }),
      invalidatesTags:["categories"]
    }),
    // Update categories
    updateCategory: builder.mutation({
      query: ({id,...data}) => ({
        url: `/product/categories/${id}/`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags:["categories"]
    }),
    // Delete categories
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/product/categories/${id}/`,
        method: "DELETE",
        
      }),
      invalidatesTags:["categories"]
    }),
   
   
    // start Order endpoints
    //  Get Order
    getOrder: builder.query({
      query: () => '/product/order/',
      provideTags:["order"]
    }),
    getOrders: builder.query({
      query: () => `/product/order_list/`,
      provideTags:["order"]
    }),
    // Add Order
    addOrder: builder.mutation({
      query: (data) => ({

        url: "/product/order/",

        method: "POST",
        body: data,
      }),
      invalidatesTags:["order"]
    }),
    // Update Order
    updateOrder: builder.mutation({
      query: (id,data) => ({
        url: `/product/order/${id}/`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags:["order"]
    }),
    // Delete Order
    deleteOrder: builder.mutation({
      query: (id) => ({
        url: `/product/order/${id}/`,
        method: "DELETE",
        
      }),
      invalidatesTags:["order"]
    }),

    //start Customer Endpoint
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