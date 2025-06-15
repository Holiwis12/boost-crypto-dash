
import { useAuth } from "@/hooks/useAuth";
import { BalanceCard } from "@/components/BalanceCard";
import { PrimaryCTA } from "@/components/PrimaryCTA";
import { Link } from "react-router-dom";
import { ReferralTree, ReferralNode } from "@/components/ReferralTree";

const Dashboard = () => {
  const { profile, loading, isApproved } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Cargando...</div>
      </div>
    );
  }

  if (!isApproved) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white rounded-xl shadow-xl p-10 text-center max-w-md">
          <h2 className="text-2xl font-bold text-secondary mb-4">Cuenta Pendiente</h2>
          <p className="text-gray-600 mb-6">
            Tu cuenta está pendiente de aprobación. Un administrador debe aprobar tu cuenta antes de que puedas acceder al panel de inversión.
          </p>
          <p className="text-sm text-gray-500">
            Por favor, espera a que se valide tu pago de inversión inicial.
          </p>
        </div>
      </div>
    );
  }

  // Mapa conceptual estático
  const referralData: ReferralNode = {
    nombre: profile?.email ?? "Usuario",
    children: [
      { nombre: "Ana Ruiz", children: [ { nombre: "Jacob Luna" }, { nombre: "Laura Lara" } ] },
      { nombre: "David Páez", children: [ { nombre: "Marta Soto" } ] },
      { nombre: "Daniel Pérez" },
    ]
  };

  return (
    <div className="w-full py-10 px-6 flex flex-col gap-8 animate-fade-in">
      <h1 className="text-3xl mb-2">Hola {profile.email}, tu balance actual es:</h1>
      <div className="flex flex-wrap gap-6">
        <BalanceCard balance={Number(profile.balance) || 0} roi={1.6} referidos={7} />
        <div className="bg-card rounded-lg p-6 flex flex-col justify-center shadow min-w-[200px]">
          <span className="text-sm font-medium uppercase text-secondary">Total Invertido:</span>
          <div className="text-xl font-bold text-white mt-2">$0</div>
        </div>
      </div>
      <div className="flex flex-wrap gap-5 mt-6">
        <Link to="/depositar"><PrimaryCTA>Reinvertir ganancias</PrimaryCTA></Link>
        <Link to="/retirar"><PrimaryCTA>Solicitar retiro</PrimaryCTA></Link>
        <Link to="/referidos"><PrimaryCTA>Ver mis referidos</PrimaryCTA></Link>
        <PrimaryCTA>Historial de inversión</PrimaryCTA>
      </div>
      <div className="mt-10">
        <ReferralTree root={referralData} />
      </div>
    </div>
  );
};

export default Dashboard;
