import React from "react";
import CartItem from "../components/CartItem";

export default function Cart () {
    return (
        <div className="mx-6 my-3">
            <h2 className="text-3xl md:text-4xl font-semibold">Your Cart</h2>
            <div className="flex w-full mt-6 gap-x-4">
                <div className="flex flex-col w-3/4">
                    <CartItem />
                </div>
                <div className="w-1/4">
                    Order Subsection
                </div>
            </div>
        </div>
    )
}