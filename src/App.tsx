import { useEffect } from "react";
import GuessLayout from "./components/guess/GuessLayout";
import KeyLayout from "./components/keyboard/KeyLayout";
import { SplashDialog } from "./components/splash/splash";
import Title from "./components/title/Title";
import { Toaster } from "./components/ui/sonner";
import useGuess from "./hooks/useGuess";
import useLetterState from "./hooks/useLetterState";

/**
 * The main component of the game
 */
const App = () => {
  const { letterState, updateLetter } = useLetterState();
  const { guessLayout, enterKey } = useGuess(updateLetter);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const char = e.key.toUpperCase();
      if (char === "ENTER") {
        enterKey("⏎");
      } else if (char === "BACKSPACE") {
        enterKey("⌫");
      } else if (/^[A-Z]$/.test(char)) {
        enterKey(char);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  return (
    <>
      <SplashDialog />
      <div className="flex flex-col items-center space-y-4 justify-center h-screen w-screen bg-[#ece8e2] dark:bg-[#1B1918] text-[#303030]">
        <Title />
        <GuessLayout guessLayout={guessLayout} />
        <KeyLayout letterState={letterState} enterKey={enterKey} />
      </div>
      <Toaster visibleToasts={1} />
    </>
  );
};

export default App;
