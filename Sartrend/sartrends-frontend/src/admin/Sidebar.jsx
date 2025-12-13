import React from "react";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const linkClass =
    "block px-5 py-3 rounded-md font-medium text-gray-700 hover:bg-blue-100 hover:text-blue-600";

  const activeClass =
    "block px-5 py-3 rounded-md font-semibold bg-blue-600 text-white";

  return (
    <aside className="w-60 bg-white shadow-md p-5">
      <h2 className="text-xl font-bold mb-6 text-gray-800">Admin Panel</h2>

      <nav className="space-y-2">
        <NavLink
          to="/admin"
          className={({ isActive }) => (isActive ? activeClass : linkClass)}
          end
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/admin/all-orders"
          className={({ isActive }) => (isActive ? activeClass : linkClass)}
        >
          Orders
        </NavLink>


        <NavLink
          to="/admin/new-product"
          className={({ isActive }) => (isActive ? activeClass : linkClass)}
        >
          Add Product
        </NavLink>
      </nav>
    </aside>
  );
}
