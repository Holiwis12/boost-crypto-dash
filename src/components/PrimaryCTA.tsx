
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
}
export function PrimaryCTA({ children, ...rest }: Props) {
  return (
    <button
      className="bg-secondary text-primary hover:bg-secondary/80 font-bold px-8 py-3 rounded-lg text-lg transition-colors shadow-md animate-fade-in my-2"
      {...rest}
    >
      {children}
    </button>
  );
}
