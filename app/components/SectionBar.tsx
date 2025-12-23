"use client";

import { useRouter } from "next/navigation";

export default function SectionBar({
  title,
  showStartLearning = true,
}: {
  title: string;
  showStartLearning?: boolean;
}) {
  const router = useRouter();

  return (
    <div className="bg-gray-100 py-12 w-full">
      <div className="max-w-7xl mx-auto px-8 flex items-center justify-between">
        <h2 className="text-5xl">{title}</h2>
        <div className="flex gap-4">
          {showStartLearning && (
            <button
              onClick={() => router.push("/learning-experience")}
              className="bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition-colors"
            >
              Start Learning
            </button>
          )}
          <button
            onClick={() => router.push("/evaluation")}
            className="bg-gray-200 text-black px-8 py-3 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Take Quiz
          </button>
        </div>
      </div>
    </div>
  );
}