import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const fetchCryptoCoin = createAsyncThunk("fetchCryptoCoin", async ({ id }) => {
    const response = await fetch(`https://api.coingecko.com/api/v3/coins/${id}`)

    return response.json();
})


const cryptoCoin = createSlice({
    name: "cryptoCoin",
    initialState: {
        isLoading: false,
        data: [],
        isErr: false
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCryptoCoin.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
        })
        builder.addCase(fetchCryptoCoin.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(fetchCryptoCoin.rejected, (state, action) => {
            state.isLoading = false;
            console.log("Error", action.payload);
        })
    }
})

export default cryptoCoin.reducer;