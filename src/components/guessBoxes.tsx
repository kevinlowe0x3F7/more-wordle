/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";

import { useStore } from "~/store/store";
import * as React from "react";
import clsx from "clsx";
import { shallow } from "zustand/shallow";

export const GuessBoxes: React.FC = () => {
  const {
    letters,
    guesses: currentGuesses,
    stagedGuess: currentStagedGuess,
    addToStagedGuess,
    removeLastStagedGuess,
    submitGuess,
  } = useStore((state) => {
    return {
      letters: state.letters,
      guesses: state.guesses,
      stagedGuess: state.stagedGuess,
      addToStagedGuess: state.addToStagedGuess,
      removeLastStagedGuess: state.removeLastStagedGuess,
      submitGuess: state.submitGuess,
    };
  }, shallow);
  const numGuesses = React.useMemo(() => Math.ceil(26 / letters), [letters]);

  React.useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.ctrlKey || e.metaKey || e.altKey || e.shiftKey) {
        return;
      }

      if (e.key === "Backspace") {
        removeLastStagedGuess();
      } else if (e.key === "Enter") {
        submitGuess();
      } else {
        addToStagedGuess(e.key);
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    // Don't forget to clean up
    return function cleanup() {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [addToStagedGuess, removeLastStagedGuess, submitGuess]);

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const boxes = [...Array(numGuesses)].flatMap((_, g) =>
    [...Array(letters)].map((_, i) => {
      const letter =
        g < currentGuesses.length
          ? currentGuesses[g]?.charAt(i)
          : g === currentGuesses.length
          ? currentStagedGuess.charAt(i)
          : undefined;
      return (
        <GuessBox
          key={`${g}:${i}`}
          letter={letter !== "" ? letter : undefined}
        />
      );
    })
  );
  const classNames = clsx("grid gap-1", getGridColClassName(letters));
  return <div className={classNames}>{boxes}</div>;
};

const GuessBox: React.FC<{ letter: string | undefined }> = ({ letter }) => {
  const classNames = clsx(
    "flex items-center justify-center h-10 w-10 sm:w-16 sm:h-16 border-2 text-3xl font-bold",
    { "border-gray-600": letter == null, "border-gray-200": letter != null }
  );
  return <div className={classNames}>{letter}</div>;
};

/**
 * Tailwind needs the whole classname to make sure the css is grabbed
 * https://tailwindcss.com/docs/content-configuration#dynamic-class-names
 */
function getGridColClassName(letters: number) {
  switch (letters) {
    case 3:
      return "grid-cols-3";
    case 4:
      return "grid-cols-4";
    case 5:
      return "grid-cols-5";
    case 6:
      return "grid-cols-6";
    case 7:
      return "grid-cols-7";
    case 8:
      return "grid-cols-8";
    default:
      return "";
  }
}
