import React from "react";
import { Link } from "react-router-dom";

export default function AdminProducts() {
  return (
    <div>
      <div className="flex justify-between mb-5">
        <h2 className="text-2xl font-bold">Products</h2>

        <Link
          to="/admin/products/add"
          className="bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          + Add Product
        </Link>
      </div>

      <div className="bg-white shadow rounded-xl p-4">
        <p>No products yet. Add a new product.</p>
      </div>
    </div>
  );
}
