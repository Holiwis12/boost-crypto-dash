import { PrimaryCTA } from "@/components/PrimaryCTA";
import { useState, useEffect } from "react";
import { supabase as typedSupabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

const networks = [
  {
    name: "TRON (TRC20)",
    address: "TAM7tjGYKKW5GnZJyBHB5YhWB5t7YBkXqxo",
  },
  {
    name: "Ethereum (ERC20)",
    address: "0x76c40be61867f113d83962bb5feb974fcedaa0ac",
  },
];

const Depositar = () => {
  const [amount, setAmount] = useState("");
  const [network, setNetwork] = useState(networks[0]);
  const [success, setSuccess] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function checkAuth() {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth");
      }
    }
    checkAuth();
  }, [navigate]);

  const supabase: any = typedSupabase;

  async function handleConfirmDeposit(e: React.FormEvent) {
    e.preventDefault();
    setFeedback(null);
    const amt = Number(amount);
    if (isNaN(amt) || amt < 50 || amt > 2000) {
      setFeedback("El monto debe ser entre 50 y 2000 USD.");
      return;
    }
    // Comprobar si el usuario está autenticado
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      setFeedback("Necesitas iniciar sesión.");
      navigate("/auth");
      return;
    }
    // Insertar depósito en Supabase
    const { error } = await supabase
      .from("deposits")
      .insert({
        user_id: session.user.id,
        amount: amt,
        network: network.name,
        status: "pending"
      });
    if (error) {
      setFeedback("Hubo un error al registrar el depósito.");
    } else {
      setSuccess(true);
      setFeedback("¡Depósito registrado! Una vez validado, se actualizará tu balance.");
    }
  }

  return (
    <div className="w-full max-w-xl mx-auto mt-12 bg-white rounded-xl shadow-lg p-10 animate-fade-in flex flex-col gap-5">
      <h1 className="text-2xl font-bold mb-2">Depósita USDT y comienza a invertir</h1>
      <div className="mb-4 text-sm text-primary">
        Depósito mínimo <b>$50</b>, máximo <b>$2000</b>. Comisión: <span className="text-warning font-semibold">5%</span>. Plan activado tras confirmar depósito.
      </div>
      {success && (
        <div className="text-green-600 font-medium bg-green-100/80 border border-green-300 px-6 py-3 rounded">✓ {feedback}</div>
      )}
      {!success && (
        <form onSubmit={handleConfirmDeposit} className="flex flex-col gap-3">
          <label className="font-medium mb-2">Seleccione red:</label>
          <div className="flex flex-wrap gap-4 mb-4">
            {networks.map((net) => (
              <button
                key={net.name}
                onClick={() => setNetwork(net)}
                className={`px-4 py-2 rounded border-2 ${
                  network.name === net.name
                    ? "border-secondary bg-secondary/30 text-primary font-semibold"
                    : "border-primary bg-white text-primary"
                }`}
                type="button"
              >
                {net.name}
              </button>
            ))}
          </div>
          <label className="font-medium mb-1">Dirección {network.name}:</label>
          <div className="flex items-center gap-3">
            <span className="bg-gray-100 px-3 py-2 rounded font-mono">{network.address}</span>
          </div>
          <label className="font-medium mt-5">Monto a depositar:</label>
          <input
            type="number"
            min={50}
            max={2000}
            value={amount}
            onChange={e => setAmount(e.target.value)}
            className="border border-primary rounded px-4 py-2 w-full mt-1 mb-3"
            required
          />
          {feedback && <span className="text-red-600">{feedback}</span>}
          <PrimaryCTA type="submit">Confirmar Depósito</PrimaryCTA>
        </form>
      )}
    </div>
  );
};

export default Depositar;
