import React from "react";
import { CartItemType } from "../utils/types/cart";

export default function CartItem ({item} : {item: CartItemType}) {
    return (
        <div className="flex flex-col sm:flex-row w-full gap-x-10 gap-y-4 items-center justify-between border-b-[1px] py-6 sm:py-8">
            <div className="flex items-center gap-x-6 w-full sm:w-fit">
                <div className="w-16 h-16">
                    <img src="" alt="" className="w-full h-full bg-black"/>
                </div>
                <div className="flex flex-col [&>span]:leading-tight [&>span]:block text-sm sm:text-base">
                    <span className="font-semibold mb-1 sm:m-0 text-base">Matcha Cookies</span>
                    <span>8-Pack</span>
                    <span>8-Pack</span>
                    <span>8-Pack</span>
                    <span>8-Pack</span>
                </div>
            </div>
            <div className="flex flex-col items-end w-full sm:w-fit mdlg:gap-y-2 text-sm sm:text-base">
                <span>120.00 EGP</span>
                <div className="flex items-center justify-between gap-x-6">
                    <button>-</button>
                    <span>4</span>
                    <button>+</button>
                </div>
            </div>
        </div>
    )
}