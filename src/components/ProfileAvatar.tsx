import React from "react";
import { User } from "lucide-react";
import { NavLink } from "react-router-dom";

interface ProfileAvatarProps {
    source?: string;
}

export default function ProfileAvatar ({source = ""} : ProfileAvatarProps) {
    if (source === "") {
        return (
            <div className="w-10 h-10 rounded-full overflow-hidden flex-center border-[1px]">
                <NavLink to="/auth/log-in">
                    <User className="w-5 h-5"/>
                </NavLink>
            </div>
        )
    }

    return (
        <div className="w-10 h-10 bg-black rounded-full overflow-hidden">
            <img src={source} alt="" className="w-full h-full object-contain"/>
        </div>
    )
}