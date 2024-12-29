import React from "react";
import { NavLink } from "react-router-dom";

import ProfileAvatar from "./ProfileAvatar";
import Button from "./Button";

import { ShoppingCart, Heart, Search } from "lucide-react";

export default function Navigation() {
    return (
        <nav className="flex items-center justify-between px-10 py-6 relative flex-row-reverse lg:flex-row">
            <div className="items-center gap-x-3 flex-grow-0 z-10 hidden lg:flex">
                <NavLink to="/products"><Button>Shop</Button></NavLink>
                <NavLink to="/about"><Button>About</Button></NavLink>
                <NavLink to="/contact"><Button>Contact</Button></NavLink>
            </div>
            <div className="absolute inset-0 flex-center z-0">
                <NavLink to="/" className="z-20">
                    <span className="text-2xl font-semibold">Revtech</span>
                </NavLink>
            </div>
            <div className="flex items-center gap-x-3 flex-grow-0 z-10 w-full justify-between lg:w-auto lg:justify-normal">
                <NavLink to="/search">
                    <Button icon>
                        <Search className="w-4 h-4"/>
                    </Button>
                </NavLink>
                <div className="flex items-center gap-x-3">
                    <NavLink to="/wishlist" className="hidden sm:block">
                        <Button icon>
                            <Heart className="w-4 h-4"/>
                        </Button>
                    </NavLink>
                    <NavLink to="/cart" className="hidden sm:block">
                        <Button icon>
                            <ShoppingCart className="w-4 h-4"/>
                        </Button>
                    </NavLink>
                    <ProfileAvatar/>
                </div>
            </div>
        </nav>
    )
}