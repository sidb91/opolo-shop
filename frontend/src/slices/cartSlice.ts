import { createSlice } from '@reduxjs/toolkit';
import { IProduct } from '../interface/Product';

const roundTwoPlacesDecimals = (num: number) => {
    return (Math.round(num * 100) / 100).toFixed(2)
}

const initialState = localStorage.getItem('Cart') ? 
    JSON.parse(localStorage.getItem('Cart')) : { cartItems: [] }

const cartSlice = createSlice({
    name: 'Cart',
    initialState,
    reducers: {
        addToCart: (state, action: { payload: any, type: string }) => {
            const item: IProduct = action.payload;
            const existItem: IProduct = state.cartItems.find((it:any) => it._id === item._id);

            if(existItem){
                state.cartItems = state.cartItems.map(
                    (it:any) => it._id === existItem._id ? existItem : it
                );
            } else {
                state.cartItems = [...state.cardItems, item]
            }
            
            // Calculate items price + shipping + tax = total price
            state.itemsPrice = roundTwoPlacesDecimals(state.cartItems.reduce((acc: any, item: any) => {
                return acc + item.price * item.qty
            }, 0))

            state.shippingPrice = roundTwoPlacesDecimals(state.itemsPrice > 100 ? 0 : 10)
            state.taxPrice = roundTwoPlacesDecimals(Number((0.15 * state.itemsPrice).toFixed(2)))
            state.totalPrice = (
                Number(state.itemsPrice) + Number(state.taxPrice) + Number(state.shippingPrice)
            ).toFixed(2);

            localStorage.setItem('Cart', JSON.stringify(state))

        }
    }
});

export default cartSlice.reducer;
