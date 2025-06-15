
import { ReactNode } from "react";

interface Props {
  icon: ReactNode;
  title: string;
  description: string;
}

export function BenefitCard({ icon, title, description }: Props) {
  return (
    <div className="bg-card rounded-lg p-6 flex flex-col items-start gap-3 shadow hover:scale-105 transition-transform animate-fade-in max-w-[330px]">
      <div className="text-secondary">{icon}</div>
      <div className="font-semibold text-lg text-white">{title}</div>
      <div className="text-sm text-white/80">{description}</div>
    </div>
  );
}
