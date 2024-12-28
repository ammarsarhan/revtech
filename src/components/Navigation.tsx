import React from "react";
import { NavLink } from "react-router-dom";

import ProfileAvatar from "./ProfileAvatar";
import Button from "./Button";

import { ShoppingCart, Heart, Search } from "lucide-react";

export default function Navigation() {
    return (
        <nav className="flex items-center justify-between px-10 py-6 border-b-[1px] relative">
            <div className="flex items-center gap-x-3 flex-grow-0">
                <NavLink to="/products"><Button>Shop</Button></NavLink>
                <NavLink to="/about"><Button>About</Button></NavLink>
                <NavLink to="/contact"><Button>Contact</Button></NavLink>
            </div>
            <div className="absolute inset-0 flex-center -z-50">   
                <span className="text-2xl font-semibold">Revtech</span>
            </div>
            <div className="flex items-center gap-x-3 flex-grow-0">
                <ProfileAvatar />
                <NavLink to="/products">
                    <Button icon>
                        <Search className="w-4 h-4"/>
                    </Button>
                </NavLink>
                <NavLink to="/wishlist">
                    <Button icon>
                        <Heart className="w-4 h-4"/>
                    </Button>
                </NavLink>
                <NavLink to="/cart">
                    <Button icon>
                        <ShoppingCart className="w-4 h-4"/>
                    </Button>
                </NavLink>
            </div>
        </nav>
    )
}