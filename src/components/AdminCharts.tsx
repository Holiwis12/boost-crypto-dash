
import React from "react";
import {
  ChartContainer,
  ChartTooltip,
  ChartLegend,
} from "@/components/ui/chart";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
} from "recharts";

// Helpers para el demo
function getInvestedByDate(users: {invertido: number; ultima: string}[]) {
  // Agrupa por fecha (yyyy-mm-dd)
  const byDate: {[k:string]: number} = {};
  users.forEach(u => {
    const day = u.ultima.split(" ")[0];
    byDate[day] = (byDate[day] || 0) + u.invertido;
  });
  // Devuelve array ordenado de fechas: total invertido ese día
  return Object.entries(byDate).sort().map(([fecha, monto]) => ({ fecha, monto }));
}

function getWithdrawnByDate(users: {retirado: number; ultima: string}[]) {
  // Simula retiros dispersos por fecha
  const byDate: {[k:string]: number} = {};
  users.forEach(u => {
    const day = u.ultima.split(" ")[0];
    byDate[day] = (byDate[day] || 0) + u.retirado;
  });
  return Object.entries(byDate).sort().map(([fecha, monto]) => ({ fecha, monto }));
}

interface AdminChartsProps {
  users: {
    nombre: string;
    invertido: number;
    retirado: number;
    ultima: string;
  }[];
}

export function AdminCharts({ users }: AdminChartsProps) {
  const dataInvertido = getInvestedByDate(users);
  const dataRetirado = getWithdrawnByDate(users);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      <div className="bg-background p-4 rounded-lg shadow">
        <div className="font-semibold mb-2">Inversiones totales por fecha</div>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={dataInvertido}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="fecha" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="monto" stroke="#2563eb" name="Invertido"/>
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="bg-background p-4 rounded-lg shadow">
        <div className="font-semibold mb-2">Retiros totales por fecha</div>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={dataRetirado}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="fecha" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="monto" fill="#16a34a" name="Retirado"/>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
