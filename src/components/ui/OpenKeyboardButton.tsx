import { useRef } from "react";
import { Button } from "./button";

const KeyboardButton = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleShowKeyboard = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className="absolute top-0 right-0 m-4 md:hidden">
      <input
        ref={inputRef}
        type="text"
        className="absolute opacity-0 w-0 h-0"
      />

      <Button onClick={handleShowKeyboard} className="text-lg bg-[#303030]">
        ⌨️
      </Button>
    </div>
  );
};

export default KeyboardButton;
