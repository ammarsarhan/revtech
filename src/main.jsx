import { BrowserRouter } from "react-router-dom";
import { createRoot } from 'react-dom/client'
import { AuthContextProvider } from "./context/useAuthContext.tsx";
import { CartContextProvider } from "./context/useCartContext.tsx";

import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthContextProvider>
      <CartContextProvider>
        <App/>
      </CartContextProvider>
    </AuthContextProvider>
  </BrowserRouter>,
)
