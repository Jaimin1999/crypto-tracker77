import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCryptoCoins = createAsyncThunk("fetchCrypto", async ({ currency, page }) => {
    const response = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&page=${page}`);
    return response.json();
})


const cryptoCoins = createSlice({
    name: "cryptoCoins",
    initialState: {
        isLoading: false,
        data: [],
        isErr: false
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCryptoCoins.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
        })
        builder.addCase(fetchCryptoCoins.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(fetchCryptoCoins.rejected, (state, action) => {
            state.isErr = false;
            console.log("Error", action.payload);
        })
    }
})

export default cryptoCoins.reducer