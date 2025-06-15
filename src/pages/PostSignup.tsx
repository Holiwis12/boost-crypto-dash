
import { useState } from "react";
import { PrimaryCTA } from "@/components/PrimaryCTA";
import N8NChat from "@/components/N8NChat";

export default function PostSignup() {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <div className="w-full max-w-2xl mx-auto mt-16 bg-white rounded-xl shadow-xl p-10 flex flex-col gap-8 items-center animate-fade-in">
      <h1 className="text-3xl font-bold text-secondary">¡Felicidades! 🎉</h1>
      <p className="text-lg text-primary text-center">
        Ya estás a un paso de multiplicar tus ingresos pasivos.<br />
        <span className="font-semibold text-secondary">Solo falta activar tu cuenta</span> para comenzar a invertir y acceder a nuestras oportunidades exclusivas.
      </p>
      <div className="bg-secondary/10 border border-secondary px-8 py-6 rounded-lg text-center text-base text-primary mb-2">
        <b>¿Qué hacer ahora?</b><br />
        Haz clic en <span className="font-medium text-secondary">"Activar cuenta"</span> para conversar con nuestro asistente.<br />
        Resuelve tus dudas y asegura tu activación en minutos.
      </div>
      <PrimaryCTA onClick={() => setChatOpen(true)} className="w-full max-w-xs" autoFocus>
        Activar cuenta
      </PrimaryCTA>
      {chatOpen && (
        <div className="w-full flex flex-col items-center">
          <N8NChat onClose={() => setChatOpen(false)} />
        </div>
      )}
    </div>
  );
}
