import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { products, ProductDisplayType } from "../utils/types/products";

import { NavLink } from "react-router-dom";

import { Heart, ShoppingCart } from "lucide-react";
import OptionGroup from "../components/OptionGroup";
import Button from '../components/Button';

import getCurrencyInEGP from '../utils/currency';
import { useCartContext } from "../context/useCartContext";
import getProductById from "../firebase/db";

export default function Product () {
    const cartContext = useCartContext();
    const { id } = useParams();

    const [loading, setLoading] = useState(true);
    const [productData, setProductData] = useState<ProductDisplayType | null>(null);
    const [activePrice, setActivePrice] = useState(0);
    const [selectedOptions, setSelectedOptions] = useState<number[]>([]);

    useEffect(() => {
        const fetchProductData = async () => {
            if (id) {
                const data = await getProductById(id);

                if (data) {
                    setProductData(data);
                    setSelectedOptions(new Array(data.options.length).fill(0));
                    setActivePrice(data.price);
                }
            }
        }

        fetchProductData();
        setLoading(false);
    }, [])
    
    const onSelectionChanged = (row: number, selection: number) => {      
        if (productData) {
            const temp = [...selectedOptions];
            temp[row] = selection;
        
            const initialPrice = productData.price;
            let addOnPrice = 0;

            temp.forEach((element, index) => {
                const addOnValue = productData.options[index].attributes[element].addOnPrice;
                addOnPrice += addOnValue;
            });
        
            setActivePrice(initialPrice + addOnPrice);
            setSelectedOptions(temp);
        }  
    };

    const handleAddToCart = () => {
        if (productData) {
            cartContext.actions.addItem({
                product: productData,
                productOptions: [...selectedOptions],
                price: activePrice,
                quantity: 1
            })
        }
    }

    if (!loading && productData)
    return (
        <div className="grid grid-cols-2 h-[calc(100vh-7rem)]">
            <div className="h-full border-r-[1px]">

            </div>
            <div className="h-full overflow-y-scroll">
                <div className="mx-6">
                    <div className="flex justify-between items-center">
                        <div>
                            <span className="text-gray-600 text-sm">{productData.vendor}</span>
                            <h2 className="text-3xl font-semibold my-2">{productData.name}</h2>
                            <p className="text-gray-600 text-sm">{productData.category} <br/> {id}</p>
                        </div>
                        <div>
                            <span className="text-sm text-gray-600">{productData.variantCount} Variants</span>
                        </div>
                    </div>
                    <div className="my-6 flex flex-col gap-y-8">
                        {
                            productData.options.map((element, index) => {
                                const selected = selectedOptions[index];

                                return (
                                    <OptionGroup 
                                        option={element} 
                                        row={index}
                                        selection={selected} 
                                        handleSelectionChange={onSelectionChanged}
                                        key={index} 
                                    />
                                )
                            })
                        }
                    </div>
                    <div className="mt-8 w-full">
                        <h3 className="font-medium">Price:</h3>
                        <div>
                            <span className="text-lg font-semibold">{getCurrencyInEGP(activePrice)}</span>
                        </div>
                    </div>
                    <div className="mt-6 w-full">
                        <div className="w-full flex items-center justify-between">
                            <Button variant="Primary" className="flex items-center gap-x-2">
                                <Heart className="w-4 h-4"/>Add To Wishlist
                            </Button>
                            <Button variant="Secondary" className="flex items-center gap-x-2" onClick={handleAddToCart}>
                                <ShoppingCart className="w-4 h-4"/>Add To Cart
                            </Button>
                        </div>
                    </div>
                    <div className="mt-10">
                        <p className="text-xl leading-relaxed">{productData.longDescription}</p>
                    </div>
                    <div className="mt-10">
                        <h2 className="font-bold text-3xl">NOTE</h2>
                        <ul className="list-disc px-4 my-3 text-sm [&>li]:pl-2 [&>li]:mb-2">
                            <li>This product is to be used/stored according to Revtech's <NavLink to="/" className="text-blue-800 hover:underline">terms of service</NavLink> and in accordance with the respective product's usage requirements.</li>
                            <li>Product is to be delivered within 3 business days at most. Failing to do so will result in a complete dismissal of the shipping fee. Please review Revtech's <NavLink to="/" className="text-blue-800 hover:underline">privacy policy</NavLink> for more information.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}