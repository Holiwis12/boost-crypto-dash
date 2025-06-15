
const Enlace = "https://midominio.com/ref/usuario123";

const Referidos = () => (
  <div className="w-full max-w-2xl mx-auto mt-14 bg-white rounded-xl shadow-lg p-10 animate-fade-in flex flex-col gap-6">
    <h1 className="text-2xl font-bold mb-2">Invita y gana</h1>
    <p className="text-primary mb-2">Por cada referido activo, ganas <b>+0.1%</b> en rentabilidad (hasta 1.8%).</p>
    <div className="flex font-mono items-center gap-2 bg-gray-100 px-4 py-3 rounded-lg border-l-4 border-secondary">
      <span className="font-bold text-secondary">Enlace de invitación:</span>
      <span>{Enlace}</span>
      {/* Botón copiar */}
    </div>
    <ul className="mt-3 text-sm">
      <li>⦿ Comparte tu enlace con amigos</li>
      <li>⦿ Solo cuenta tras depósito de al menos $50</li>
      <li>⦿ Mayor cantidad de referidos = mejor rentabilidad</li>
    </ul>
  </div>
);

export default Referidos;
