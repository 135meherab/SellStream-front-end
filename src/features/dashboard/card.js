import { apiSlice } from '../api/apiSlice';

export const cardApi = apiSlice.injectEndpoints({
    tagTypes: ["cards"],
    endpoints: (builder) => ({

        getCards: builder.query({
            query: () => '/dashboard_view/shop_report/',
            providesTags:["Cards"]
          }),
    })
})

export const { useGetCardsQuery } = apiSlice;