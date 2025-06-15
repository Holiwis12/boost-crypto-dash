
import { DollarSign } from "lucide-react";

interface BalanceCardProps {
  balance: number;
  roi: number;
  referidos: number;
}

export function BalanceCard({ balance, roi, referidos }: BalanceCardProps) {
  return (
    <div className="bg-card rounded-lg p-6 flex flex-col items-start gap-4 shadow animate-fade-in min-w-[260px]">
      <div className="flex items-center gap-2">
        <DollarSign className="text-secondary" size={28} />
        <span className="text-sm font-semibold uppercase text-secondary">Balance actual:</span>
      </div>
      <div className="text-3xl font-bold text-white">${balance.toLocaleString()}</div>
      <div className="flex gap-6 text-sm">
        <span className="text-success font-medium">ROI Diario: {roi.toFixed(2)}%</span>
        <span className="text-secondary font-medium">Referidos: {referidos}</span>
      </div>
    </div>
  );
}
