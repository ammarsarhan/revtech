import { Routes, Route } from "react-router-dom"
import Navigation from './components/Navigation'

import Home from "./views/Home"
import Products from "./views/Products"
import Search from "./views/Search"
import Cart from "./views/Cart"
import Product from "./views/Product"
import Wishlist from "./views/Wishlist"

export default function App() {
  return (
    <div className="app flex flex-col md:h-screen">
      <Navigation/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/products" element={<Products/>}/>
        <Route path="/search" element={<Search/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/wishlist" element={<Wishlist/>}/>
        <Route path="/product/:id" element={<Product/>}/>
      </Routes>
    </div>
  )
}
