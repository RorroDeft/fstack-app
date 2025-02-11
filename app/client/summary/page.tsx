"use client";
import { useEffect, useState } from "react";
import { useQuote } from "../../context/QuoteContext";
import { useRouter } from "next/navigation";

export default function SummaryPage() {
  const { cart, clearQuote } = useQuote();
  const router = useRouter();
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false); // 🔄 Estado del Loader

  // ✅ Calcular el total de la cotización al cargar la página
  useEffect(() => {
    const totalPrice = cart.reduce(
      (sum, service) => sum + service.base_price * service.quantity,
      0
    );
    setTotal(totalPrice);
  }, [cart]);

  // ✅ Redirigir si el carrito está vacío
  useEffect(() => {
    if (cart.length === 0 && !loading) {
      router.push("/client/services");
    }
  }, [cart, router, loading]);

  // ✅ Maneja la selección de una opción
  const handleOptionSelect = () => {
    setLoading(true); // ⏳ Activa el Loader

    setTimeout(() => {
      clearQuote(); // 🔥 Borra la cotización
      router.push("/client/confirmation"); // 🔄 Redirige a la confirmación
    }, 2000); // ⏳ Simula un pequeño retraso para UX
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white p-6 sm:p-8 flex flex-col items-center justify-center">
      {/* 🔄 Loader - Solo se muestra mientras está cargando */}
      {loading ? (
        <div className="flex flex-col items-center gap-4">
          <div className="loader border-t-4 border-orange-500 border-solid rounded-full w-12 h-12 animate-spin"></div>
          <p className="text-lg">Procesando tu solicitud...</p>
        </div>
      ) : (
        <>
          {/* 🏷️ Título */}
          <h1 className="text-3xl font-bold mb-6">Resumen de tu Cotización</h1>

          {/* 📌 Servicios cotizados - RESPONSIVE */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-6 w-full max-w-lg">
            <h2 className="text-xl font-semibold mb-4">Servicios incluidos:</h2>

            {/* ✅ Mobile → Tarjetas individuales */}
            <div className="space-y-4">
              {cart.map((service) => (
                <div key={service.id} className="bg-gray-700 p-4 rounded-lg shadow">
                  <h3 className="text-lg font-bold">{service.name}</h3>
                  <p className="text-sm text-gray-300">
                    Cantidad: <span className="font-semibold">{service.quantity}</span>
                  </p>
                  <p className="text-sm text-gray-300">
                    Precio Unitario: <span className="font-semibold">
                      ${service.base_price.toLocaleString("es-CL")} +IVA
                    </span>
                  </p>
                  <p className="text-sm text-gray-300">
                    Subtotal: <span className="font-semibold">
                      ${(service.base_price * service.quantity).toLocaleString("es-CL")} +IVA
                    </span>
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* 🛒 Total estimado */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-6 w-full max-w-lg">
            <h2 className="text-xl font-semibold mb-4">Total estimado</h2>
            <p className="text-lg">
              Subtotal: <span className="font-bold">
                ${total.toLocaleString("es-CL")} +IVA
              </span>
            </p>
            <p className="text-lg mt-2">
              Total con IVA (~19%): <span className="font-bold">
                ${(total * 1.19).toLocaleString("es-CL")}
              </span>
            </p>
          </div>

          {/* 🔹 Botones de acción */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg"
              onClick={handleOptionSelect}
              disabled={loading} // 🔒 Deshabilita mientras carga
            >
              📩 Recibir Cotización Formal
            </button>

            <button
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg"
              onClick={handleOptionSelect}
              disabled={loading}
            >
              📞 Hablar con un Asesor
            </button>

            <button
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg"
              onClick={handleOptionSelect}
              disabled={loading}
            >
              🛠️ Agendar Instalación
            </button>
          </div>
        </>
      )}

      {/* 🔥 Estilos para el Loader */}
      <style jsx>{`
        .loader {
          border-width: 4px;
          border-style: solid;
          border-color: white transparent white transparent;
        }
      `}</style>
    </div>
  );
}
