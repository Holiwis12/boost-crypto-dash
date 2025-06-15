
import { PrimaryCTA } from "@/components/PrimaryCTA";
import { useState } from "react";

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

  return (
    <div className="w-full max-w-xl mx-auto mt-12 bg-white rounded-xl shadow-lg p-10 animate-fade-in flex flex-col gap-5">
      <h1 className="text-2xl font-bold mb-2">Depósita USDT y comienza a invertir</h1>
      <div className="mb-4 text-sm text-primary">
        Depósito mínimo <b>$50</b>, máximo <b>$2000</b>. Comisión: <span className="text-warning font-semibold">5%</span>. Plan activado tras confirmar depósito.
      </div>
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
        {/* Podrías agregar botón de copiar o mostrar QR aquí */}
      </div>
      <label className="font-medium mt-5">Monto a depositar:</label>
      <input
        type="number"
        min={50}
        max={2000}
        value={amount}
        onChange={e => setAmount(e.target.value)}
        className="border border-primary rounded px-4 py-2 w-full mt-1 mb-3"
      />
      <PrimaryCTA>Confirmar Depósito</PrimaryCTA>
    </div>
  );
};

export default Depositar;
