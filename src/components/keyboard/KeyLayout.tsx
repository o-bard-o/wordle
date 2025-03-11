import { Key, Variant } from "@/types";
import KeyButton from "./KeyButton";

const _layout = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["⏎", "Z", "X", "C", "V", "B", "N", "M", "⌫"],
];

const layout: Key[][] = _layout.map((row, i) => {
  return row.map((char, j) => ({ char, variant: "default", id: i * 10 + j }));
});

/**
 * @param letterState - the state of the letters in the word
 * @param enterKey - the function to call when a key is pressed
 * @returns a layout of the keyboard
 */
const KeyLayout = ({
  letterState,
  enterKey,
}: {
  letterState: Record<string, Variant>;
  enterKey: (char: string) => void;
}) => {
  const handleClick = (char: string) => {
    enterKey(char);
  };

  return (
    <div className="space-y-2">
      {layout.map((row, i) => (
        <div key={i} className="flex justify-center space-x-2">
          {row.map((key) => {
            return (
              <KeyButton
                key={key.id}
                char={key.char}
                onClick={() => handleClick(key.char)}
                variant={letterState[key.char] ?? "default"}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default KeyLayout;
