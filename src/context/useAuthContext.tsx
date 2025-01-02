import { User, onAuthStateChanged } from "firebase/auth";
import React, { createContext, useContext, ReactNode, useEffect, useState, useMemo } from "react";
import { auth } from "../firebase/auth";

interface AuthContextType {
    data: {
        user: User | null;
        loading: boolean;
    };
    actions: {
        setUser: (user: User | null) => void;
    };
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuthContext() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuthContext must be used within an AuthContextProvider");
    }

    return context;
}

export function AuthContextProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });

        return () => unsubscribe(); // Cleanup subscription on unmount
    }, []);

    const value = useMemo(() => ({
        data: { user, loading },
        actions: { setUser }
    }), [user, loading]);

    return (
        !loading &&
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}
