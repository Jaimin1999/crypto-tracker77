import { configureStore } from "@reduxjs/toolkit";

import cryptoApiReducer from "./CryptoApiReducer";
import CryptoCoinReducer from "./CryptoCoinReducer";
import CryptoSingleCoinReducer from "./CryptoSingleCoinReducer";
import CryptoCartReducer from "./CryptoCartReducer";
import CryptoChartReducer from "./CryptoChartReducer";
export const store = configureStore({
    reducer: {
        crypto: cryptoApiReducer,
        cryptoCoins: CryptoCoinReducer,
        cryptoCoin: CryptoSingleCoinReducer,
        cryptoCart: CryptoCartReducer,
        cryptoChart: CryptoChartReducer,
    }
})