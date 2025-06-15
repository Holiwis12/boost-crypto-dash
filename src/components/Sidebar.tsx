
import { DollarSign, Gift, PlayCircle, Clock } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import clsx from "clsx";

const navItems = [
  {
    label: "Inicio",
    to: "/",
    icon: DollarSign,
  },
  {
    label: "Panel Usuario",
    to: "/dashboard",
    icon: Clock,
  },
  {
    label: "Depositar",
    to: "/depositar",
    icon: DollarSign,
  },
  {
    label: "Retirar",
    to: "/retirar",
    icon: Clock,
  },
  {
    label: "Invita y Gana",
    to: "/referidos",
    icon: Gift,
  },
  {
    label: "Juego",
    to: "/juego",
    icon: PlayCircle,
  },
  {
    label: "Legal & Ayuda",
    to: "/legal",
    icon: Clock,
  },
];

export function Sidebar() {
  const location = useLocation();
  return (
    <aside className="hidden md:flex flex-col bg-primary text-white w-64 min-h-screen shadow-lg px-6 py-8">
      <div className="mb-12 flex items-center gap-3">
        <DollarSign className="text-secondary" size={32} />
        <span className="font-bold text-2xl tracking-wide">CryptoBoost</span>
      </div>
      <nav className="flex-1">
        <ul className="space-y-3">
          {navItems.map((item) => (
            <li key={item.to}>
              <Link
                to={item.to}
                className={clsx(
                  "flex items-center gap-3 px-4 py-2 rounded-lg transition-colors group",
                  location.pathname === item.to
                    ? "bg-secondary text-primary font-semibold"
                    : "hover:bg-secondary/70 hover:text-white"
                )}
              >
                <item.icon size={22} className="flex-shrink-0" />
                <span className="font-medium">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="mt-10 border-t border-white/20 pt-6 text-xs text-white/60">
        © {new Date().getFullYear()} CryptoBoost
      </div>
    </aside>
  );
}
