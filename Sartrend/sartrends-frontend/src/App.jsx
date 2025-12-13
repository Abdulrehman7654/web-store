import React from "react";
// We don't need BrowserRouter here anymore since it's in main.jsx
import { Routes, Route } from "react-router-dom"; 

// --- Component Imports ---
import Navbar from "./Components/Navbar.jsx";
import Hero from "./Components/Hero.jsx";
import AboutSection from "./Components/AboutSection.jsx";
import Testimonials from "./Components/Testimonials.jsx";
import Footersection from "./Components/Footersection.jsx";
import ContactSection from "./Components/ContactSection.jsx";

// --- Page Imports ---
import ProductListPage from "./pages/ProductListPage.jsx";
import ProductDetailPage from "./pages/ProductDetailPage.jsx";
import FragrancePage from "./pages/FragrancePage.jsx";
import CartPage from "./pages/CartPage.jsx";
import CheckoutPage from "./pages/CheckoutPage.jsx";
import ConfirmationPage from "./pages/ConfirmationPage.jsx";
import SearchResultsPage from "./pages/SearchResultsPage.jsx";
import DealsPage from "./pages/DealsPage.jsx";

// --- Admin Imports ---
import AdminLayout from "./admin/AdminLayout.jsx";
import AdminDashboard from "./admin/Products.jsx"; // Assuming Products.jsx is the dashboard
import AdminProducts from "./admin/Products.jsx";
import AddProduct from "./admin/ProductForm.jsx";
import Orders from "./admin/Orders.jsx";

// --- CSS Import Fix ---
import "./index.css";
// NOTE: If your site uses Tailwind CSS or global styles are inside 'App.css', 
// you may also need to import './App.css' here if index.css is only for basic resets.


// ------------------------------
// Layout Component (NEW: Wraps all common elements)
// ------------------------------
function MainLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footersection/>
    </div>
  );
}

// ------------------------------
// Home Page Component
// ------------------------------
function Home() {
  return (
    <main className="w-full">
      <Hero />
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <AboutSection />
        </div>
      </section>
      <section className="bg-white py-10">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <Testimonials />
        </div>
      </section>
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <ContactSection />
        </div>
      </section>
    </main>
  );
}

// ------------------------------
// Simple Static Pages
// ------------------------------

// (Keep Blog, Contact, Account, NotFound functions as they are)
function Blog() {
  return (
    <div className="min-h-[70vh] p-8 bg-white">
      <h2 className="text-2xl font-semibold">Blog</h2>
    </div>
  );
}

function Contact() {
  return (
    <div className="min-h-[70vh] bg-white py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <ContactSection />
      </div>
    </div>
  );
}

function Account() {
  return (
    <div className="min-h-[70vh] p-8 bg-white">
      <h2 className="text-2xl font-semibold">Account</h2>
    </div>
  );
}

function NotFound() {
  return (
    <div className="min-h-[70vh] p-8 bg-white">
      <h2 className="text-2xl font-semibold">404 — Page not found</h2>
    </div>
  );
}


// ------------------------------
// MAIN APP COMPONENT
// ------------------------------

export default function App() {
  // NOTE: BrowserRouter is now correctly placed in main.jsx
  return (
    <Routes>
      {/* 1. Main Layout Routes (Public) */}
      <Route path="/" element={<MainLayout><Home /></MainLayout>} />
      
      {/* Apply MainLayout to all public pages */}
      <Route path="/products" element={<MainLayout><ProductListPage /></MainLayout>} />
      <Route path="/products/:categorySlug" element={<MainLayout><ProductListPage /></MainLayout>} />
      <Route path="/fragrance" element={<MainLayout><FragrancePage /></MainLayout>} />
      <Route path="/deals" element={<MainLayout><DealsPage /></MainLayout>} />
      <Route path="/deals/:dealSlug" element={<MainLayout><DealsPage /></MainLayout>} />
      <Route path="/product/:productId" element={<MainLayout><ProductDetailPage /></MainLayout>} />
      <Route path="/search" element={<MainLayout><SearchResultsPage /></MainLayout>} />

      <Route path="/cart" element={<MainLayout><CartPage /></MainLayout>} />
      <Route path="/checkout" element={<MainLayout><CheckoutPage /></MainLayout>} />
      <Route path="/confirmation" element={<MainLayout><ConfirmationPage /></MainLayout>} />

      {/* Static Pages wrapped in MainLayout */}
      <Route path="/about" element={<MainLayout><Home /></MainLayout>} />
      <Route path="/blog" element={<MainLayout><Blog /></MainLayout>} />
      <Route path="/contact" element={<MainLayout><Contact /></MainLayout>} />
      <Route path="/account" element={<MainLayout><Account /></MainLayout>} />

      {/* 2. Admin Routes (AdminLayout handles its own Navbar/Sidebar) */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="products" element={<AdminProducts />} />
        <Route path="new-product" element={<AddProduct />} />
        <Route path="all-orders" element={<Orders />} />
      </Route>

      {/* 3. 404 Route */}
      <Route path="*" element={<MainLayout><NotFound /></MainLayout>} />
    </Routes>
  );
}