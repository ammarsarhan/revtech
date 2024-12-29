import React from "react"
import Card from "../components/Card"
import { products, ProductDisplayType } from "../utils/types/products"

export default function Products () {
    return (
        <div className="mx-6 my-3">
            <h2 className="text-4xl font-semibold">Browse Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-6 sm:my-8">
                {
                    products.map((element, index) => {
                        if (index === 0 || index % 10 == 0) {
                            return (
                                <Card enlarged product={element} key={index}/>
                            )
                        }
                        
                        return (
                            <Card product={element} key={index}/>
                        )
                    })
                }
            </div>
        </div>
    )
}