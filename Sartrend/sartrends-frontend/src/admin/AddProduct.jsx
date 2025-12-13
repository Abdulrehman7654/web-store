import React, { useState } from "react";

export default function AddProduct() {
  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    image: "",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    alert("Product Added Successfully!");
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-5">Add New Product</h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow p-6 rounded-xl space-y-4"
      >
        <input
          name="name"
          placeholder="Product Name"
          onChange={handleChange}
          className="w-full p-3 border rounded-md"
        />

        <input
          name="price"
          placeholder="Price"
          onChange={handleChange}
          className="w-full p-3 border rounded-md"
        />

        <input
          name="category"
          placeholder="Category"
          onChange={handleChange}
          className="w-full p-3 border rounded-md"
        />

        <input
          name="image"
          placeholder="Image URL"
          onChange={handleChange}
          className="w-full p-3 border rounded-md"
        />

        <button className="bg-blue-600 text-white px-4 py-2 rounded-md">
          Add Product
        </button>
      </form>
    </div>
  );
}
