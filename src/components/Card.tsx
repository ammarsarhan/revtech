import React from 'react';
import Button from './Button';
import { ProductDisplayType } from '../utils/types/products';
import getCurrencyInEGP from '../utils/currency';
import { NavLink } from 'react-router-dom';
import { Heart, ShoppingCart } from 'lucide-react';
import { CartItemType } from '../utils/types/cart';
import { useCartContext } from '../context/useCartContext';

interface CardProps {
    product: ProductDisplayType
    enlarged?: boolean
}

export default function Card ({product, enlarged = false} : CardProps) {
    const cartContext = useCartContext();
    const productLink = `/product/${product.id.toLowerCase()}`;

    const handleQuickAdd = () => {
        const cartItem: CartItemType = {
            product: product,
            productOptions: new Array(product.options.length).fill(0),
            price: product.price,
            quantity: 1
        }

        cartContext.actions.addItem(cartItem);
    }

    if (enlarged) {
        return (
            <NavLink to={productLink} className="block col-span-1 row-span-1 h-[75vw] sm:col-span-2 sm:row-span-2 md:h-[65vw] lgmd:h-[60vw] lg:h-full rounded-2xl relative overflow-hidden bg-gray-100 hover:bg-gray-200 transition-colors">
                <div className='w-full h-full relative z-10'>
                    <div className='absolute top-5 left-5 bg-white px-2 py-1 w-fit rounded-md flex-center'>
                        <span className='text-xs font-semibold'>{product.feature}</span>
                    </div>
                    <span className='absolute top-5 right-5 text-sm font-medium text-gray-800'>{product.variantCount} Options</span>
                    <div className='flex flex-col absolute bottom-5 left-5 gap-y-1'>
                        <span className='font-medium sm:text-lg'>{product.name}</span>
                        <span className='font-normal sm:text-xl'>{product.vendor}</span>
                        <span className='text-lg sm:text-3xl font-semibold'>{getCurrencyInEGP(product.price)}</span>
                    </div>
                    <div className='flex items-center gap-x-2 sm:gap-x-4 absolute bottom-5 right-5'>
                        <Button icon onClick={handleQuickAdd}><ShoppingCart className='w-4 h-4'/></Button>
                        <Button icon><Heart className='w-4 h-4'/></Button>
                    </div>
                </div>
                <div className='absolute w-full h-full top-0 left-0 bg-gradient-to-t from-emerald-400 to-50% to-transparent z-0 opacity-35 hidden sm:block'></div>
            </NavLink>
        )
    }

    return (
        <NavLink to={productLink} className="block col-span-1 row-span-1 h-[75vw] sm:h-[60vw] md:h-[55vw] lgmd:h-[50vw] lg:h-[25vw] w-full rounded-2xl bg-gray-100 hover:bg-gray-200 transition-colors">
            <div className='w-full h-full relative'>
                <div className='absolute top-5 left-5 bg-white px-2 py-1 w-fit rounded-md flex-center'>
                    <span className='text-xs font-semibold'>{product.feature}</span>
                </div>
                <span className='absolute top-5 right-5 text-sm font-medium text-gray-800'>{product.variantCount} Options</span>
                <div className='flex flex-col absolute bottom-5 left-5'>
                    <span className='font-medium'>{product.name}</span>
                    <span className='font-normal'>{product.vendor}</span>
                    <span className='text-lg font-semibold'>{getCurrencyInEGP(product.price)}</span>
                </div>
                <div className='flex items-center gap-x-2 absolute bottom-5 right-5'>
                    <Button icon onClick={handleQuickAdd}><ShoppingCart className='w-4 h-4'/></Button>
                    <Button icon><Heart className='w-4 h-4'/></Button>
                </div>
            </div>
        </NavLink>
    )
}