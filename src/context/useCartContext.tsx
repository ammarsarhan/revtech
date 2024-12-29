import React, { createContext, useContext, ReactNode, useState } from "react";

interface CartContextType {
    data: {
        
    },
    actions: {

    }
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

export function useNavigationContext() {
    const context = useContext(CartContext);

    if (context === undefined) {
        throw new Error("useCartContext must be initialized with a CartContext");
    }

    return context;
}

export function NavigationContextProvider ({children}: {children: ReactNode}) {
    return (
        <CartContext.Provider value={{
            data: {

            },
            actions: {

            }
        }}>
            {children}
        </CartContext.Provider>
    )
}