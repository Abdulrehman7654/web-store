"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import * as api from './productApi';

export default function ProductForm({ productId }) {
    console.log("ProductForm productId:", productId);
    const [formData, setFormData] = useState({
        email: "",
        name: "",
        category: "",
        rate: "",
        stock: "",
        description: "",
        imageurl: "",
        activecomponents: "",
        ingredients: "",
    });

    // ---------------------------------------------------
    // 1️⃣ Fetch product if editing (productId exists)
    // ---------------------------------------------------
    useEffect(() => {
        if (!productId) return; // no id → uploading new product

        const fetchProduct = async () => {
            try {
                // const res = await axios.get(`http://localhost:5000/api/product/${productId}`);
                const freshProductData = await api.getProductById(productId);

                if (freshProductData) {
                    const p = freshProductData;

                    setFormData({
                        email: p.email || "",
                        name: p.name || "",
                        category: p.category || "",
                        rate: p.rate || "",
                        stock: p.stock || "",
                        description: p.description || "",
                        imageurl: p.imageurl || "",
                        activecomponents: p.activecomponents || "",
                        ingredients: p.ingredients || "",
                    });
                }

            } catch (err) {
                console.error("Fetch error:", err);
                toast.error("Failed to load product data");
            }
        };

        fetchProduct();
    }, [productId]);

    // ---------------------------------------------------
    // 2️⃣ Handle input
    // ---------------------------------------------------
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // ---------------------------------------------------
    // 3️⃣ Submit (POST or PUT)
    // ---------------------------------------------------
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            let res;
            if (productId) {
                // UPDATE PRODUCT
                res = await axios.put(
                    `http://localhost:5000/api/product/${productId}`,
                    formData,
                    { headers: { "Content-Type": "application/json" } }
                );
            } else {
                // CREATE PRODUCT
                res = await axios.post(
                    "http://localhost:5000/api/productUpload",
                    formData,
                    { headers: { "Content-Type": "application/json" } }
                );
            }

            if (res.data.success) {
                toast.success(productId ? "Product updated!" : "Product uploaded!");

                if (!productId) {
                    // Reset only if new product
                    setFormData({
                        email: "",
                        name: "",
                        category: "",
                        rate: "",
                        stock: "",
                        description: "",
                        imageurl: "",
                        activecomponents: "",
                        ingredients: "",
                    });
                }
            }
        } catch (err) {
            console.error("Submit error:", err);
            toast.error(err.response?.data?.message || "Request failed");
        }
    };

    return (
        <div className="p-6 max-w-xl mx-auto bg-white shadow-md rounded-md mt-6">
            <Toaster position="top-right" />

            <h1 className="text-2xl font-semibold mb-4">
                {productId ? "Update Product" : "Upload Product"}
            </h1>

            <form onSubmit={handleSubmit} className="space-y-3">
                <input
                    type="email"
                    name="email"
                    placeholder="Admin Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                    required
                />

                <input type="text" name="name" placeholder="Product Name"
                    value={formData.name} onChange={handleChange}
                    className="w-full border p-2 rounded" />

                <input type="text" name="category" placeholder="Category"
                    value={formData.category} onChange={handleChange}
                    className="w-full border p-2 rounded" />

                <input type="number" name="rate" placeholder="Rate"
                    value={formData.rate} onChange={handleChange}
                    className="w-full border p-2 rounded" />

                <input type="number" name="stock" placeholder="Stock"
                    value={formData.stock} onChange={handleChange}
                    className="w-full border p-2 rounded" />

                <textarea name="description" placeholder="Description"
                    value={formData.description} onChange={handleChange}
                    className="w-full border p-2 rounded" />

                <input type="text" name="imageurl" placeholder="Image URL"
                    value={formData.imageurl} onChange={handleChange}
                    className="w-full border p-2 rounded" />

                <input type="text" name="activecomponents"
                    placeholder="Active Components"
                    value={formData.activecomponents}
                    onChange={handleChange}
                    className="w-full border p-2 rounded" />

                <input type="text" name="ingredients"
                    placeholder="Ingredients"
                    value={formData.ingredients}
                    onChange={handleChange}
                    className="w-full border p-2 rounded" />

                <button type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                    {productId ? "Update Product" : "Upload Product"}
                </button>
            </form>
        </div>
    );
}
