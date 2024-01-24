
export const roundTwoPlacesDecimals = (num: number): string => {
    return (Math.round(num * 100) / 100).toFixed(2)
}

export const updateCart = (state: any) => {

    // Calculate items price + shipping + tax = total price
    state.itemsPrice = roundTwoPlacesDecimals(state.cartItems.reduce((acc: any, item: any) => {
        return acc + item.price * item.qty
    }, 0))

    state.shippingPrice = roundTwoPlacesDecimals(state.itemsPrice > 100 ? 0 : 10)
    state.taxPrice = roundTwoPlacesDecimals(Number((0.15 * state.itemsPrice).toFixed(2)))
    state.totalPrice = (
        Number(state.itemsPrice) + Number(state.taxPrice) + Number(state.shippingPrice)
    ).toFixed(2);

    localStorage.setItem('cart', JSON.stringify(state));

    return state;
}