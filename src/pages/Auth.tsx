
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { PrimaryCTA } from "@/components/PrimaryCTA";

type Mode = "login" | "signup";

export default function Auth() {
  const [mode, setMode] = useState<Mode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nombre, setNombre] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [session, setSession] = useState<any>(null);

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
    // CRÍTICO: Redirigir después de validar email (si está habilitado)
    const emailRedirectTo = `${window.location.origin}/bienvenida`;
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo }
    });
    if (error) setError(error.message);
    else {
      // Guardar el nombre en perfiles (cuando ya esté creado el perfil, lo actualizas)
      // Esperar unos segundos a que se cree el perfil
      setTimeout(async () => {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          await supabase
            .from("profiles")
            .update({ email, status: "pending", nombre })
            .eq("id", session.user.id);
        }
        navigate("/bienvenida");
      }, 2000);
    }
    setLoading(false);
    // Supabase envía email de confirmación si está activado
  }

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
    </div>
  );
}
