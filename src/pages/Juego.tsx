
import { PrimaryCTA } from "@/components/PrimaryCTA";

const Juego = () => (
  <div className="w-full max-w-xl mx-auto mt-16 bg-white rounded-xl shadow-lg p-10 animate-fade-in flex flex-col gap-6">
    <h1 className="text-2xl font-bold mb-2">Juego Geometry Dash</h1>
    <p className="text-primary">
      Apuesta tu saldo generado contra otro usuario en un minijuego tipo <b>Geometry Dash</b>.<br/>
      <span className="font-semibold text-success">Apuesta mínima: $50</span>. El ganador se lleva el <span className="text-secondary font-bold">90%</span> del pozo.
    </p>
    <div className="flex gap-4 mt-6">
      <PrimaryCTA>Entrar al reto</PrimaryCTA>
      <PrimaryCTA>Ver partidas activas</PrimaryCTA>
    </div>
  </div>
);

export default Juego;
