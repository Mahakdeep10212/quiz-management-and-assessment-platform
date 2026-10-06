"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";

export default function StartQuizButton({ quizId }) {
  const [starting, setStarting] = useState(false);

  return (
    <form
      action={`/api/quizzes/${quizId}/start`}
      method="POST"
      onSubmit={() => setStarting(true)}
    >
      <button
        type="submit"
        disabled={starting}
        className="inline-flex items-center gap-2 px-8 py-4 border border-transparent text-lg font-bold rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all transform hover:-translate-y-1 disabled:transform-none cursor-pointer"
      >
        {starting ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Preparing Assessment Room...</span>
          </>
        ) : (
          <span>Start Quiz Now</span>
        )}
      </button>
    </form>
  );
}
