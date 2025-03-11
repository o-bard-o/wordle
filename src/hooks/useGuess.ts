import words from "@/lib/words.json";
import { Key, Variant } from "@/types";
import { useState } from "react";
import { toast } from "sonner";

/**
 *
 * @param updateVariant - the function to update the variant of the letter
 * @returns a hook that manages the state of the guessed word
 */
const useGuess = (
  updateVariant: (char: string, variant: Variant) => void,
  targetWord: string
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

  /**
   *
   * @param row - the row to validate
   * @returns the new layout with the correct, presence, and absence variants
   */
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

      if (targetWord === guessLayout[row].map((r) => r.char).join("")) {
        toast("You won!", {
          action: {
            label: "RETRY",
            onClick: () => window.location.reload(),
          },
        });
      }
      return newLayout;
    });
  };

  /**
   *
   * @param char - the key pressed
   * @returns the new coordinates of the cursor
   */
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
          if (row === 5) {
            toast("You lose!", {
              action: {
                label: "RETRY",
                onClick: () => window.location.reload(),
              },
            });
            return [row, col];
          }
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
