import { cn } from "@/lib/utils";
import { type VariantProps } from "class-variance-authority";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { guessVariants } from "../ui/variants";

const GuessDiv = ({
  char,
  variant,
}: React.ComponentProps<"button"> &
  VariantProps<typeof guessVariants> & {
    char: string;
  }) => {
  /**
   * @param char - the key to display on the button
   * @param variant - the variant of the button
   * @returns a button with the given key that calls the given function when clicked
   */
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    setFlipped((prev) => !prev);
  }, [variant]);
  return (
    <motion.div
      initial={{ rotateY: 0 }}
      animate={{ rotateY: flipped ? 180 : 0 }}
      transition={{ duration: 0.3 }}
      style={{
        perspective: 1000,
        transformStyle: "preserve-3d",
      }}
      onAnimationComplete={() => setFlipped(false)}
      className={cn(guessVariants({ variant }))}
    >
      {char}
    </motion.div>
  );
};

export default GuessDiv;
