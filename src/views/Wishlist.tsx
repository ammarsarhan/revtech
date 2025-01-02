import React, { useState } from "react";
import CartItem from "../components/CartItem";
import { CartItemType } from '../utils/types/cart';

import { NavLink } from "react-router-dom";
import Button from "../components/Button";
import { products } from "../utils/types/products";

export default function Wishlist () {
    const [wishlistItems, setWishlistItems] = useState<CartItemType[]>([]);

    return (
        <div className="flex flex-col gap-x-16 mx-6 my-3">
            <h2 className="text-3xl md:text-4xl font-semibold">Your Wishlist</h2>
            {
                wishlistItems.length === 0 ?
                <span className="text-gray-600 block mt-2 sm:mt-3 text-sm">There are no items in your wishlist. Find and <NavLink to="/products" className="text-blue-700 hover:underline">discover products</NavLink> to start adding items to your wishlist!</span> :
                <div className="overflow-y-scroll">
                    {
                        wishlistItems.map((item, index) => {
                            return <CartItem item={item} key={index}/>
                        })
                    }
                </div>
            }
        </div>
    )
}