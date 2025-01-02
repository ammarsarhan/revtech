import React from "react";
import { LogOut, User } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useAuthContext } from "../context/useAuthContext";

interface ProfileAvatarProps {
    source?: string | null
}

export default function ProfileAvatar ({source = ""} : ProfileAvatarProps) {
    const authContext = useAuthContext();

    if (authContext.data.user) {
        return (
            <NavLink to="/auth/sign-out" className="ml-4 flex-center">
                <LogOut className="w-4 h-4"/>
            </NavLink>
        )
    }

    return (
        <NavLink to="/auth/sign-in" className="w-10 h-10 rounded-full border-[1px] flex-center">
            <User className="w-5 h-5"/>
        </NavLink>
    )
}