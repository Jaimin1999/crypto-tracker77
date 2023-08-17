import { createSlice } from "@reduxjs/toolkit";


export const cryptoCartReducer = createSlice({
    name: "cryptoCart",
    initialState: {
        cart: []
    },
    reducers: {
        addCoin: (state, action) => {

            let index = state.cart.findIndex((item) => item.name === action.payload.name)
            if (index === -1) {
                state.cart = [...state.cart, action.payload];
            } else {
                state.cart[index].qty += 1;
            }
        },
        removeCoin: (state, action) => {
            let elementToRemove = action.payload;
            if (state.cart.indexOf(elementToRemove) !== 1) {
                state.cart.splice(state.cart.indexOf(elementToRemove), 1)
            }
        },
        addQty: (state, action) => {
            let index = state.cart.findIndex((item) => item.name === action.payload);
            console.log(state.cart);
            state.cart[index].qty += 1;
        },

        removeQty: (state, action) => {
            let index = state.cart.findIndex((item) => item.name === action.payload);
            state.cart[index].qty -= 1;

            if (state.cart[index].qty === 0) {
                state.cart.splice(state.cart.indexOf(state.cart[index]), 1)
            }

        },
    }
});

export const { addCoin, removeCoin, addQty, removeQty } = cryptoCartReducer.actions;

export default cryptoCartReducer.reducer;

