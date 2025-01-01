import React from "react"
import Button from "../components/Button";
import { NavLink } from "react-router-dom";

export default function SignUp () {
    return (
        <div className="flex flex-col h-screen">
            <div className="flex h-full mx-6 my-8 gap-x-8">
                <div className="flex-center flex-col gap-y-8 w-full md:w-1/2">
                    <div className="text-center">
                        <h2 className="text-3xl md:text-4xl font-semibold mb-1">New here?</h2>
                        <span className="text-gray-500 text-[0.95rem]">Let's revolutionalize your technology shopping experience!</span>
                    </div>
                    <div className="flex flex-col gap-y-6 w-full text-[0.95rem] px-8">
                        <div className="flex w-full gap-x-4">
                            <div className="w-full flex flex-col gap-y-2">
                                <span>First Name</span>
                                <input type="text" className="w-full border-[1px] px-4 py-2 rounded-xl outline-emerald-900" placeholder="First"/>
                            </div>
                            <div className="w-full flex flex-col gap-y-2">
                                <span>Last Name</span>
                                <input type="text" className="w-full border-[1px] px-4 py-2 rounded-xl outline-emerald-900" placeholder="Last"/>
                            </div>
                        </div>
                        <div className="w-full flex flex-col gap-y-2">
                            <span>Email Address</span>
                            <input type="email" className="w-full border-[1px] px-4 py-2 rounded-xl outline-emerald-900" placeholder="Email"/>
                        </div>
                        <div className="flex-col sm:flex-row gap-y-6 flex w-full gap-x-4">
                            <div className="w-full flex flex-col gap-y-2">
                                <span>Password</span>
                                <input type="password" className="w-full border-[1px] px-4 py-2 rounded-xl outline-emerald-900" placeholder="Password"/>
                            </div>
                            <div className="w-full flex flex-col gap-y-2">
                                <span>Repeat Password</span>
                                <input type="password" className="w-full border-[1px] px-4 py-2 rounded-xl outline-emerald-900" placeholder="Repeat"/>
                            </div>
                        </div>
                    </div>
                    <div className="flex-center mt-8">
                        <Button variant="Secondary" className="px-20 py-4">Create Account</Button>
                    </div>
                    <div className="flex-center w-full absolute bottom-8 text-sm">
                        <span className="text-center">Already have an account? <NavLink to="/auth/sign-in" className="text-blue-700 hover:underline">Sign in</NavLink> to your account.</span>
                    </div>
                </div>
                <div className="hidden md:block w-1/2">
                    <div className="bg-black p-8 w-full h-full rounded-2xl">
                    </div>
                </div>
            </div>
        </div>
    )
}