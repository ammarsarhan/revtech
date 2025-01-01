import { useMemo } from "react"
import { Routes, Route, useLocation } from "react-router-dom"
import Navigation from './components/Navigation'

import Home from "./views/Home"
import Products from "./views/Products"
import Search from "./views/Search"
import Cart from "./views/Cart"
import Product from "./views/Product"
import Wishlist from "./views/Wishlist"
import Account from "./views/Account"
import SignUp from "./views/SignUp"
import SignIn from "./views/SignIn"

export default function App() {
  const location = useLocation();
  const unallowedRoutes = useMemo(() => ["/auth/sign-in", "/auth/sign-up"], []);

  return (
    <div className="app flex flex-col md:h-screen">
      {
        unallowedRoutes.includes(location.pathname) ? <></> : <Navigation/>
      }
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/products" element={<Products/>}/>
        <Route path="/search" element={<Search/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/wishlist" element={<Wishlist/>}/>
        <Route path="/product/:id" element={<Product/>}/>
        <Route path="/account" element={<Account/>}/>
        <Route path="/auth/sign-up" element={<SignUp/>}/>
        <Route path="/auth/sign-in" element={<SignIn/>}/>
      </Routes>
    </div>
  )
}
