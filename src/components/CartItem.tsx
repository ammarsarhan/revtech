import React from "react";
import { CartItemType } from "../utils/types/cart";
import { useCartContext } from "../context/useCartContext";
import getCurrencyInEGP from "../utils/currency";

export default function CartItem ({item} : {item: CartItemType}) {
    const cartContext = useCartContext();

    const displayAttributes = () => {
        let attributes: string[] = [];

        item.productOptions.map((option, index) => {
            const attribute = item.product.options[index].attributes[option].value;
            attributes.push(attribute);
        })

        return attributes;
    }

    const handleDecrement = () => {
        // Decrement Quantity
    }

    const handleIncrement = () => {
        // Increment Quantity
    }

    return (
        <div className="flex flex-col sm:flex-row w-full gap-x-10 gap-y-4 items-center justify-between border-b-[1px] py-6 sm:py-8">
            <div className="flex items-center gap-x-6 w-full sm:w-fit">
                <div className="w-16 h-16">
                    <img src="" alt="" className="w-full h-full bg-black"/>
                </div>
                <div className="flex flex-col [&>span]:leading-tight [&>span]:block text-sm sm:text-base">
                    <span className="font-semibold text-base mb-1">{item.product.name}</span>
                    {
                        displayAttributes().map((label, index) => {
                            return (
                                <span key={index} className="text-sm">{label}</span>
                            )
                        })
                    }
                </div>
            </div>
            <div className="flex flex-col items-end w-full sm:w-fit mdlg:gap-y-2 text-sm sm:text-base">
                <span>{getCurrencyInEGP(item.price)}</span>
                <div className="flex items-center justify-between gap-x-6">
                    <button onClick={handleDecrement}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={handleIncrement}>+</button>
                </div>
            </div>
        </div>
    )
}