"use client";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

function ConfirmationPageContent() {
  const searchParams = useSearchParams();
  const [message, setMessage] = useState("");

  useEffect(() => {
    setMessage(
      "Gracias por tu interés en nuestros servicios. Un asesor de F-Stack se pondrá en contacto contigo lo antes posible para brindarte más detalles."
    );
  }, [searchParams]);

  return (
    <div className="bg-gray-900 min-h-screen flex flex-col items-center justify-center text-white p-6 text-center">
      <h1 className="text-3xl font-bold mb-4">¡Solicitud Recibida! 🎉</h1>
      <p className="text-lg max-w-lg mb-6">{message}</p>
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

export default function ConfirmationPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ConfirmationPageContent />
    </Suspense>
  );
}
