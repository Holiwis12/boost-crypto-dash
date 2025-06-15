
import { BalanceCard } from "@/components/BalanceCard";
import { PrimaryCTA } from "@/components/PrimaryCTA";
import { Link } from "react-router-dom";

const Dashboard = () => {
  // Demo data para mostrar la estructura
  const user = { nombre: "Usuario", balance: 3200, roi: 1.6, referidos: 7 };

  return (
    <div className="w-full py-10 px-6 flex flex-col gap-8 animate-fade-in">
      <h1 className="text-3xl mb-2">Hola {user.nombre}, tu balance actual es:</h1>
      <div className="flex flex-wrap gap-6">
        <BalanceCard balance={user.balance} roi={user.roi} referidos={user.referidos} />
      </div>
      <div className="flex flex-wrap gap-5 mt-6">
        <Link to="/depositar"><PrimaryCTA>Reinvertir ganancias</PrimaryCTA></Link>
        <Link to="/retirar"><PrimaryCTA>Solicitar retiro</PrimaryCTA></Link>
        <Link to="/referidos"><PrimaryCTA>Ver mis referidos</PrimaryCTA></Link>
        <PrimaryCTA>Historial de inversión</PrimaryCTA>
      </div>
    </div>
  );
};

export default Dashboard;
