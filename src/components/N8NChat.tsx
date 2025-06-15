
import React from "react";

interface N8NChatProps {
  onClose?: () => void;
}

const N8N_CHAT_URL = "https://n8n.ibpweb.site/webhook/1f53b677-23c8-4a30-b94d-b92c18cef70b/chat";

export default function N8NChat({ onClose }: N8NChatProps) {
  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/30">
      <div className="bg-white rounded-lg p-4 relative max-w-md w-full min-h-[480px] min-w-[320px] shadow-2xl flex flex-col">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 bg-secondary text-primary rounded-full px-2 py-1 font-bold"
        >
          ×
        </button>
        <iframe
          src={N8N_CHAT_URL}
          title="Chat Asistente n8n"
          className="flex-1 w-full h-[440px] border-0 rounded"
        />
      </div>
    </div>
  );
}
