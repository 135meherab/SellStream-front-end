import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    products : []
}
const productSlice = createSlice({
    name :'product',
    initialState,
    reducers: {
        products(state, action){
            state.products = action.payload
        }
    }

})

export const  { products } = productSlice.actions;
export default productSlice.reducer;