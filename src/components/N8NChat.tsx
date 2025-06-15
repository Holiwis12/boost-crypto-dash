
import React, { useState, useRef, useEffect, ChangeEvent } from "react";

interface N8NChatProps {
  onClose?: () => void;
}

const N8N_WEBHOOK_URL =
  "https://n8n.ibpweb.site/webhook/835f689e-1904-42d7-a62d-55511dee26e1";

interface ChatMessage {
  id: number;
  text: string;
  sent: boolean;
  imageUrl?: string;
}

export default function N8NChat({ onClose }: N8NChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll al último mensaje cuando agregamos
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Manejar selección de imagen, mostrar preview
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      setImageFile(null);
      setImagePreview(null);
      return;
    }
    if (!file.type.startsWith("image/jpeg")) {
      alert("Solo se permiten imágenes JPG/JPEG.");
      e.target.value = "";
      setImageFile(null);
      setImagePreview(null);
      return;
    }
    setImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() && !imageFile) return;

    setIsSending(true);

    // Si hay imagen, sube primero la imagen al workflow como base64
    let userMessage: ChatMessage = {
      id: Date.now(),
      text: input.trim(),
      sent: true,
      imageUrl: imagePreview || undefined,
    };

    setMessages((prev) => [...prev, userMessage]);

    try {
      let body: any = {};
      if (imageFile) {
        // Adjuntar la imagen como base64
        body.image = imagePreview;
      }
      if (input.trim()) {
        body.message = input.trim();
      }

      const response = await fetch(N8N_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      let agentMsg = "";
      let agentImageUrl: string | undefined = undefined;

      if (response.ok) {
        const data = await response.json();
        // Chequea si viene message/myField y si hay image para respuestas futuras
        if (data && (data.message || data.myField)) {
          agentMsg = data.message || data.myField;
        }
        if (data.agentImage) {
          agentImageUrl = data.agentImage; // Si el bot algún día responde con imagen
        }
      }

      if (agentMsg || agentImageUrl) {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now() + Math.random(),
            text: agentMsg ?? "",
            sent: false,
            imageUrl: agentImageUrl,
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
      setImageFile(null);
      setImagePreview(null);
      inputRef.current?.focus();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-gradient-to-br from-primary to-secondary via-[#111D24] bg-opacity-80 animate-fade-in">
      <div className="relative bg-[#181e31] rounded-2xl p-0 max-w-md w-full min-h-[570px] min-w-[340px] shadow-2xl flex flex-col border-2 border-secondary/30 ring-4 ring-secondary/10">
        {/* Header */}
        <div className="flex justify-between items-center px-4 py-4 border-b-[2px] border-secondary/40 bg-gradient-to-r from-secondary/80 to-primary rounded-t-2xl">
          <span className="font-bold text-xl text-primary drop-shadow-md flex items-center gap-2">
            <span className="inline-block w-3 h-3 bg-success rounded-full animate-pulse mr-1"></span>
            Asistente IBP
          </span>
          <button
            onClick={onClose}
            className="bg-secondary text-primary rounded-full px-4 py-1 font-bold text-xl shadow hover:bg-warning focus:outline-none transition absolute right-2 top-3"
            aria-label="Cerrar"
            type="button"
          >
            ×
          </button>
        </div>
        {/* Mensajes */}
        <div className="flex-1 p-4 overflow-y-auto bg-gradient-to-br from-[#20243a] via-[#24313c] to-[#161722] rounded-b-2xl">
          {messages.length === 0 && (
            <div className="text-secondary text-center py-10 text-base font-medium animate-fade-in">
              ¡Hola! Escribe tu consulta o adjunta tu comprobante de pago para activar tu cuenta y conversar con nuestro agente.
            </div>
          )}
          {messages.map((msg, i) => (
            <div
              key={msg.id}
              className={`flex ${msg.sent ? "justify-end" : "justify-start"} my-2`}
            >
              <div className={`max-w-[70%]`}>
                {!msg.sent && (
                  <div className="flex items-center gap-1 mb-1">
                    <span className="font-semibold text-warning text-xs uppercase tracking-wide">Agente</span>
                    <span className="inline-block w-2 h-2 bg-warning rounded-full"></span>
                  </div>
                )}
                <div
                  className={`rounded-xl px-4 py-2 text-sm shadow-lg ${
                    msg.sent
                      ? "bg-secondary text-primary border-[2.5px] border-secondary/70"
                      : "bg-warning/85 text-[#373200] border-[2.5px] border-warning/90 font-semibold"
                  } break-words min-h-[36px] relative transition-all duration-200`}
                >
                  {msg.text}
                  {msg.imageUrl && (
                    <div className="mt-2">
                      <img
                        src={msg.imageUrl}
                        alt="Adjunto"
                        className="rounded-lg max-h-[140px] border border-primary/10 shadow-md"
                        style={{ maxWidth: "100%" }}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        {/* Adjuntar imagen y entrada de texto */}
        <form
          onSubmit={handleSend}
          className="flex flex-col gap-2 p-4 border-t-[2px] border-secondary/40 bg-[#1a213a] rounded-b-2xl"
        >
          {imagePreview && (
            <div className="flex items-center gap-3 mb-1 bg-primary/20 rounded-lg p-2 max-w-full">
              <img
                src={imagePreview}
                className="max-h-16 rounded shadow border border-primary/30"
                alt="Preview"
                style={{ maxWidth: "100px" }}
              />
              <button
                type="button"
                onClick={handleRemoveImage}
                className="bg-warning/90 text-warning-foreground px-2 py-1 rounded hover:bg-warning/80 font-semibold shadow ml-2"
              >
                Quitar
              </button>
              <span className="text-xs text-primary/60 ml-2">.jpg adjunto</span>
            </div>
          )}

          <div className="flex gap-2 items-center w-full">
            <label
              htmlFor="adjuntar-jpg"
              className="cursor-pointer bg-secondary/30 border-2 border-secondary text-secondary rounded-lg px-3 py-2 hover:bg-secondary hover:text-primary transition font-medium text-sm shadow"
              title="Adjuntar imagen JPG"
            >
              <svg width="18" height="18" fill="currentColor" className="inline-block mr-1 -mt-1" viewBox="0 0 20 20">
                <path d="M12.293 2.293a1 1 0 0 1 1.414 0l4 4A1 1 0 0 1 18 7H5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1zM4 9a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2H4zm2 2l2.293 2.293a1 1 0 0 0 1.414 0L12 11l4 4H4l2-2z"/>
              </svg>
              JPG
              <input
                id="adjuntar-jpg"
                type="file"
                accept=".jpg,.jpeg,image/jpeg"
                className="hidden"
                disabled={isSending}
                onChange={handleImageChange}
              />
            </label>
            <input
              ref={inputRef}
              type="text"
              className="flex-1 border-none rounded-lg px-4 py-2 bg-[#343c62] text-white placeholder:text-primary/50 focus:outline-none shadow text-base"
              placeholder="Escribe tu mensaje..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isSending}
              autoFocus
              aria-label="Mensaje"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) handleSend(e);
              }}
              maxLength={350}
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-secondary via-warning to-success px-6 py-2 rounded-xl font-extrabold text-primary shadow-xl border-2 border-secondary/60 hover:scale-105 active:scale-95 transition disabled:opacity-60"
              disabled={isSending || (!input.trim() && !imageFile)}
              style={{ minWidth: 90 }}
            >
              {isSending ? "Enviando..." : "Enviar"}
            </button>
          </div>
          <p className="text-xs text-primary/50 pt-1 pl-1">
            Puedes adjuntar una foto (.jpg) de tu comprobante para activación.
          </p>
        </form>
      </div>
    </div>
  );
}
