import { Routes, Route } from "react-router-dom"
import Navigation from './components/Navigation'
import Home from "./views/Home"

export default function App() {
  return (
    <div className="app">
      <Navigation/>
      <Routes>
        <Route path="/" element={<Home/>}/>
      </Routes>
    </div>
  )
}
