"use client";

import { useState } from "react";
import { readData } from "@/firebase/db";

const categories = [
  "Animals",
  "Control_Animals",
  "Control_Famous",
  "Control_Geo",
  "Control_History",
  "Control_Human",
  "Famous",
  "Geo",
  "History",
  "Human"
];

export default function TestPage() {
  const [categoryData, setCategoryData] = useState<Record<string, any>>({});

  // Fetch all categories at once
  const handleReadAll = async () => {
    const data: Record<string, any> = {};
    for (const cat of categories) {
      const res = await readData(cat);
      data[cat] = res ?? "No data";
    }
    setCategoryData(data);
  };

  // Fetch single category
  const handleReadCategory = async (cat: string) => {
    const res = await readData(cat);
    setCategoryData((prev) => ({
      ...prev,
      [cat]: res ?? "No data"
    }));
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">Firebase Test</h1>

      <div className="mb-6 flex flex-wrap gap-3 justify-center">
        <button
          onClick={handleReadAll}
          className="bg-purple-600 text-white px-5 py-2 rounded hover:bg-purple-700 transition"
        >
          Read All Categories
        </button>

        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => handleReadCategory(cat)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {Object.keys(categoryData).map((key) => (
          <div
            key={key}
            className="bg-white p-4 rounded shadow hover:shadow-md transition"
          >
            <h2 className="font-semibold mb-2">{key}</h2>
            <pre className="text-sm text-gray-800 bg-gray-100 p-2 rounded overflow-x-auto">
              {JSON.stringify(categoryData[key], null, 2)}
            </pre>

          </div>
        ))}
      </div>
    </div>
  );
}
