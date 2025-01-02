import React, { useEffect, useState, ChangeEvent } from "react"
import Card from "../components/Card";
import { SearchIcon } from "lucide-react"
import { products, ProductDisplayType } from '../utils/types/products';
import { getProducts } from "../firebase/db";

export default function Search () {
    const [products, setProducts] = useState<ProductDisplayType[]>([]);
    const [results, setResults] = useState<ProductDisplayType[]>(products);
    const [filtered, setFiltered] = useState<ProductDisplayType[]>(results)
    const [search, setSearch] = useState("");

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            const data = await getProducts();
            setProducts(data);
        }

        fetchProducts();
        setLoading(false);
    }, [])

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        const searchString = e.target.value.toLowerCase().replace(/ /g,'');
        setSearch(e.target.value);

        if (searchString === "") {
            setFiltered(results);
            return;
        }

        const filteredResults = results.filter(item => {
            const itemNameString = item.name.toLowerCase().replace(/ /g,'');
            const itemVendorString = item.vendor.toLowerCase().replace(/ /g,'');

            return itemNameString.includes(searchString) || itemVendorString.includes(searchString);
        });

        setFiltered([...filteredResults]);
    }

    if (!loading)
    return (
        <div className="mx-6 my-3">
            <h2 className="text-4xl font-semibold">Search</h2>
            <div className="my-4 sm:my-6">
                <div className="relative w-full border-[1px] p-6 lg:p-8 rounded-xl overflow-hidden">
                    <div className="h-full flex-center absolute top-0 left-5 z-10">
                        <SearchIcon className="w-4 h-4 lg:w-6 lg:h-6 text-gray-400"/>
                    </div>
                    <input value={search} onChange={handleSearchChange} type="text" className="w-full h-full outline-none absolute top-0 left-0 px-12 lg:px-14 lg:text-lg"/>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-6 sm:my-8">
                    {
                        filtered.map((element, index) => {                            
                            return (
                                <Card product={element} key={index}/>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}