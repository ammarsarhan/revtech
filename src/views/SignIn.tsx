import React, { useState, FormEvent } from "react";
import Button from "../components/Button";
import { NavLink, useNavigate } from "react-router-dom";
import { authenticateWithCredentials } from "../firebase/auth";
import { useAuthContext } from "../context/useAuthContext";

export default function SignIn () {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [pending, setPending] = useState(false);
    const [error, setError] = useState("");

    const navigate = useNavigate();
    const authContext = useAuthContext();

    const handleCreateAccount = (e: FormEvent) => {
        e.preventDefault();
        setPending(true);
        
        const signIn = async () => {
            try {
                const data = await authenticateWithCredentials(email, password);
                authContext.actions.setUser(data.user);
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
            } finally {
                setPending(false);
            }
        }

        signIn();

        setError("");
        setPending(false);
    }

    return (
        <form className="flex-center flex-col gap-y-8 h-screen px-4" onSubmit={handleCreateAccount}>
            <div className="w-full flex-center">
                <span className="px-4 text-red-600 absolute top-8 text-sm">{error}</span>
            </div>
            <div className="text-center">
                <h2 className="text-3xl md:text-4xl font-semibold mb-1">Sign in</h2>
                <span className="text-gray-500 text-[0.95rem]">Welcome back! Let's get you right back in the game.</span>
            </div>
            <div className="flex flex-col gap-y-6 w-full text-[0.95rem] px-8 md:max-w-[60vw] lg:max-w-[50vw]">
                <div className="w-full flex flex-col gap-y-2">
                    <span>Email Address</span>
                    <input value={email} onChange={e => setEmail(e.target.value)} type="email" className="w-full border-[1px] px-4 py-2 rounded-xl outline-emerald-900" placeholder="Email"/>
                </div>
                <div className="w-full flex flex-col gap-y-2">
                    <span>Password</span>
                    <input value={password} onChange={e => setPassword(e.target.value)} type="password" className="w-full border-[1px] px-4 py-2 rounded-xl outline-emerald-900" placeholder="Password"/>
                </div>
            </div>
            <div className="flex-center mt-4">
                <Button disabled={pending} variant="Secondary" className="px-20 py-4">Log In</Button>
            </div>
            <div className="flex-center w-full absolute bottom-8 text-sm px-4">
                <span className="text-center">Don't have an account? <NavLink to="/auth/sign-up" className="text-blue-700 hover:underline">Sign up</NavLink> and create one right away!</span>
            </div>
        </form>
    )
}