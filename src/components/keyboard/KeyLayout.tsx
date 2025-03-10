import KeyButton from "./KeyButton";

const _layout = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["⏎", "Z", "X", "C", "V", "B", "N", "M", "⌫"],
];

export type Key = {
  id?: number;
  char: string;
  variant: "default" | "presence" | "absence" | "correct";
  size?: "lg" | "xl";
};

const layout: Key[][] = _layout.map((row, i) => {
  return row.map((char, j) => ({ char, variant: "default", id: i * 10 + j }));
});

const KeyLayout = ({
  letterState,
  enterKey,
}: {
  letterState: Record<string, "default" | "correct" | "presence" | "absence">;
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
