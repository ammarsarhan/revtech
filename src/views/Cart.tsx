import React from "react";
import CartItem from "../components/CartItem";
import Button from "../components/Button";
import { useCartContext } from "../context/useCartContext";

export default function Cart () {
    const cartContext = useCartContext();
    const isEmpty = cartContext.data.cartItems.length === 0;

    return (
        <div className="flex-col mdlg:flex-row flex gap-x-16 mx-6 my-3 gap-y-8">
            <div className="mdlg:w-1/2">
                <h2 className="text-3xl md:text-4xl font-semibold">Your Cart</h2>
                <div className="overflow-y-scroll">
                    {
                        isEmpty &&
                        <span className="text-sm text-gray-600 block mt-2 sm:mt-3">There are no items in your cart.</span>
                    }
                    {
                        cartContext.data.cartItems.map((item, index) => {
                            return <CartItem item={item} key={index}/>
                        })
                    }
                </div>
            </div>
            <div className="mdlg:w-1/2">
                <div className="flex flex-col h-[50vh] justify-between sticky top-8">
                    <div>
                        <h3 className="text-lg md:text-xl font-medium">Total</h3>
                        <div className="flex flex-col my-4 [&>div:last-child]:border-b-[1px] [&>div:last-child]:border-b-black">
                            <div className="flex items-center justify-between gap-x-8 flex-wrap py-4 border-t-[1px]">
                                <span className="text-sm">Taxes</span>
                                <span>$0.00 USD</span>
                            </div>
                            <div className="flex items-center justify-between gap-x-8 flex-wrap py-4 border-t-[1px]">
                                <span className="text-sm">Shipping</span>
                                <span>$0.00 USD</span>
                            </div>
                            <div className="flex items-center justify-between gap-x-8 flex-wrap py-4 border-t-[1px]">
                                <span>Total</span>
                                <span>$0.00 USD</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-y-2 relative">
                        <Button disabled={isEmpty} variant="Primary" className="border-[1px]">Save to Wishlist</Button>
                        <Button disabled={isEmpty} variant="Secondary">Proceed to Checkout</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}