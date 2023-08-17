import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { fetchCryptoCoins } from "../redux/CryptoCoinReducer";

import CoinCard from "./CoinCard";
import { Box, Container, HStack, VStack, Input, Button, Select, } from "@chakra-ui/react";
import Loader from "./Loader";
function Coins() {

  const [currency, setCurrency] = useState("inr");

  const [searchWord, setSearchWord] = useState("");

  const [sort, setSort] = useState("market_cap_rank");

  const [currencySymbol, setCurrencySymbol] = useState("₹");
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();

  const cryptostate = useSelector(state => state.cryptoCoins);


  useEffect(() => {
    dispatch(fetchCryptoCoins({ currency, page }));
  }, [currency, page, dispatch])


  useEffect(() => {
    if (currency === "inr") {
      setCurrencySymbol("₹");
    } else if (currency === "usd") {
      setCurrencySymbol("$");
    }
  }, [currency])


  const changePage = (page) => {
    setPage(page);
  }

  const btns = new Array(132).fill(1);
  let filteredCoins = cryptostate.data.filter((coin) => {
    return coin.name.toLowerCase().includes(searchWord.toLowerCase());
  })

  return (<>{cryptostate.isLoading ? <Loader /> : < Container maxW={"container.xl"} >

    <VStack><Input marginTop={"5px"} size="md" placeholder="Search Coin" value={searchWord} onChange={(e) => setSearchWord(e.target.value)} /></VStack>
    <Box width="250px" display={"flex"}>
      <Select onChange={(e) => setCurrency(e.target.value)} size={"lg"}>
        <option value="inr">INR</option>
        <option value="usd">USD</option>
      </Select>

      <Select onChange={(e) => setSort(e.target.value)} size={"lg"}>
        <option value="market_cap_rank">Rank</option>
        <option value="name">Name</option>
        <option value="current_price">Price</option>
      </Select>
    </Box>
    <HStack wrap={"wrap"} justifyContent={"space-evenly"}>
      {sort === "current_price" ? filteredCoins.sort((a, b) =>
        (a[sort] < b[sort] ? 1 : -1))
        .map((coin) => {
          return <CoinCard id={coin.id}
            key={coin.id}
            name={coin.name}
            price={coin.current_price}
            img={coin.image}
            symbol={coin.symbol}
            currencySymbol={currencySymbol}
          />
        }) : filteredCoins.sort((a, b) =>
          (a[sort] > b[sort] ? 1 : -1))
          .map((coin) => {
            return <CoinCard id={coin.id}
              key={coin.id}
              name={coin.name}
              price={coin.current_price}
              img={coin.image}
              symbol={coin.symbol}
              currencySymbol={currencySymbol}
            />
          })}
    </HStack>
    <HStack w={"full"} overflowX={"auto"} p={"8"}>
      {btns.map((item, index) => (
        <Button
          key={index}
          bgColor={"blackAlpha.900"}
          color={"white"}
          onClick={() => changePage(index + 1)}
        >
          {index + 1}
        </Button>
      ))}
    </HStack>
  </Container >}</>);
}

export default Coins;
