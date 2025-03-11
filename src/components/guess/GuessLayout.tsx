import { Key } from "@/types";
import { useLayoutEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import GuessDiv from "./GuessButton";

/**
 *
 * @param guessLayout - the layout of the guessed word
 * @returns a layout of the guessed word
 */
const GuessLayout = ({ guessLayout }: { guessLayout: Key[][] }) => {
  const [keys, setKeys] = useState([] as string[]);

  useLayoutEffect(
    () => setKeys(Array.from({ length: 36 }).map((_) => uuidv4())),
    []
  );

  return (
    <div className="space-y-2 my-16">
      {keys.length == 36 &&
        guessLayout.map((row, i) => (
          <div key={keys[i * 5]} className="flex justify-center space-x-2">
            {row.map((key, j) => (
              <GuessDiv
                key={keys[i * 5 + j + 1]}
                char={key.char}
                variant={key.variant}
              />
            ))}
          </div>
        ))}
    </div>
  );
};

export default GuessLayout;
