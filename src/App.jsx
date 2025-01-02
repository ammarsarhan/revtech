import { useEffect, useMemo } from "react"
import { Routes, Route, useLocation, useNavigate } from "react-router-dom"
import { useAuthContext } from "./context/useAuthContext"

import Navigation from './components/Navigation'

import Home from "./views/Home"
import Products from "./views/Products"
import Search from "./views/Search"
import Cart from "./views/Cart"
import Product from "./views/Product"
import Wishlist from "./views/Wishlist"
import SignUp from "./views/SignUp"
import SignIn from "./views/SignIn"
import SignOut from "./views/SignOut"

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const authContext = useAuthContext();

  const navigationRoutes = useMemo(() => ["/auth/sign-in", "/auth/sign-up"], []);
  const protectedRoutes = useMemo(() => ["/wishlist", "/account"], []);
  
  useEffect(() => {
    if (protectedRoutes.includes(location.pathname) && !authContext.data.user) {
      navigate("/auth/sign-in");
    }
  }, [authContext.data.user, protectedRoutes, location, navigate])

  return (
    <div className="app flex flex-col md:h-screen">
      {
        navigationRoutes.includes(location.pathname) ? <></> : <Navigation/>
      }
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/products" element={<Products/>}/>
        <Route path="/search" element={<Search/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/wishlist" element={<Wishlist/>}/>
        <Route path="/product/:id" element={<Product/>}/>
        <Route path="/auth/sign-out" element={<SignOut/>}/>
        <Route path="/auth/sign-up" element={<SignUp/>}/>
        <Route path="/auth/sign-in" element={<SignIn/>}/>
      </Routes>
    </div>
  )
}
