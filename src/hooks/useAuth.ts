
import { useState, useEffect } from "react";
import { supabase as typedSupabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

const supabase: any = typedSupabase;

export function useAuth() {
  const [session, setSession] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Obtener sesión inicial
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setSession(session);
      if (session) {
        await loadProfile(session.user.id);
      }
      setLoading(false);
    });

    // Escuchar cambios de autenticación
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        if (session) {
          await loadProfile(session.user.id);
        } else {
          setProfile(null);
        }
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const loadProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .maybeSingle();
      
      if (error) {
        console.error("Error cargando perfil:", error);
        return;
      }
      
      setProfile(data);
      
      // Redirigir según el estado del perfil
      if (data) {
        if (data.status === "approved") {
          // Usuario aprobado puede acceder al dashboard
          if (window.location.pathname === "/auth" || window.location.pathname === "/") {
            navigate("/dashboard");
          }
        } else if (data.status === "pending") {
          // Usuario pendiente debe quedarse en bienvenida o auth
          if (window.location.pathname === "/dashboard") {
            navigate("/bienvenida");
          }
        } else if (data.status === "rejected") {
          // Usuario rechazado debe ir a auth
          navigate("/auth");
        }
      }
    } catch (error) {
      console.error("Error en loadProfile:", error);
    }
  };

  return {
    session,
    profile,
    loading,
    isAuthenticated: !!session,
    isApproved: profile?.status === "approved",
    isPending: profile?.status === "pending",
    isRejected: profile?.status === "rejected"
  };
}
