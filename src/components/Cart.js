import React from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { removeCoin, addQty, removeQty } from '../redux/CryptoCartReducer';

import { Button, Text, Box, Flex, HStack } from '@chakra-ui/react';



function Cart() {

    const { cart } = useSelector(state => state.cryptoCart);

    console.log(cart);

    const dispatch = useDispatch();

    let total = cart.reduce((acc, coin) => acc + coin.price * coin.qty, 0)

    function handleRemove(id) {
        dispatch(removeCoin(id));
    }

    function handleAdd(coin) {
        dispatch(addQty(coin));
    }

    function remove(coin) {
        dispatch(removeQty(coin));
    }

    return (
        <>
            <HStack wrap={"wrap"} justifyContent={"space-evenly"}>

                {total === 0 ? <>Your Cart is Empty</> : cart.map((coin, index) => {
                    return <>

                        {
                            coin.qty !== 0 &&
                            <CartComponent index={index} name={coin.name} price={coin.price} qty={coin.qty} handleAdd={handleAdd} remove={remove} handleRemove={handleRemove} />
                        }

                    </>
                })}

                {/* <CartComponent index={ } name={ } price={ } qty={ } handleAdd={handleAdd} remove={remove} /> */}
            </HStack >
            {total !== 0 && <Text display={"flex"} justifyContent={"center"} alignItems={"center"} backgroundColor={"black"} color={"white"}>Total:{total}</Text>}
        </>
    )
}


function CartComponent({ index, name, price, qty, handleAdd, remove, handleRemove }) {
    return <><Box
        maxW="sm"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        shadow="md"
        p={10}
        m={4}
    >
        <Text fontSize="xl" fontWeight="bold" mb={2}>
            {index + 1}. {name}
        </Text>
        <Text fontSize="lg" mb={2}>
            Price: ${price}
        </Text>
        <Text fontSize="lg" mb={2}>
            Quantity: {qty}
        </Text>
        <Flex justifyContent={"space-between"} alignItems={"center"}>
            <Button colorScheme="teal" size="sm" onClick={() => handleAdd(name)}>
                +
            </Button>
            <Button colorScheme="red" size="sm" onClick={() => remove(name)}>
                -
            </Button>
            <Button colorScheme="gray" size="sm" onClick={() => handleRemove(name)}>
                🗑️
            </Button>
        </Flex>
    </Box>
    </>
}



export default Cart
