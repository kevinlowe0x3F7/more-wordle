"use client";

import * as React from "react";
import { useStore } from "~/store/store";

export const GenerateWordleButton: React.FC = () => {
  const selectedLetters = useStore((state) => state.letters);
  const handleGenerateClick = React.useCallback(
    () => console.log("generating wordle", selectedLetters),
    [selectedLetters]
  );
  return (
    <button
      type="button"
      className="w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm first-letter:inline-flex hover:bg-indigo-700"
      onClick={handleGenerateClick}
    >
      Generate Wordle
    </button>
  );
};
