import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ProductDisplayType } from "../utils/types/products";

import { NavLink } from "react-router-dom";

import { Heart, ShoppingCart } from "lucide-react";
import OptionGroup from "../components/OptionGroup";
import Button from '../components/Button';
import Review from "../components/Review";

import { useAuthContext } from "../context/useAuthContext";
import { useCartContext } from "../context/useCartContext";
import getCurrencyInEGP from '../utils/currency';
import getProductById, { createReview, getReviews } from "../firebase/db";
import { ReviewType } from "../utils/types/review";

export default function Product () {
    const { id } = useParams();
    const cartContext = useCartContext();
    const authContext = useAuthContext();

    const [loading, setLoading] = useState(true);

    const [reviews, setReviews] = useState<ReviewType[]>([]);
    const [productData, setProductData] = useState<ProductDisplayType | null>(null);
    const [activePrice, setActivePrice] = useState(0);
    const [selectedOptions, setSelectedOptions] = useState<number[]>([]);

    const [reviewRating, setReviewRating] = useState("");
    const [reviewDescription, setReviewDescription] = useState("");

    useEffect(() => {
        const fetchProductData = async () => {
            if (id) {
                const data = await getProductById(id);
                const reviews = await getReviews(id);

                if (data) {
                    setProductData(data);
                    setSelectedOptions(new Array(data.options.length).fill(0));
                    setActivePrice(data.price);
                }

                if (reviews) {
                    setReviews(reviews);
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

    const handleSubmitReview = () => {
        if (authContext.data.user && reviewRating && reviewDescription) {
            const review: ReviewType = {
                userId: authContext.data.user.uid,
                userName: authContext.data.user.displayName!,
                productId: id!,
                description: reviewDescription,
                rating: parseInt(reviewRating)
            }

            const placeReviewRequest = async () => {
                const data = await createReview(review);
                console.log("Review placed successfully", data);
            }
            
            placeReviewRequest();
            setReviewRating("");
            setReviewDescription("");
        }
    }

    if (!loading && productData)
    return (
        <div className="lg:grid grid-cols-2 h-[calc(100vh-7rem)]">
            <div className="h-full border-r-[1px] hidden lg:block">
                <img src={productData.imageSource} alt="" className="w-full h-full object-cover px-4"/>
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
                    <div className="mt-10">
                        <h2 className="font-medium text-xl">Reviews</h2>
                        {
                            authContext.data.user &&
                            <div className="flex flex-col gap-y-2 text-sm my-4">
                                <span>Leave a review</span>
                                <div className="flex items-center gap-x-4">
                                    <input value={reviewRating} onChange={e => {
                                        const data = e.target.value;
                                        if (data === "" || ["1", "2", "3", "4", "5"].includes(data)) {
                                            setReviewRating(data);
                                        }
                                    }} type="number" className="border-[1px] h-10 rounded-lg px-3 w-16" min={1} max={5}/>
                                    <input value={reviewDescription} onChange={e => setReviewDescription(e.target.value)} type="text" className="w-full flex-1 border-[1px] h-10 rounded-lg px-3" placeholder={`Type in a review as ${authContext.data.user.displayName?.split(" ")[0]}...`}/>
                                    <Button variant="Secondary" className="rounded-xl" onClick={handleSubmitReview}>Submit</Button>
                                </div>
                            </div>
                        }
                        {
                            reviews.map((review, index) => {
                                return <Review review={review} key={index}/>
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}