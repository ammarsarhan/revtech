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

    const doesItemExist = (item: CartItemType) => {
        const itemId = item.product.id;
        const itemOptions = item.productOptions;
    
        return cartItems.findIndex(
            element =>
                element.product.id === itemId &&
                areArraysEqual(element.productOptions, itemOptions)
        );
    }

    const addItem = (cartItem: CartItemType) => {
        const itemIndex = doesItemExist(cartItem);
    
        if (itemIndex !== -1) {
            incrementQuantity(cartItems[itemIndex]);
        } else {
            setCartItems(prev => [...prev, { ...cartItem, quantity: 1 }]);
        }
    };

    const removeItem = (cartItem: CartItemType) => {
        setCartItems(prevCartItems =>
            prevCartItems.filter(
                item =>
                    item.product.id !== cartItem.product.id ||
                    !areArraysEqual(item.productOptions, cartItem.productOptions)
            )
        );
    };

    const decrementQuantity = (cartItem: CartItemType) => {
        setCartItems(prevCartItems =>
            prevCartItems
                .map(item =>
                    item.product.id === cartItem.product.id &&
                    areArraysEqual(item.productOptions, cartItem.productOptions)
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                )
                .filter(item => item.quantity > 0)
        );
    };

    const incrementQuantity = (cartItem: CartItemType) => {
        setCartItems(prevCartItems =>
            prevCartItems.map(item =>
                item.product.id === cartItem.product.id &&
                areArraysEqual(item.productOptions, cartItem.productOptions)
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            )
        );
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