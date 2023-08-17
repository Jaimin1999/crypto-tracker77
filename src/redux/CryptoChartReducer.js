import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const fetchChartCoin = createAsyncThunk("fetchChart", async ({ coin, currency, days }) => {
    const response = await fetch(`https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=${currency}&days=${days}`);
    return response.json();
})


const cryptoChart = createSlice({
    name: "cryptoChart",
    initialState: {
        isLoading: false,
        data: [],
        isErr: false
    },
    extraReducers: (builder) => {
        builder.addCase(fetchChartCoin.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
        })
        builder.addCase(fetchChartCoin.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(fetchChartCoin.rejected, (state, action) => {
            state.isErr = false;
            console.log("Error", action.payload);
        })
    }
})

export default cryptoChart.reducer;