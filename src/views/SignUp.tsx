import React, { FormEvent, useState } from "react"
import Button from "../components/Button";
import { NavLink, useNavigate } from "react-router-dom";
import { createAccountWithCredentials } from "../firebase/auth";

export default function SignUp () {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [secondaryPassword, setSecondaryPassword] = useState("");

    const [pending, setPending] = useState(false);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleCreateAccount = (e: FormEvent) => {
        e.preventDefault();
        setPending(true);

        if (!firstName || !lastName || !email || !password || !secondaryPassword) {
            setError("All fields are required.");
            setTimeout(() => {
                setError("")
                setPending(false);
            }, 3000);
            return;
        }

        if (password.length < 8) {
            setError("Password must be greater than 8 characters.");
            setTimeout(() => {
                setError("")
                setPending(false);
            }, 3000);
            return;  
        }
    
        if (password !== secondaryPassword) {
            setError("Passwords do not match.");
            setTimeout(() => {
                setError("")
                setPending(false);
            }, 3000);
            return;
        }
        
        const createAccountRequest = async () => {
            try {
                const name = `${firstName} ${lastName}`;
                const data = await createAccountWithCredentials(name, email, password);
                
                setError("");
                navigate("/");
            } catch (error: any) {
                const errorCode = error.code;
                const errorMessage = error.message;
        
                switch (errorCode) {
                    case "auth/email-already-in-use":
                        setError("This email is already in use. Please use a different email.");
                        break;
                    case "auth/invalid-email":
                        setError("The email address is not valid.");
                        break;
                    case "auth/weak-password":
                        setError("The password is too weak.");
                        break;
                    default:
                        setError(`An error occurred: ${errorMessage}`);
                }

                setTimeout(() => {
                    setError("")
                }, 3000);
            } finally {
                setPending(false);
            }
        }

        createAccountRequest();

        setError("");
        setPending(false);
    }

    return (
        <div className="flex flex-col h-screen">
            <div className="flex h-full mx-6 my-8 gap-x-8">
                <form className="flex-center flex-col gap-y-8 w-full lg:w-1/2" onSubmit={handleCreateAccount}>
                    <div className="w-full flex-center">
                        <span className="px-4 text-red-600 absolute top-8 text-sm">{error}</span>
                    </div>
                    <div className="text-center">
                        <h2 className="text-3xl md:text-4xl font-semibold mb-1">New here?</h2>
                        <span className="text-gray-500 text-[0.95rem]">Let's revolutionalize your technology shopping experience!</span>
                    </div>
                    <div className="flex flex-col gap-y-6 w-full text-[0.95rem] px-8">
                        <div className="flex w-full gap-x-4">
                            <div className="w-full flex flex-col gap-y-2">
                                <span>First Name</span>
                                <input value={firstName} onChange={e => setFirstName(e.target.value)} type="text" required className="w-full border-[1px] px-4 py-2 rounded-xl outline-emerald-900" placeholder="First"/>
                            </div>
                            <div className="w-full flex flex-col gap-y-2">
                                <span>Last Name</span>
                                <input value={lastName} onChange={e => setLastName(e.target.value)} type="text" required className="w-full border-[1px] px-4 py-2 rounded-xl outline-emerald-900" placeholder="Last"/>
                            </div>
                        </div>
                        <div className="w-full flex flex-col gap-y-2">
                            <span>Email Address</span>
                            <input value={email} onChange={e => setEmail(e.target.value)} type="email" required className="w-full border-[1px] px-4 py-2 rounded-xl outline-emerald-900" placeholder="Email"/>
                        </div>
                        <div className="flex-col sm:flex-row gap-y-6 flex w-full gap-x-4">
                            <div className="w-full flex flex-col gap-y-2">
                                <span>Password</span>
                                <input value={password} onChange={e => setPassword(e.target.value)} type="password" required className="w-full border-[1px] px-4 py-2 rounded-xl outline-emerald-900" placeholder="Password"/>
                            </div>
                            <div className="w-full flex flex-col gap-y-2">
                                <span>Repeat Password</span>
                                <input value={secondaryPassword} onChange={e => setSecondaryPassword(e.target.value)} required type="password" className="w-full border-[1px] px-4 py-2 rounded-xl outline-emerald-900" placeholder="Repeat"/>
                            </div>
                        </div>
                    </div>
                    <div className="flex-center w-full mt-8">
                        <Button variant="Secondary" className="w-full xs:w-fit xs:px-24 py-4" disabled={pending}>Create Account</Button>
                    </div>
                    <div className="flex-center w-full absolute bottom-8 text-sm">
                        <span className="text-center">Already have an account? <NavLink to="/auth/sign-in" className="text-blue-700 hover:underline">Sign in</NavLink> to your account.</span>
                    </div>
                </form>
                <div className="hidden lg:block w-1/2">
                    <div className="bg-black p-8 w-full h-full rounded-2xl">
                    </div>
                </div>
            </div>
        </div>
    )
}