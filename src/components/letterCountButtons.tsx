"use client";

import clsx from "clsx";
import * as React from "react";

export const LetterCountButtons: React.FC = () => {
  const letterCounts = [3, 4, 5, 6, 7, 8];
  const [selectedCount, setSelectedCount] = React.useState(5);

  const handleGenerateClick = React.useCallback(
    () => console.log("generating wordle", selectedCount),
    [selectedCount]
  );
  return (
    <div className="flex flex-col">
      <span className="isolate mb-4 inline-flex rounded-md shadow-sm">
        {letterCounts.map((letters) => {
          const buttonClassNames = clsx(
            "relative first:rounded-l-md last:rounded-r-md inline-flex items-center border px-4 py-2 text-xl font-medium hover:dark:bg-gray-900",
            {
              "z-10 border-indigo-500 outline-none ring-1 ring-indigo-500":
                letters === selectedCount,
            },
            {
              "border-gray-300": letters !== selectedCount,
            }
          );
          return (
            <LetterCountButton
              key={letters}
              className={buttonClassNames}
              onLetterClick={setSelectedCount}
              letters={letters}
            />
          );
        })}
      </span>
      <GenerateWordleButton onClick={handleGenerateClick} />
    </div>
  );
};

const LetterCountButton: React.FC<{
  className?: string;
  onLetterClick: (letters: number) => void;
  letters: number;
}> = ({ className, onLetterClick, letters }) => {
  const handleClick = React.useCallback(
    () => onLetterClick(letters),
    [onLetterClick, letters]
  );
  return (
    <button
      type="button"
      className={className}
      key={letters}
      onClick={handleClick}
    >
      {letters}
    </button>
  );
};

const GenerateWordleButton: React.FC<{
  onClick: () => void;
}> = ({ onClick }) => {
  return (
    <button
      type="button"
      className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
      onClick={onClick}
    >
      Generate Wordle
    </button>
  );
};
