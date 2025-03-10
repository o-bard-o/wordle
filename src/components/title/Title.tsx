import WordleBlack from "@/assets/Wordle-black.png";
import WordleWhite from "@/assets/Wordle-white.png";
import { useEffect, useState } from "react";

const Title = () => {
  const [isDarkMode, setIsDarkMode] = useState(
    window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => {
      setIsDarkMode(e.matches);
    };
    mediaQuery.addEventListener("change", handleChange);
    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  return (
    <img
      src={isDarkMode ? WordleWhite : WordleBlack}
      alt="Wordle"
      className="w-48"
    />
  );
};

export default Title;
