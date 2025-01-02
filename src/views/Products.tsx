import React, { useEffect, useState } from "react"
import { ProductDisplayType } from "../utils/types/products"
import { getProducts } from "../firebase/db"
import Card from "../components/Card"

export default function Products () {
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState<ProductDisplayType[]>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const data = await getProducts();
            setProducts(data);
        }

        fetchProducts();
        setLoading(false);
    }, [])

    return (
        <div className="mx-6 my-3">
            <h2 className="text-4xl font-semibold">Browse Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-6 sm:my-8">
                {
                    !loading &&
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