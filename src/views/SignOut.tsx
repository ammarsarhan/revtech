import React, { useEffect, useState } from "react";
import { deauthenticateUser } from "../firebase/auth";
import { useAuthContext } from "../context/useAuthContext";
import { useNavigate } from "react-router-dom";

export default function SignOut () {
    const authContext = useAuthContext();
    const navigate = useNavigate();

    useEffect(() => {
        const signOutRequest = async () => {
            try {
                await deauthenticateUser();
                authContext.actions.setUser(null);
                setError("");
                navigate("/");
            } catch (error: any) {
                const errorCode = error.code;
                const errorMessage = error.message;
        
                switch (errorCode) {
                    case "auth/user-not-found":
                        setError("No account found with this email address.");
                        break;
                    case "auth/invalid-credential":
                        setError("Incorrect email or password. Please try again.");
                        break;
                    case "auth/wrong-password":
                        setError("Incorrect password. Please try again.");
                        break;
                    case "auth/invalid-email":
                        setError("The email address is not valid.");
                        break;
                    case "auth/too-many-requests":
                        setError("Too many unsuccessful login attempts. Please try again later.");
                        break;
                    default:
                        setError(`An unexpected error occurred. Please try again. ${errorMessage}`);
                }

                setTimeout(() => {
                    setError("")
                }, 3000);
            }
        }

        signOutRequest();
    }, [])

    const [error, setError] = useState("");

    return (
        <div className="flex-center h-screen">
            <span className="text-red-600 text-sm">{error}</span>
        </div>
    )
}