
import { useAuth } from "@/hooks/useAuth";
import { PrimaryCTA } from "@/components/PrimaryCTA";
import { supabase as typedSupabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

const supabase: any = typedSupabase;

export default function PostSignup() {
  const { profile, loading, isApproved } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Cargando...</div>
      </div>
    );
  }

  if (isApproved) {
    navigate("/dashboard");
    return null;
  }

  return (
    <div className="w-full max-w-2xl mx-auto mt-16 bg-white rounded-xl shadow-xl p-10 flex flex-col gap-6 animate-fade-in">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-secondary mb-4">¡Bienvenido!</h1>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-yellow-800 mb-2">
            Cuenta Pendiente de Aprobación
          </h2>
          <p className="text-yellow-700 mb-4">
            Tu registro se ha completado exitosamente. Tu cuenta está pendiente de aprobación manual por parte de nuestro equipo.
          </p>
          <div className="text-sm text-yellow-600">
            <p className="mb-2"><strong>Siguiente paso:</strong></p>
            <p>Un administrador debe verificar y aprobar tu cuenta antes de que puedas acceder al panel de inversión. Esto incluye validar tu pago de inversión inicial.</p>
          </div>
        </div>
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-blue-800 mb-2">Información de tu cuenta:</h3>
          <p className="text-blue-700"><strong>Email:</strong> {profile?.email}</p>
          <p className="text-blue-700"><strong>Nombre:</strong> {profile?.nombre}</p>
          <p className="text-blue-700"><strong>Estado:</strong> <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded">Pendiente</span></p>
        </div>

        <p className="text-gray-600 mb-6">
          Recibirás una notificación una vez que tu cuenta sea aprobada y puedas comenzar a invertir.
        </p>

        <div className="flex gap-4 justify-center">
          <PrimaryCTA onClick={handleSignOut}>
            Cerrar sesión
          </PrimaryCTA>
        </div>
      </div>
    </div>
  );
}
