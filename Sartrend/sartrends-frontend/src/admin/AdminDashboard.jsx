import React from "react";

export default function AdminDashboard() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-5">Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1 */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-lg font-semibold">Total Sales</h3>
          <p className="text-2xl font-bold mt-2">$1,245</p>
        </div>

        {/* Card 2 */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-lg font-semibold">Total Orders</h3>
          <p className="text-2xl font-bold mt-2">87</p>
        </div>

        {/* Card 3 */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-lg font-semibold">Total Products</h3>
          <p className="text-2xl font-bold mt-2">45</p>
        </div>
      </div>
    </div>
  );
}
