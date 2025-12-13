import React from "react";

export default function Header() {
  return (
    <header className="bg-white shadow-sm p-4 flex justify-between items-center">
      <h1 className="text-xl font-semibold text-gray-800">
        SarTrends Admin Dashboard
      </h1>

      <div className="flex items-center space-x-4">
        <span className="text-gray-600">Admin</span>
        <img
          // src="https://i.pravatar.cc/40"
          // alt="avatar"
          className="w-10 h-10 rounded-full border"
        />
      </div>
    </header>
  );
}
