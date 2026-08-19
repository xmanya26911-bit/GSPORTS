"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="container-main min-h-[70vh] flex flex-col items-center justify-center text-center py-20">
      <h1 className="text-2xl md:text-3xl font-bold text-text mb-3">Something went wrong</h1>
      <p className="text-text-muted mb-8 max-w-md">
        An unexpected error occurred. Please try again.
      </p>
      <button
        onClick={reset}
        className="px-6 py-3 bg-accent text-white text-sm font-bold rounded-xl hover:bg-accent-dark transition-colors"
      >
        Try Again
      </button>
    </div>
  );
}