type Variant = "default" | "presence" | "absence" | "correct";

export type Key = {
  id?: number;
  char: string;
  variant: Variant;
};
