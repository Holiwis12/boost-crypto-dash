
import { useEffect, useState } from "react";
import { BalanceCard } from "@/components/BalanceCard";
import { PrimaryCTA } from "@/components/PrimaryCTA";
import { Link, useNavigate } from "react-router-dom";
import { ReferralTree, ReferralNode } from "@/components/ReferralTree";
import { supabase } from "@/integrations/supabase/client";

const Dashboard = () => {
  // Nuevo: obtener usuario y perfil
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function getProfile() {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth");
        return;
      }
      // Buscar perfil en la base
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", session.user.id)
        .maybeSingle();
      if (!data || error) {
        setProfile(null);
      } else {
        setProfile(data);
      }
      setLoading(false);
    }
    getProfile();
  }, [navigate]);

  // Mapa conceptual estático como antes
  const referralData: ReferralNode = {
    nombre: profile?.email ?? "Usuario",
    children: [
      { nombre: "Ana Ruiz", children: [ { nombre: "Jacob Luna" }, { nombre: "Laura Lara" } ] },
      { nombre: "David Páez", children: [ { nombre: "Marta Soto" } ] },
      { nombre: "Daniel Pérez" },
    ]
  };

  if (loading) return <div className="p-10 text-lg">Cargando...</div>;
  if (!profile) return <div className="p-10 text-red-700">No hay perfil</div>;

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
