import { Container, HStack, VStack, Image, Heading, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { fetchCryptos } from "../redux/CryptoApiReducer";
import Loader from "./Loader";

function Exchanges() {
  const dispatch = useDispatch();
  const state = useSelector(state => state);

  useEffect(() => {
    dispatch(fetchCryptos())
  }, [dispatch])

  return <Container maxW={"container.xl"}>
    {/* {state.crypto.data && state.crypto.data.map((e) => (
      <li key={e.id}>{e.id}</li>
    ))} */}
    {state.crypto.isLoading ? <Loader /> : <>
      <HStack wrap={"wrap"} justifyContent={"space-evenly"}>
        {state.crypto.data && state.crypto.data.map((coin) => (
          <a key={coin.id} href={coin.url} target={"_blank"} rel="noreferrer">
            <VStack
              w={"52"}
              shadow={"lg"}
              p={"8"}
              borderRadius={"lg"}
              transition={"all 0.3s"}
              m={"4"}
              css={{
                "&:hover": {
                  transform: "scale(1.1)",
                },
              }}
            >
              <Image
                src={coin.image}
                w={"10"}
                h={"10"}
                objectFit={"contain"}
                alt={"Exchange"}
              />
              <Heading size={"md"} noOfLines={1}>
                {coin.trust_score_rank}
              </Heading>
              <Text noOfLines={1}>{coin.name}</Text>
            </VStack>
          </a>
        ))}
      </HStack>
    </>}
  </Container>;
}



export default Exchanges;
