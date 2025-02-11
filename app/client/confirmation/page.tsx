"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ConfirmationPage() {
  const searchParams = useSearchParams();
  const [message, setMessage] = useState("");

  useEffect(() => {
    // 📌 Obtiene el tipo de acción desde la URL (quote, advisor, install)
    const type = searchParams.get("type");

    // 📌 Mensaje estándar para todas las opciones
    setMessage(
      "Gracias por tu interés en nuestros servicios. Un asesor de F-Stack se pondrá en contacto contigo lo antes posible para brindarte más detalles."
    );
  }, [searchParams]);

  return (
    <div className="bg-gray-900 min-h-screen flex flex-col items-center justify-center text-white p-6 text-center">
      {/* ✅ Mensaje de confirmación */}
      <h1 className="text-3xl font-bold mb-4">¡Solicitud Recibida! 🎉</h1>
      <p className="text-lg max-w-lg mb-6">{message}</p>

      {/* 🔹 Botón para ir a Instagram */}
      <a
        href="https://www.instagram.com/fstack.prodetailing"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-6 rounded-lg transition-all"
      >
        📸 Síguenos en Instagram
      </a>
    </div>
  );
}
