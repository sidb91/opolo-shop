import { PRODUCTS_URL } from "../constants";
import { IProduct } from "../interface/Product";
import { apiSlice } from "./apiSlice";

export const productApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query<IProduct[], void>({
            query: () => ({
                url: PRODUCTS_URL
            }),
            keepUnusedDataFor: 5
        }),
        getProductDetails: builder.query<IProduct, string>({
            query: (productId) => ({
                url: `${PRODUCTS_URL}/${productId}`
            }),
            keepUnusedDataFor: 5
        })
    })
});

export const { useGetProductsQuery, useGetProductDetailsQuery } = productApiSlice;