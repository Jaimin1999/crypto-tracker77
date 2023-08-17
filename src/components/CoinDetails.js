import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCryptoCoin } from "../redux/CryptoSingleCoinReducer";
import { fetchChartCoin } from "../redux/CryptoChartReducer";
import { addCoin } from "../redux/CryptoCartReducer";

import { Container, Button, Box, Select, Stack, VStack, Text, Image, StatLabel, Stat, StatArrow, StatNumber, StatHelpText, Badge, Progress, HStack } from "@chakra-ui/react";


import Chart from "./Chart";
import Loader from "./Loader";
function CoinDetails() {
  const dispatch = useDispatch();
  const params = useParams();
  const id = params.id;

  const [currency, setCurrency] = useState("inr");

  const [days, setDays] = useState("24h");


  const currencySymbol =
    currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";


  const btns = ["24h", "7d", "14d", "30d", "60d", "200d", "1y", "max"]


  const switchChartStats = (key) => {
    switch (key) {
      case "24h":
        setDays("24h");
        break;

      case "7d":
        setDays("7d");
        break;

      case "14d":
        setDays("14d");
        break;

      case "30d":
        setDays("30d");
        break;

      case "60d":
        setDays("60d");
        break;

      case "200d":
        setDays("200d");
        break;

      case "1y":
        setDays("365d");
        break;

      case "max":
        setDays("max");
        break;

      default:
        break;
    }
  }

  const [count, setCount] = useState(0);

  let qty = 1;

  const cryptoSingleCoin = useSelector((state) => state.cryptoCoin);

  const cryptoChartData = useSelector((state) => state.cryptoChart);

  const coin = params.id;

  console.log("CryptoSingle:", cryptoSingleCoin);
  useEffect(() => {
    dispatch(fetchCryptoCoin({ id }))
  }, [dispatch, id, currency])



  console.log("CryptoChart", cryptoChartData);
  useEffect(() => {
    dispatch(fetchChartCoin({ coin, currency, days }))
  }, [dispatch, id, currency, days, coin])


  function handleAdd() {
    const coin = {
      name: cryptoSingleCoin.data.name,
      price: cryptoSingleCoin?.data?.market_data?.current_price?.[currency],
      qty: qty,
    }
    dispatch(addCoin(coin))
    setCount(count + 1);
  }


  return <Container maxW={"container.xl"}>
    <>{cryptoSingleCoin.isLoading ? <Loader /> : <Box>
      <Box width={"full"} borderWidth={1}>
        <Chart currency={currencySymbol} arr={cryptoChartData.data.prices} days={days} />
      </Box>
      <HStack p="4" overflowX={"auto"}>
        {btns.map((i) => (
          <Button
            disabled={days === i}
            key={i}
            onClick={() => switchChartStats(i)}
          >
            {i}
          </Button>
        ))}
      </HStack>
      <Stack>
        <Select onChange={(e) => setCurrency(e.target.value)} size={"sm"} width={"250px"}>
          <option value="inr">INR</option>
          <option value="usd">USD</option>
        </Select>
      </Stack>
      <VStack spacing={"4"} p={"16"} alignItems={"flex-start"}>
        <Text fontSize={"small"} alignSelf={"center"} opacity={0.2}>Last Updated on {Date(cryptoSingleCoin.data.market_data?.last_updated).split("G")[0]}</Text>

        <Image
          src={cryptoSingleCoin?.data?.image?.large}
          w={"16"}
          h={"16"}
          objectFit={"contain"}
        />
        <Stat>
          <StatLabel>{cryptoSingleCoin.data.name}</StatLabel>
          <StatNumber>{currencySymbol}{cryptoSingleCoin?.data?.market_data?.current_price?.[currency]}</StatNumber>
          <StatHelpText>
            <StatArrow type={cryptoSingleCoin?.data?.market_data?.price_change_percentage_24h > 0 ? "increase" : "decrease"} />
            {cryptoSingleCoin?.data?.market_data?.price_change_percentage_24h}%
          </StatHelpText>
          <Button onClick={handleAdd} style={{ backgroundColor: "gold" }}>Add</Button>
        </Stat>
        <Badge
          fontSize={"2xl"}
          bgColor={"blackAlpha.800"}
          color={"white"}
        >
          {`#${cryptoSingleCoin.data.market_cap_rank}`}
        </Badge>

        <CustomBar high={`${currencySymbol}${cryptoSingleCoin?.data?.market_data?.high_24h[currency]}`} low={`${currencySymbol}${cryptoSingleCoin?.data?.market_data?.low_24h[currency]}`} />

        <Box w={"full"} p={"4"}>
          <Item
            title={"Circulating Supply"}
            value={cryptoSingleCoin.data?.market_data?.circulating_supply}
          />
          <Item
            title={"Market Cap"}
            value={`${currencySymbol}${cryptoSingleCoin.data?.market_data?.market_cap[currency]}`}
          />
          <Item
            title={"All Time Low"}
            value={`${currencySymbol}${cryptoSingleCoin.data?.market_data?.atl[currency]}`}
          />
          <Item
            title={"All Time High"}
            value={`${currencySymbol}${cryptoSingleCoin.data?.market_data?.ath[currency]}`}
          />
        </Box>
      </VStack>

      <Box>
      </Box>
    </Box>}

    </>
  </Container>;
}

const CustomBar = ({ high, low }) => {
  return <VStack w={"full"}>
    <Progress value={50} colorScheme={"teal"} w={"full"} />
    <HStack justifyContent={"space-between"} w={"full"}>
      <Badge children={low} colorScheme="red" />
      <Text fontSize={"sm"}>24h Range</Text>
      <Badge children={high} colorScheme="green" />
    </HStack>
  </VStack>
}

const Item = ({ title, value }) => {
  return <HStack justifyContent={"space-between"} w={"full"} my={"4"}>
    <Text fontFamily={"Bebas Neue"} letterSpacing={"widest"}>
      {title}
    </Text>
    <Text>{value}</Text>
  </HStack>
}


export default CoinDetails;
