"use client";

import clsx from "clsx";
import * as React from "react";

export const LetterCountButtons: React.FC = () => {
  const letterCounts = [3, 4, 5, 6, 7, 8];
  const [selectedCount, setSelectedCount] = React.useState(5);

  return (
    <span className="isolate inline-flex rounded-md shadow-sm">
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
