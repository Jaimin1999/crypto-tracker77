import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCryptos = createAsyncThunk("fetchCrypto", async () => {
    const response = await fetch("https://api.coingecko.com/api/v3/exchanges/");
    return response.json();
})

const cryptoSlice = createSlice({
    name: "crypto",
    initialState: {
        isLoading: false,
        data: null,
        isErr: false
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCryptos.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload
        });
        builder.addCase(fetchCryptos.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(fetchCryptos.rejected, (state, action) => {
            state.isErr = true;
            console.log("Error", action.payload);
        })
    }
})

export default cryptoSlice.reducer;