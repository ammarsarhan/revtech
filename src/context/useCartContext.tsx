import React, { createContext, useContext, ReactNode, useState } from "react";
import { CartItemType } from '../utils/types/cart'
import areArraysEqual from '../utils/array'

interface CartContextType {
    data: {
        cartItems: CartItemType[]
    },
    actions: {
        addItem: (cartItem: CartItemType) => void,
        setCartItems: (cartItems: CartItemType[]) => void,
        incrementQuantity: (cartItem: CartItemType) => void,
        decrementQuantity: (cartItem: CartItemType) => void
    }
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

export function useCartContext() {
    const context = useContext(CartContext);

    if (context === undefined) {
        throw new Error("useCartContext must be initialized with a CartContext");
    }

    return context;
}

export function CartContextProvider ({children}: {children: ReactNode}) {
    const [cartItems, setCartItems] = useState<CartItemType[]>([]);

    const addItem = (cartItem: CartItemType) => {
        setCartItems(prev => [...prev, cartItem]);
    };

    const removeItem = (cartItem: CartItemType) => {

    };

    const decrementQuantity = (cartItem: CartItemType) => {

    };

    const incrementQuantity = (cartItem: CartItemType) => {

    };    

    return (
        <CartContext.Provider value={{
            data: {
                cartItems
            },
            actions: {
                addItem,
                setCartItems,
                incrementQuantity,
                decrementQuantity
            }
        }}>
            {children}
        </CartContext.Provider>
    )
}