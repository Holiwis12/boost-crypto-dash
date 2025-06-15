
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type FakeUser = {
  nombre: string;
  email: string;
  balance: number;
  gananciasActuales: number;
  inversiones: number;
  referidos: number;
  roi: number;
  invertido: number;
  retirado: number;
  direccion: string;
  ultima: string;
  retirosPendientes: boolean;
};

function getFakeWithdrawals(user: FakeUser) {
  const retiros: { fecha: string; monto: number }[] = [];
  let total = user.retirado;
  let idx = 0;
  while (total > 0) {
    const monto = Math.min(100, total);
    retiros.push({
      fecha: `2024-06-${12 + idx} ${(10 + idx).toString().padStart(2, "0")}:00`,
      monto,
    });
    total -= monto;
    idx++;
  }
  return retiros;
}

interface UserDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: FakeUser | null;
}

export function UserDetailModal({ open, onOpenChange, user }: UserDetailModalProps) {
  if (!user) return null;
  const retiros = getFakeWithdrawals(user);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Detalle de usuario</DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Información detallada de <b>{user.nombre}</b>
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-1">
          <div className="font-bold text-blue-800 mb-2">Balance activo: ${user.gananciasActuales}</div>
          <div><b>Correo: </b> {user.email}</div>
          <div><b>Dirección depósito:</b> {user.direccion}</div>
          <div><b>Referidos:</b> {user.referidos}</div>
          <div><b>ROI:</b> {user.roi}%</div>
          <div><b>Total invertido:</b> ${user.invertido}</div>
          <div><b>Total retirado:</b> ${user.retirado}</div>
        </div>

        <div className="mt-6">
          <h3 className="font-semibold mb-2">Historial de retiros</h3>
          {retiros.length === 0 ? (
            <div className="text-muted-foreground">No ha realizado retiros.</div>
          ) : (
            <table className="w-full text-sm text-left border rounded overflow-hidden">
              <thead>
                <tr className="bg-muted">
                  <th className="p-2">Fecha</th>
                  <th className="p-2">Monto</th>
                </tr>
              </thead>
              <tbody>
                {retiros.map((r, i) => (
                  <tr key={i} className="border-t">
                    <td className="p-2">{r.fecha}</td>
                    <td className="p-2">${r.monto}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <DialogClose asChild>
          <Button variant="secondary" className="w-full mt-6">Cerrar</Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
