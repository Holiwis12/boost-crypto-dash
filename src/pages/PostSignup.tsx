
import { useAuth } from "@/hooks/useAuth";
import { PrimaryCTA } from "@/components/PrimaryCTA";
import { supabase as typedSupabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import N8NChat from "@/components/N8NChat";

const supabase: any = typedSupabase;

export default function PostSignup() {
  const { profile, loading, isApproved, session } = useAuth();
  const navigate = useNavigate();
  const [showChat, setShowChat] = useState(false);

  // Obtener información del usuario desde la sesión si el profile no está disponible
  const userEmail = profile?.email || session?.user?.email || '';
  const userName = profile?.nombre || session?.user?.user_metadata?.nombre || session?.user?.user_metadata?.full_name || '';

  console.log("PostSignup - Profile:", profile);
  console.log("PostSignup - Session:", session);
  console.log("PostSignup - User email:", userEmail);
  console.log("PostSignup - User name:", userName);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
  };

  const handleActivateAccount = () => {
    setShowChat(true);
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
          <p className="text-blue-700"><strong>Email:</strong> {userEmail}</p>
          <p className="text-blue-700"><strong>Nombre:</strong> {userName}</p>
          <p className="text-blue-700"><strong>Estado:</strong> <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded">Pendiente</span></p>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <p className="text-green-700 mb-4">
            Para continuar con tu cuenta y poder invertir debes activar tu cuenta, por favor haz click en el siguiente botón.
          </p>
        </div>

        <div className="flex gap-4 justify-center">
          <PrimaryCTA onClick={handleActivateAccount}>
            Activar Cuenta
          </PrimaryCTA>
          <PrimaryCTA onClick={handleSignOut}>
            Cerrar sesión
          </PrimaryCTA>
        </div>
      </div>

      {/* Chat para activar cuenta */}
      {showChat && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-secondary">Activar cuenta</h2>
              <button 
                onClick={() => setShowChat(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <div className="flex-1 overflow-hidden">
              <N8NChat onClose={() => setShowChat(false)} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
