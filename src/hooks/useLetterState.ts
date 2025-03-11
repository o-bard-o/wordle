import { Variant } from "@/types";
import { useState } from "react";

/**
 * @returns a hook that manages the state of the letters in the word
 */
const useLetterState = () => {
  const [letterState, setLetterState] = useState<Record<string, Variant>>(
    Object.fromEntries(
      Array.from({ length: 26 }, (_, i) => [
        String.fromCharCode(65 + i),
        "default",
      ])
    )
  );

  /**
   * @param letter - the letter to update
   * @param newValue - the new value of the
   */
  const updateLetter = (letter: string, newValue: Variant) => {
    setLetterState((prev) => {
      if (prev[letter] === "correct") return prev;
      return {
        ...prev,
        [letter]: newValue,
      };
    });
  };

  return { letterState, updateLetter };
};

export default useLetterState;
