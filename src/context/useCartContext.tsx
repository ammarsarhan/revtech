import React, { createContext, useContext, ReactNode, useState } from "react";
import { CartItemType } from '../utils/types/cart'

interface CartContextType {
    data: {
        cartItems: CartItemType[]
    },
    actions: {
        setCartItems: (cartItems: CartItemType[]) => void,
        incrementQuantity: (itemId?: string, itemOptions?: number[], itemIndex?: number) => void,
        decrementQuantity: (itemId?: string, itemOptions?: number[], itemIndex?: number) => void
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

    const decrementQuantity = (itemId?: string, itemOptions?: number[], itemIndex?: number) => {
        const newCart = cartItems;

        if (itemId && !itemOptions) {
            console.log("Specify attribute options with item id.")
            return;
        }

        if (!itemId && itemOptions) {
            console.log("Specify item id with attribute options.")
            return;
        }

        if (itemId && itemOptions) {
            let targetIndex = newCart.findIndex(item => {
                item.product.id === itemId && 
                item.productOptions === itemOptions
            })

            if (!targetIndex) {
                console.log("Could not find cart item.")
                return;
            }

            newCart[targetIndex].quantity - 1
            
            if (newCart[targetIndex].quantity <= 0) {
                newCart.splice(targetIndex, 1);
            }

            setCartItems([...newCart]);
            return;
        }

        if (itemIndex) {
            newCart[itemIndex].quantity - 1

            if (newCart[itemIndex].quantity <= 0) {
                newCart.splice(itemIndex, 1);
            }

            setCartItems([...newCart])
            return;
        }
    }

    const incrementQuantity = (itemId?: string, itemOptions?: number[], itemIndex?: number) => {
        const newCart = cartItems;

        if (itemId && !itemOptions) {
            console.log("Specify attribute options with item id.")
            return;
        }

        if (!itemId && itemOptions) {
            console.log("Specify item id with attribute options.")
            return;
        }

        if (itemId && itemOptions) {
            let targetIndex = newCart.findIndex(item => {
                item.product.id === itemId && 
                item.productOptions === itemOptions
            })

            if (!targetIndex) {
                console.log("Could not find cart item.")
                return;
            }

            newCart[targetIndex].quantity + 1
            setCartItems([...newCart]);
            return;
        }

        if (itemIndex) {
            newCart[itemIndex].quantity + 1;    
            setCartItems([...newCart])
            return;
        }
    }

    return (
        <CartContext.Provider value={{
            data: {
                cartItems
            },
            actions: {
                setCartItems,
                incrementQuantity,
                decrementQuantity
            }
        }}>
            {children}
        </CartContext.Provider>
    )
}