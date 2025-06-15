
import { useState, useEffect } from "react";
import { supabase as typedSupabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { PrimaryCTA } from "@/components/PrimaryCTA";
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

type Mode = "login" | "signup";

const supabase: any = typedSupabase;

export default function Auth() {
  const [mode, setMode] = useState<Mode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nombre, setNombre] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [session, setSession] = useState<any>(null);
  const [showPendingDialog, setShowPendingDialog] = useState(false);
  const [showChat, setShowChat] = useState(false);

  const navigate = useNavigate();

  // Redirect si ya está logueado
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) navigate("/dashboard");
    });
    const { data: authListener } = supabase.auth.onAuthStateChange((_, session) => {
      setSession(session);
      if (session) navigate("/dashboard");
    });
    return () => { authListener?.subscription.unsubscribe(); };
  }, [navigate]);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true); setError(null);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setError(error.message);
    setLoading(false);
  }

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true); setError(null);
    
    console.log("Iniciando proceso de registro para:", email);
    
    const emailRedirectTo = `${window.location.origin}/bienvenida`;
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { 
        emailRedirectTo,
        data: {
          nombre: nombre,
          full_name: nombre,
          email: email
        }
      }
    });
    
    console.log("Resultado del signup:", { data, error });
    
    if (error) {
      console.log("Error en signup:", error.message);
      
      // Si el error es que el usuario ya existe, verificar si está pendiente
      if (error.message.includes("already registered") || error.message.includes("User already registered")) {
        const { data: existingProfile } = await supabase
          .from("profiles")
          .select("status")
          .eq("email", email)
          .maybeSingle();

        console.log("Perfil existente encontrado:", existingProfile);

        if (existingProfile && existingProfile.status === "pending") {
          setLoading(false);
          setShowPendingDialog(true);
          return;
        }
      }
      
      setError(error.message);
    } else {
      console.log("Signup exitoso, redirigiendo a bienvenida");
      // Redirigir directamente a bienvenida
      navigate("/bienvenida");
    }
    setLoading(false);
  }

  const handleActivateAccount = () => {
    setShowPendingDialog(false);
    setShowChat(true);
  };

  return (
    <div className="w-full max-w-md mx-auto mt-16 bg-white rounded-xl shadow-xl p-10 flex flex-col gap-6 animate-fade-in">
      <h1 className="text-2xl font-bold">{mode === "login" ? "Iniciar sesión" : "Crear cuenta"}</h1>
      <form onSubmit={mode === "login" ? handleLogin : handleSignup} className="flex flex-col gap-4">
        {mode === "signup" && (
          <input
            type="text"
            placeholder="Nombre completo"
            value={nombre}
            onChange={e => setNombre(e.target.value)}
            className="border border-primary rounded px-4 py-2 w-full"
            required
          />
        )}
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="border border-primary rounded px-4 py-2 w-full"
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="border border-primary rounded px-4 py-2 w-full"
          required
        />
        {error && <span className="text-red-600 text-sm">{error}</span>}
        <PrimaryCTA type="submit" >
          {loading ? "Enviando..." : mode === "login" ? "Iniciar sesión" : "Registrarme"}
        </PrimaryCTA>
      </form>
      <div className="text-sm text-center">
        {mode === "login"
          ? <>¿No tienes cuenta?{" "}
              <button className="underline text-secondary" onClick={() => setMode("signup")}>Regístrate</button></>
          : <>¿Ya tienes cuenta?{" "}
              <button className="underline text-secondary" onClick={() => setMode("login")}>Inicia sesión</button></>}
      </div>

      {/* Dialog para cuenta pendiente */}
      <AlertDialog open={showPendingDialog} onOpenChange={setShowPendingDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cuenta pendiente de aprobación</AlertDialogTitle>
            <AlertDialogDescription>
              Ya tienes una cuenta registrada con este email que está pendiente de aprobación. 
              Para activar tu cuenta y comenzar a invertir, habla con nuestro agente especializado.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={handleActivateAccount}>
              Activar cuenta
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

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
