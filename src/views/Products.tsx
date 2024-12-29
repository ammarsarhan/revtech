import React from "react"
import Card from "../components/Card"
import { ProductDisplayType } from "../utils/types/products"

const data: ProductDisplayType[] = [
    {
        id: "A3GE363",
        name: "M2 Macbook Air",
        vendor: "Apple",
        imageSource: "",
        price: 999,
        feature: "Top Pick",
        variantCount: 8
    },
    {
        id: "A3GE363",
        name: "Airpods Pro Max",
        vendor: "Apple",
        imageSource: "",
        price: 500,
        feature: "Hot!",
        variantCount: 3
    },
    {
        id: "A3GE363",
        name: "M2 Macbook Air",
        vendor: "Apple",
        imageSource: "",
        price: 999,
        feature: "Top Pick",
        variantCount: 3
    },
    {
        id: "A3GE363",
        name: "M2 Macbook Air",
        vendor: "Apple",
        imageSource: "",
        price: 999,
        feature: "Top Pick",
        variantCount: 3
    },
    {
        id: "A3GE363",
        name: "M2 Macbook Air",
        vendor: "Apple",
        imageSource: "",
        price: 999,
        feature: "Top Pick",
        variantCount: 3
    },
    {
        id: "A3GE363",
        name: "M2 Macbook Air",
        vendor: "Apple",
        imageSource: "",
        price: 999,
        feature: "Top Pick",
        variantCount: 3
    },
    {
        id: "A3GE363",
        name: "M2 Macbook Air",
        vendor: "Apple",
        imageSource: "",
        price: 999,
        feature: "Top Pick",
        variantCount: 3
    },
    {
        id: "A3GE363",
        name: "M2 Macbook Air",
        vendor: "Apple",
        imageSource: "",
        price: 999,
        feature: "Top Pick",
        variantCount: 3
    },
    {
        id: "A3GE363",
        name: "M2 Macbook Air",
        vendor: "Apple",
        imageSource: "",
        price: 999,
        feature: "Top Pick",
        variantCount: 3
    },
    {
        id: "A3GE363",
        name: "M2 Macbook Air",
        vendor: "Apple",
        imageSource: "",
        price: 999,
        feature: "Top Pick",
        variantCount: 3
    },
    {
        id: "A3GE363",
        name: "M2 Macbook Air",
        vendor: "Apple",
        imageSource: "",
        price: 999,
        feature: "Top Pick",
        variantCount: 3
    },
    {
        id: "A3GE363",
        name: "M2 Macbook Air",
        vendor: "Apple",
        imageSource: "",
        price: 999,
        feature: "Top Pick",
        variantCount: 3
    },
    {
        id: "A3GE363",
        name: "M2 Macbook Air",
        vendor: "Apple",
        imageSource: "",
        price: 999,
        feature: "Top Pick",
        variantCount: 3
    },
    {
        id: "A3GE363",
        name: "M2 Macbook Air",
        vendor: "Apple",
        imageSource: "",
        price: 999,
        feature: "Top Pick",
        variantCount: 3
    },
    {
        id: "A3GE363",
        name: "M2 Macbook Air",
        vendor: "Apple",
        imageSource: "",
        price: 999,
        feature: "Top Pick",
        variantCount: 3
    }
]

export default function Products () {
    return (
        <div className="mx-6 my-3">
            <h2 className="text-4xl font-semibold">Browse Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-6 sm:my-8">
                {
                    data.map((element, index) => {
                        if (index === 0 || index % 10 == 0) {
                            return (
                                <Card enlarged product={element}/>
                            )
                        }
                        
                        return (
                            <Card product={element}/>
                        )
                    })
                }
            </div>
        </div>
    )
}