import { useState } from "react";

const useLetterState = () => {
  const [letterState, setLetterState] = useState<
    Record<string, "default" | "correct" | "presence" | "absence">
  >(
    Object.fromEntries(
      Array.from({ length: 26 }, (_, i) => [
        String.fromCharCode(65 + i),
        "default",
      ])
    )
  );

  const updateLetter = (
    letter: string,
    newValue: "default" | "correct" | "presence" | "absence"
  ) => {
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
