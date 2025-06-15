
import { PrimaryCTA } from "@/components/PrimaryCTA";
import { BenefitCard } from "@/components/BenefitCard";
import { Gift, DollarSign, PlayCircle } from "lucide-react";
import { Link } from "react-router-dom";

const benefits = [
  {
    icon: <DollarSign size={36} />,
    title: "Rentabilidad diaria asegurada",
    description: "Multiplica tus USDT desde $50 y gana entre 1.2% a 1.8% cada día.",
  },
  {
    icon: <Gift size={36} />,
    title: "Sistema de referidos",
    description: "Por cada amigo activo, aumentas tu rentabilidad +0.1%. ¡Comparte y gana más!",
  },
  {
    icon: <PlayCircle size={36} />,
    title: "Juego competitivo",
    description: "Reta a otros y apuesta tus ganancias. ¡El ganador se lleva el 90% del pozo!",
  },
];

const Index = () => (
  <div className="flex flex-col min-h-screen bg-background">
    <header className="flex flex-col md:flex-row items-center md:justify-between gap-6 py-16 md:py-24 animate-fade-in">
      <div className="flex-1 flex flex-col gap-6">
        <h1 className="text-4xl md:text-5xl font-bold text-primary leading-tight max-w-2xl">
          Invierte en cripto. <span className="text-secondary">Gana todos los días.</span>
        </h1>
        <p className="text-lg md:text-xl text-text max-w-xl">
          Multiplica tus USDT desde <span className="font-bold text-primary">$50</span> con rentabilidad diaria y recompensas por invitar amigos.
        </p>
        <div className="flex flex-col md:flex-row gap-4 mt-4">
          <Link to="/depositar">
            <PrimaryCTA>Comenzar ahora</PrimaryCTA>
          </Link>
          <a href="#como-funciona">
            <PrimaryCTA>¿Cómo funciona?</PrimaryCTA>
          </a>
        </div>
      </div>
      <div className="flex-1 flex justify-center items-center">
        <img
          src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=500&q=80"
          alt="Hero Crypto"
          className="rounded-2xl shadow-2xl max-w-[340px] md:max-w-[400px] border-4 border-secondary"
        />
      </div>
    </header>
    <section className="py-12 md:py-20 bg-primary/95" id="como-funciona">
      <div className="max-w-5xl mx-auto px-4 flex flex-col items-center">
        <h2 className="text-3xl font-bold text-white mb-12">¿Por qué elegir CryptoBoost?</h2>
        <div className="flex flex-wrap justify-center gap-8">
          {benefits.map((b, i) => (
            <BenefitCard key={i} icon={b.icon} title={b.title} description={b.description} />
          ))}
        </div>
      </div>
    </section>
    <footer className="py-6 text-center text-xs text-text/80">
      © {new Date().getFullYear()} CryptoBoost. Reservados todos los derechos.
    </footer>
  </div>
);

export default Index;
