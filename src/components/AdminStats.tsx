
import React from "react";

interface AdminStatsProps {
  users: {
    gananciasActuales: number;
    retirado: number;
    invertido: number;
    ultima: string;
  }[];
}

function isActiveUser(ultima: string): boolean {
  // Considérase activo si tuvo actividad las últimas 24h (ajuste simple)
  const ultimaDate = new Date(ultima.replace(" ", "T"));
  const diff = Date.now() - ultimaDate.getTime();
  return diff < 24 * 60 * 60 * 1000; // 24h en ms
}

export function AdminStats({ users }: AdminStatsProps) {
  const totalInvertido = users.reduce((acc, u) => acc + u.invertido, 0);
  const totalRetirado = users.reduce((acc, u) => acc + u.retirado, 0);
  const activos = users.filter(u => isActiveUser(u.ultima)).length;
  const totalUsuarios = users.length;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-2">
      <div className="bg-background p-4 rounded-lg shadow flex flex-col items-center">
        <div className="text-xs text-muted-foreground mb-1">Usuarios activos</div>
        <div className="text-lg font-bold">{activos} / {totalUsuarios}</div>
      </div>
      <div className="bg-background p-4 rounded-lg shadow flex flex-col items-center">
        <div className="text-xs text-muted-foreground mb-1">Total invertido</div>
        <div className="text-lg font-bold text-primary">${totalInvertido}</div>
      </div>
      <div className="bg-background p-4 rounded-lg shadow flex flex-col items-center">
        <div className="text-xs text-muted-foreground mb-1">Total retirado</div>
        <div className="text-lg font-bold text-green-600">${totalRetirado}</div>
      </div>
      <div className="bg-background p-4 rounded-lg shadow flex flex-col items-center">
        <div className="text-xs text-muted-foreground mb-1">Promedio generado</div>
        <div className="text-lg font-bold">${Math.round(users.reduce((a,u)=>a+u.gananciasActuales,0)/(users.length||1))}</div>
      </div>
    </div>
  );
}
