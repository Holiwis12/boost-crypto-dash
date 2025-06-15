import { BalanceCard } from "@/components/BalanceCard";
import { PrimaryCTA } from "@/components/PrimaryCTA";
import { Link } from "react-router-dom";
import { ReferralTree, ReferralNode } from "@/components/ReferralTree";

const Dashboard = () => {
  // Demo data para mostrar la estructura
  const user = { nombre: "Usuario", balance: 3200, roi: 1.6, referidos: 7, invertido: 2500 };

  // Mapa conceptual fake de ejemplo (puedes ajustar la estructura después)
  const referralData: ReferralNode = {
    nombre: "Usuario",
    email: "usuario@mail.com",
    children: [
      {
        nombre: "Ana Ruiz",
        email: "ana@midominio.com",
        children: [
          { nombre: "Jacob Luna", email: "jacob@ejemplo.com" },
          { nombre: "Laura Lara", email: "laura@mail.com" },
        ],
      },
      {
        nombre: "David Páez",
        email: "david@correo.com",
        children: [
          { nombre: "Marta Soto", email: "marta@gmail.com" },
        ],
      },
      {
        nombre: "Daniel Pérez",
        email: "daniel@perez.com",
      },
    ],
  };

  return (
    <div className="w-full py-10 px-6 flex flex-col gap-8 animate-fade-in">
      <h1 className="text-3xl mb-2">Hola {user.nombre}, tu balance actual es:</h1>
      <div className="flex flex-wrap gap-6">
        <BalanceCard balance={user.balance} roi={user.roi} referidos={user.referidos} />
        {/* Nuevo: Mostrar inversión total */}
        <div className="bg-card rounded-lg p-6 flex flex-col justify-center shadow min-w-[200px]">
          <span className="text-sm font-medium uppercase text-secondary">Total Invertido:</span>
          <div className="text-xl font-bold text-white mt-2">${user.invertido.toLocaleString()}</div>
        </div>
      </div>
      <div className="flex flex-wrap gap-5 mt-6">
        <Link to="/depositar"><PrimaryCTA>Reinvertir ganancias</PrimaryCTA></Link>
        <Link to="/retirar"><PrimaryCTA>Solicitar retiro</PrimaryCTA></Link>
        <Link to="/referidos"><PrimaryCTA>Ver mis referidos</PrimaryCTA></Link>
        <PrimaryCTA>Historial de inversión</PrimaryCTA>
      </div>
      {/* Nuevo: Árbol de referidos */}
      <div className="mt-10">
        <ReferralTree root={referralData} />
      </div>
    </div>
  );
};

export default Dashboard;
