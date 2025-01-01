import React, { useState } from "react";
import CartItem from "../components/CartItem";
import { CartItemType } from '../utils/types/cart';

import { products } from "../utils/types/products";
import Button from "../components/Button";

export default function Wishlist () {
    const [wishlistItems, setWishlistItems] = useState<CartItemType[]>([
        {
            product: products[0],
            productOptions: [1, 2],
            price: 4000,
            quantity: 2
        },
        {
            product: products[0],
            productOptions: [1, 2],
            price: 4000,
            quantity: 2
        },
        {
            product: products[0],
            productOptions: [1, 2],
            price: 4000,
            quantity: 2
        },
        {
            product: products[0],
            productOptions: [1, 2],
            price: 4000,
            quantity: 2
        },
        {
            product: products[0],
            productOptions: [1, 2],
            price: 4000,
            quantity: 2
        },
        {
            product: products[0],
            productOptions: [1, 2],
            price: 4000,
            quantity: 2
        },
        {
            product: products[0],
            productOptions: [1, 2],
            price: 4000,
            quantity: 2
        },
    ]);

    return (
        <div className="flex flex-col gap-x-16 mx-6 my-3">
            <h2 className="text-3xl md:text-4xl font-semibold">Your Wishlist</h2>
            <div className="overflow-y-scroll">
                {
                    wishlistItems.map((item, index) => {
                        return <CartItem item={item} key={index}/>
                    })
                }
            </div>
        </div>
    )
}