import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx'; // **NOTE:** Ensure the file extension (.jsx) is correct
import './index.css'; // **CRITICAL:** Imports global styles
import { CartProvider } from './context/CartContext'; 
// **MISSING:** We need the router to handle navigation between pages

// The main file should import and wrap the App component with the Router.
// Since you have a complex file structure (pages, components, etc.), 
// you need React Router DOM.

// Assuming you need React Router DOM:
import { BrowserRouter } from 'react-router-dom'; 

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    {/* 1. WRAP THE APP WITH THE ROUTER */}
    <BrowserRouter> 
      {/* 2. WRAP THE APP WITH CONTEXT PROVIDERS */}
      <CartProvider>
        <App />
      </CartProvider>
    </BrowserRouter>
  </React.StrictMode>
);