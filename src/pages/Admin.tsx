
import { useProfiles } from "@/hooks/useProfiles";
import { AdminProfileRow } from "@/components/AdminProfileRow";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead } from "@/components/ui/table";
import { toast } from "@/components/ui/use-toast";

export default function Admin() {
  const { profiles, isLoading, error, updateStatus, updatingStatus } = useProfiles();

  return (
    <div className="w-full max-w-4xl mx-auto mt-10 p-6 bg-primary rounded-xl shadow-lg animate-fade-in flex flex-col gap-6">
      <h1 className="text-2xl font-bold text-white mb-4">Panel de Administración</h1>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg text-primary">Perfiles de usuarios</CardTitle>
        </CardHeader>
        <CardContent className="p-0 overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-white">Nombre</TableHead>
                <TableHead className="text-white">Correo</TableHead>
                <TableHead className="text-white">Balance</TableHead>
                <TableHead className="text-white">Estado</TableHead>
                <TableHead className="text-white">Registrado</TableHead>
                <TableHead className="text-white">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading && (
                <tr>
                  <td colSpan={6} className="text-center text-muted-foreground p-6">Cargando perfiles...</td>
                </tr>
              )}
              {error && (
                <tr>
                  <td colSpan={6} className="text-center text-red-400 p-6">Error: {String(error.message)}</td>
                </tr>
              )}
              {!isLoading && profiles && profiles.length > 0 && (
                profiles.map(profile => (
                  <AdminProfileRow
                    key={profile.id}
                    profile={profile}
                    updating={updatingStatus}
                    onStatusChange={status => {
                      updateStatus(
                        { id: profile.id, status },
                        {
                          onSuccess: () => {
                            toast({ title: "Éxito", description: `Usuario ${status === "approved" ? "aprobado" : "rechazado"} exitosamente`, variant: "default" });
                          },
                          onError: (e: any) => {
                            toast({ title: "Error", description: e.message, variant: "destructive" });
                          },
                        }
                      );
                    }}
                  />
                ))
              )}
              {!isLoading && profiles && profiles.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center text-muted-foreground p-6">No hay perfiles registrados.</td>
                </tr>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
