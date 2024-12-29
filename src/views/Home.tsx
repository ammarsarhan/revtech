import React, { useState } from "react";
import Button from "../components/Button";
import { NavLink } from "react-router-dom";
import { ShoppingCart, MoveUpRight } from "lucide-react";

export default function Home () {
    const [primaryProduct, setPrimaryProduct] = useState();
    const [secondaryProduct, setSecondaryProduct] = useState();

    return (
        <div className="flex flex-col gap-y-8 mdlg:grid grid-cols-2 h-full gap-x-6 p-6">
            <div>
                <div className="flex flex-col h-full gap-y-8 md:gap-y-4">
                    <div className="h-full flex justify-center flex-col gap-y-8">
                        <div className="flex flex-col gap-y-6">
                            <h1 className="leading-[1.125] text-[10vw] sm:text-[7.5vw] md:text-[5vw] font-medium">Unleash the power of tech with the all new <span className="underline">Apple Macbook Air</span>.</h1>
                            <p className="text-gray-700 text-base lg:text-lg leading-6">Discover the perfect blend of compactness and power with <span className="font-medium text-black">Revtech's range of premium technology.</span></p>
                        </div>
                        <div className="w-full xs:w-1/2 md:w-1/3">
                            <NavLink to="/products">
                                <Button expand variant="Secondary" className="!py-4">Browse products</Button>
                            </NavLink>
                        </div>
                    </div>
                    <div className="p-3 border-[1px] rounded-2xl flex flex-col xs:flex-row gap-x-6 hover:bg-gray-50 transition-colors cursor-pointer [&>div>button]:hover:bg-gray-200">
                        <div className="flex-center w-full xs:w-1/3 h-full mb-3 xs:mb-0">
                            <img className="bg-black rounded-2xl w-40 xs:w-full h-40" src="" alt="">
                            </img>
                        </div>
                        <div className="flex-1 my-2 flex flex-col justify-around gap-y-2">
                            <div className="flex flex-col gap-y-1">
                                <h3 className="font-medium text-xl">Apple M2 Macbook Sleeve</h3>
                                <p className="text-sm text-gray-700 leading-5">Fits Apple Macbook Air M2 with more random facts to be inserted here.</p>
                            </div>
                            <div className="flex items-center gap-x-4">
                                <span className="text-xl font-medium line-through text-gray-400">$9.99</span>
                                <span className="text-xl font-medium">$7.99</span>
                            </div>
                        </div>
                        <div className="flex items-end">
                            <Button icon><MoveUpRight className="w-4 h-4"/></Button>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div className="flex flex-col bg-gradient-to-br from-emerald-600 to-emerald-800 text-white h-full w-full rounded-2xl p-8">
                    <div className="mdlg:h-full mdlg:block flex-center mb-8">
                        <img src="" alt="" className="bg-white w-full sm:w-1/2 h-[40vh] sm:h-[50vh] mdlg:w-full mdlg:h-full rounded-2xl"/>
                    </div>
                    <div className="flex flex-col justify-between gap-y-6">
                        <div className="flex items-center justify-between gap-x-4">
                            <div className="flex flex-col flex-1 gap-y-3">
                                <h3 className="text-[5vw] sm:text-[4vw] md:text-[3vw] leading-[1.125]">
                                    2022 Apple M2 Chip Macbook Air
                                    <br/>
                                    Professional Laptop
                                </h3>
                                <span className="text-sm font-light">Compact, lightweight, and powerful.</span>
                            </div>
                            <h2 className="text-2xl font-medium text-right">$999.99</h2>
                        </div>
                        <div className="flex items-center justify-between gap-x-4 text-black">
                            <div className="w-3/4 xs:w-1/2">
                                <Button expand>View more</Button>
                            </div>
                            <Button icon>
                                <ShoppingCart className="w-4 h-4"/>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}