
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Search, Eye, Download } from "lucide-react";

// Datos fake de usuarios administrados
const fakeUsers = [
  {
    nombre: "Lucas Pérez",
    email: "lucas.perez@gmail.com",
    balance: 1120,
    inversiones: 1200,
    referidos: 2,
    roi: 1.2,
    invertido: 1200,
    retirado: 120,
    direccion: "TAM7tj...BkXqxo",
    ultima: "2024-06-13 11:32",
    retirosPendientes: false,
  },
  {
    nombre: "María Gómez",
    email: "m.gomez@mail.com",
    balance: 3500,
    inversiones: 3550,
    referidos: 6,
    roi: 1.7,
    invertido: 3550,
    retirado: 400,
    direccion: "0x76c4...a0ac",
    ultima: "2024-06-15 08:55",
    retirosPendientes: true,
  },
  {
    nombre: "Juan Lopez",
    email: "juanlopez99@mail.com",
    balance: 800,
    inversiones: 850,
    referidos: 1,
    roi: 1.1,
    invertido: 850,
    retirado: 50,
    direccion: "TAM1pp...7Hb6o",
    ultima: "2024-06-12 21:01",
    retirosPendientes: false,
  },
  {
    nombre: "Ana Ruiz",
    email: "anar@dominio.com",
    balance: 9000,
    inversiones: 9500,
    referidos: 9,
    roi: 1.8,
    invertido: 9500,
    retirado: 3000,
    direccion: "0xa59f...ac5f",
    ultima: "2024-06-15 10:21",
    retirosPendientes: false,
  },
];

export default function Admin() {
  const [search, setSearch] = useState("");
  const [filtro, setFiltro] = useState("todos");

  // Filtro simple fake
  const usuariosFiltrados = fakeUsers.filter((u) => {
    let match = true;
    if (search.trim()) match = u.email.toLowerCase().includes(search.toLowerCase());
    if (filtro === "menos3referidos") match = match && u.referidos < 3;
    if (filtro === "retirosPendientes") match = match && u.retirosPendientes;
    return match;
  });

  return (
    <div className="w-full max-w-7xl mx-auto mt-12 p-6 bg-white rounded-xl shadow-lg animate-fade-in flex flex-col gap-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
        <h1 className="text-2xl md:text-3xl font-bold">Panel de Administración</h1>
        <div className="flex gap-2">
          <Button variant="secondary" className="gap-2" size="sm">
            <Download size={18} /> Exportar CSV
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">
            <div className="flex gap-2 items-center">
              <Search className="text-secondary" size={20} />
              <Input
                placeholder="Buscar por correo electrónico..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="max-w-xs"
              />
              <select
                value={filtro}
                onChange={e => setFiltro(e.target.value)}
                className="ml-2 rounded-md border border-gray-200 px-3 py-2 bg-gray-50 text-gray-800 text-sm"
              >
                <option value="todos">Todos</option>
                <option value="menos3referidos">&lt; 3 referidos</option>
                <option value="retirosPendientes">Con retiros pendientes</option>
              </select>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0 overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Correo</TableHead>
                <TableHead>Balance generado</TableHead>
                <TableHead>Inversiones activas</TableHead>
                <TableHead>Referidos</TableHead>
                <TableHead>ROI %</TableHead>
                <TableHead>Total invertido</TableHead>
                <TableHead>Total retirado</TableHead>
                <TableHead>Dirección depósito</TableHead>
                <TableHead>Última actividad</TableHead>
                <TableHead>Retiros pendientes</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {usuariosFiltrados.map((u, i) => (
                <TableRow key={u.email}>
                  <TableCell>{u.nombre}</TableCell>
                  <TableCell className="whitespace-nowrap">{u.email}</TableCell>
                  <TableCell>${u.balance}</TableCell>
                  <TableCell>${u.inversiones}</TableCell>
                  <TableCell>{u.referidos}</TableCell>
                  <TableCell>{u.roi}%</TableCell>
                  <TableCell>${u.invertido}</TableCell>
                  <TableCell>${u.retirado}</TableCell>
                  <TableCell className="whitespace-nowrap">{u.direccion}</TableCell>
                  <TableCell className="whitespace-nowrap">{u.ultima}</TableCell>
                  <TableCell>
                    {u.retirosPendientes ? (
                      <span className="inline-block bg-warning text-xs text-gray-900 px-2 py-1 rounded">Pendiente</span>
                    ) : (
                      <span className="inline-block bg-success text-xs text-white px-2 py-1 rounded">OK</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm" className="gap-1">
                      <Eye size={16} /> Ver
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {usuariosFiltrados.length === 0 && (
            <div className="text-center text-muted-foreground p-6">No se encontraron usuarios...</div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
