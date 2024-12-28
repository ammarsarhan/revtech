import { Routes, Route } from "react-router-dom"
import Home from "./views/Home"

export default function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Home/>} />
      </Routes>
    </div>
  )
}
