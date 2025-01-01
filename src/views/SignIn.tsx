import React from "react";
import Button from "../components/Button";
import { NavLink } from "react-router-dom";

export default function SignIn () {
    return (
        <div className="flex-center flex-col gap-y-8 h-screen px-4">
            <div className="text-center">
                <h2 className="text-3xl md:text-4xl font-semibold mb-1">Sign in</h2>
                <span className="text-gray-500 text-[0.95rem]">Welcome back! Let's get you right back in the game.</span>
            </div>
            <div className="flex flex-col gap-y-6 w-full text-[0.95rem] px-8 md:max-w-[60vw] lg:max-w-[50vw]">
                <div className="w-full flex flex-col gap-y-2">
                    <span>Email Address</span>
                    <input type="email" className="w-full border-[1px] px-4 py-2 rounded-xl outline-emerald-900" placeholder="Email"/>
                </div>
                <div className="w-full flex flex-col gap-y-2">
                    <span>Password</span>
                    <input type="password" className="w-full border-[1px] px-4 py-2 rounded-xl outline-emerald-900" placeholder="Password"/>
                </div>
            </div>
            <div className="flex-center mt-4">
                <Button variant="Secondary" className="px-20 py-4">Log In</Button>
            </div>
            <div className="flex-center w-full absolute bottom-8 text-sm px-4">
                <span className="text-center">Don't have an account? <NavLink to="/auth/sign-up" className="text-blue-700 hover:underline">Sign up</NavLink> and create one right away!</span>
            </div>
        </div>
    )
}