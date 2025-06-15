
import { ReactNode, ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
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
