
import { PrimaryCTA } from "@/components/PrimaryCTA";
import { useState } from "react";

const Retirar = () => {
  const [amount, setAmount] = useState("");
  // En futuro: validar restricciones de día/hora, referidos, monto mínimo
  return (
    <div className="w-full max-w-xl mx-auto mt-14 bg-white rounded-xl shadow-lg p-10 animate-fade-in flex flex-col gap-6">
      <h1 className="text-2xl font-bold mb-2">Solicitar retiro</h1>
      <p className="text-sm mb-2 text-primary">
        <b>Retiros solo los sábados de 1:00 p.m. a 2:00 p.m. (hora RD).</b> <br/>
        Mínimo: <span className="font-semibold">3 referidos activos</span><br/>
        Comisión: <span className="text-warning font-bold">10%</span>
      </p>
      <label className="font-medium">Monto a retirar:</label>
      <input
        type="number"
        value={amount}
        min={50}
        onChange={e => setAmount(e.target.value)}
        className="border border-primary rounded px-4 py-2 w-full mt-1"
      />
      <PrimaryCTA>Solicitar retiro</PrimaryCTA>
    </div>
  );
};

export default Retirar;
