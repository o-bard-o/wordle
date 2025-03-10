import { Key } from "@/components/keyboard/KeyLayout";
import words from "@/lib/words.json";
import { useState } from "react";
import { toast } from "sonner";

const useGuess = (
  updateVariant: (
    char: string,
    variant: "default" | "correct" | "presence" | "absence"
  ) => void
) => {
  const _guessLayout: string[][] = Array.from({ length: 6 }, () =>
    Array(5).fill("")
  );

  const initialLayout = _guessLayout.map((row) =>
    row.map((char) => ({
      char,
      variant: "default",
    }))
  ) as Key[][];

  const [guessLayout, setGuessLayout] = useState<Key[][]>(initialLayout);
  const [, setCoord] = useState<[number, number]>([0, 0]);

  const targetWord = "SHOTS";

  const validateWord = (row: number) => {
    setGuessLayout((prev) => {
      const newLayout = prev.map((r) => [...r]);

      for (let i = 0; i < 5; i++) {
        const letter = prev[row][i].char;

        if (letter === targetWord[i]) {
          newLayout[row][i].variant = "correct";
        } else if (targetWord.includes(letter)) {
          newLayout[row][i].variant = "presence";
        } else {
          newLayout[row][i].variant = "absence";
        }
        updateVariant(letter, newLayout[row][i].variant);
      }
      return newLayout;
    });
  };

  const enterKey = (char: string) => {
    setCoord((prevCoord) => {
      const [row, col] = prevCoord;

      if (char === "⏎") {
        if (col === 5) {
          if (
            !words.includes(
              guessLayout[row]
                .map((r) => r.char)
                .join("")
                .toLowerCase()
            )
          ) {
            toast(
              `${guessLayout[row].map((r) => r.char).join("")}: Invalid word`
            );
            return [row, col];
          }
          validateWord(row);
          return [row + 1, 0];
        } else {
          toast("Please fill the word completely");
          return prevCoord;
        }
      } else if (char === "⌫") {
        if (col > 0) {
          setGuessLayout((prev) => {
            const newLayout = prev.map((r) => [...r]);
            newLayout[row][col - 1].char = "";
            return newLayout;
          });
          return [row, col - 1];
        }
      } else {
        if (col < 5) {
          setGuessLayout((prev) => {
            const newLayout = prev.map((r) => [...r]);
            newLayout[row][col].char = char;
            return newLayout;
          });
          return [row, col + 1];
        }
      }
      return prevCoord;
    });
  };

  return { guessLayout, enterKey };
};

export default useGuess;
