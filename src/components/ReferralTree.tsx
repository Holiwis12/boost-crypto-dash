
import React from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export interface ReferralNode {
  nombre: string;
  // En el futuro podrías añadir avatarUrl?: string;
  children?: ReferralNode[];
}

interface ReferralTreeProps {
  root: ReferralNode;
}

// Badge personalizada para oro/plata
function InsigniaBadge({ tieneReferidos }: { tieneReferidos: boolean }) {
  return tieneReferidos ? (
    <Badge
      style={{
        background: "linear-gradient(90deg,#ffd700,#fffbe6)",
        color: "#1F1F2E",
        border: "1px solid #ffd700",
      }}
      className="ml-1"
      variant="secondary"
    >
      🥇 Oro
    </Badge>
  ) : (
    <Badge
      style={{
        background: "linear-gradient(90deg,#e6e6e6,#f8f9fa)",
        color: "#1F1F2E",
        border: "1px solid #c0c0c0",
      }}
      className="ml-1"
      variant="secondary"
    >
      🥈 Plata
    </Badge>
  );
}

export const ReferralTree: React.FC<ReferralTreeProps> = ({ root }) => {
  // Renderiza de manera recursiva todos los nodos descendientes
  const renderNode = (node: ReferralNode, depth = 0) => {
    const tieneReferidos = !!(node.children && node.children.length > 0);

    // Avatar: solo inicial del nombre
    const inicial =
      node.nombre?.trim().charAt(0).toUpperCase() ||
      node.nombre?.charAt(0).toUpperCase() ||
      "?";

    return (
      <div
        className="flex flex-col items-center"
        style={{ marginLeft: depth ? 32 : 0 }}
      >
        <div className="flex items-center gap-2 bg-secondary rounded-full px-4 py-2 text-sm font-medium shadow mb-2 min-w-[180px]">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-card text-white">{inicial}</AvatarFallback>
          </Avatar>
          <span className="text-primary">{node.nombre}</span>
          <InsigniaBadge tieneReferidos={tieneReferidos} />
        </div>
        {tieneReferidos && (
          <div className="flex gap-4 mt-2">
            {node.children!.map((child, idx) => (
              <div key={idx} className="flex flex-col items-center relative">
                {/* Línea de descenso visual */}
                <div className="h-4 w-0.5 bg-gray-300 absolute -top-4 left-1/2 transform -translate-x-1/2" />
                {renderNode(child, depth + 1)}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center p-4 bg-white rounded-xl shadow-md">
      <h3 className="font-bold text-primary mb-4 text-lg">Árbol de Referidos</h3>
      {renderNode(root)}
    </div>
  );
};
