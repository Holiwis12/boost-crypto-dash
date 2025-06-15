
import React from "react";

// Cada referido puede tener subreferidos, por simplicidad, son recursivos.
export interface ReferralNode {
  nombre: string;
  email: string;
  children?: ReferralNode[];
}

interface ReferralTreeProps {
  root: ReferralNode;
}

export const ReferralTree: React.FC<ReferralTreeProps> = ({ root }) => {
  // Renderiza de manera recursiva todos los nodos descendientes
  const renderNode = (node: ReferralNode, depth = 0) => (
    <div className="flex flex-col items-center" style={{ marginLeft: depth ? 32 : 0 }}>
      <div className="flex items-center gap-2 bg-secondary rounded-full px-4 py-2 text-sm font-medium shadow mb-2 min-w-[180px]">
        <span className="text-primary">{node.nombre}</span>
      </div>
      {node.children && node.children.length > 0 && (
        <div className="flex gap-4 mt-2">
          {node.children.map((child, idx) => (
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

  return (
    <div className="flex flex-col items-center p-4 bg-white rounded-xl shadow-md">
      <h3 className="font-bold text-primary mb-4 text-lg">Árbol de Referidos</h3>
      {renderNode(root)}
    </div>
  );
};
