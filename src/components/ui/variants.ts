import { cva } from "class-variance-authority";

/**
 * Variants for the buttons in the game
 */
const buttonVariants = cva(
  "inline-flex items-center justify-center hover:bg-[#000]/10 dark:hover:bg-[#fff]/20 font-light w-6 h-8 text-sm font-bold",
  {
    variants: {
      variant: {
        default: "text-[#303030] dark:text-[#FFFFFF]",
        correct: "text-[#E45000]",
        presence: "text-[#303030] dark:text-[#FFFFFF]",
        absence: "text-[#8B8D80]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

/**
 * Variants for the guesses in the game
 */
const guessVariants = cva(
  "inline-flex items-center justify-center hover:bg-[#000]/10 dark:hover:bg-[#fff]/20 w-12 h-12 text-lg rounded-full text-white dark:text-[#1B1918] font-bold",
  {
    variants: {
      variant: {
        default: "bg-[#303030] dark:bg-[#FFFFFF]",
        correct: "bg-[#E45000]",
        presence: "bg-[#8B8D80]",
        absence: "bg-[#303030] dark:bg-[#FFFFFF]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);
export { buttonVariants, guessVariants };
