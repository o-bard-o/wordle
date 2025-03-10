import { cn } from "@/lib/utils";
import { type VariantProps } from "class-variance-authority";
import { buttonVariants } from "../ui/variants";

/**
 * @param char - the key to display on the button
 * @returns a button with the given key that calls the given function when clicked
 */
const KeyButton = ({
  char,
  onClick,
  variant,
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    char: string;
  }) => {
  return (
    <button className={cn(buttonVariants({ variant }))} onClick={onClick}>
      {char}
    </button>
  );
};

export default KeyButton;
