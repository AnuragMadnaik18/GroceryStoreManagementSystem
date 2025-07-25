import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

// If using Bootstrap
//import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-toastify/dist/ReactToastify.css'
import { CartProvider } from './store/CartContext';

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <CartProvider>
    <App />
    </CartProvider>
  </React.StrictMode>
  
)
