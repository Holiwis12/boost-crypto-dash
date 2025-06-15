
import React, { useState, useRef, useEffect } from "react";

interface N8NChatProps {
  onClose?: () => void;
}

const N8N_WEBHOOK_URL = "https://n8n.ibpweb.site/webhook/1f53b677-23c8-4a30-b94d-b92c18cef70b/chat";

interface ChatMessage {
  id: number;
  text: string;
  sent: boolean;
}

export default function N8NChat({ onClose }: N8NChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll al último mensaje cuando agregamos
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim()) return;

    const message: ChatMessage = {
      id: Date.now(),
      text: input.trim(),
      sent: true,
    };

    setIsSending(true);
    setMessages((prev) => [...prev, message]);

    try {
      const response = await fetch(N8N_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input.trim() }),
      });
      let agentMsg = "";
      if (response.ok) {
        const data = await response.json();
        // El backend debe responder con { message: "Texto respuesta" }
        if (data && data.message) {
          agentMsg = data.message;
        }
      }

      if (agentMsg) {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now() + Math.random(),
            text: agentMsg,
            sent: false,
          },
        ]);
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          text: "¡Error al enviar el mensaje! Intenta de nuevo.",
          sent: false,
        },
      ]);
    } finally {
      setIsSending(false);
      setInput("");
      inputRef.current?.focus();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/30">
      <div className="bg-white rounded-lg p-0 max-w-md w-full min-h-[520px] min-w-[320px] shadow-2xl flex flex-col">
        <div className="flex justify-between items-center px-4 py-3 border-b border-gray-200 bg-secondary/10 rounded-t-lg">
          <span className="font-bold text-secondary">Asistente IBP</span>
          <button
            onClick={onClose}
            className="bg-secondary text-primary rounded-full px-2 py-1 font-bold text-lg transition absolute right-3 top-3"
            aria-label="Cerrar"
            type="button"
          >
            ×
          </button>
        </div>
        <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
          {messages.length === 0 && (
            <div className="text-primary/60 text-center py-6 text-sm">¡Hola! Escribe tu consulta y presiona enviar.</div>
          )}
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sent ? "justify-end" : "justify-start"} my-1`}
            >
              <div
                className={`rounded-lg px-4 py-2 text-sm shadow ${
                  msg.sent
                    ? "bg-secondary text-primary ml-8"
                    : "bg-warning/30 text-warning mr-8"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <form
          onSubmit={handleSend}
          className="flex p-3 border-t border-gray-200 bg-white rounded-b-lg"
        >
          <input
            ref={inputRef}
            type="text"
            className="flex-1 border border-primary rounded px-4 py-2 mr-2 focus:outline-secondary"
            placeholder="Escribe tu mensaje..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isSending}
            autoFocus
            aria-label="Mensaje"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) handleSend(e);
            }}
          />
          <button
            type="submit"
            className="bg-secondary text-primary px-6 py-2 rounded-lg font-bold shadow disabled:opacity-50"
            disabled={isSending || !input.trim()}
          >
            {isSending ? "Enviando..." : "Enviar"}
          </button>
        </form>
      </div>
    </div>
  );
}
