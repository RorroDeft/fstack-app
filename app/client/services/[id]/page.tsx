"use client";
import { useParams, useRouter } from "next/navigation";
import { services } from "@/data/services";
import { useQuote } from "../../../context/QuoteContext";

export default function ServiceDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const { cart, addToQuote } = useQuote();

  const service = services.find((s) => s.id === id);
  if (!service) return <p>Servicio no encontrado.</p>;

  const isAdded = cart.some((s) => s.id === id);

  const handleAddToQuote = () => {
    if (!isAdded) {
      addToQuote(service);
    }
  };

  return (
    <div className="bg-gray-900 p-8 rounded shadow-md text-white relative">
      {/* 🔹 Botón Volver */}
      <div className="absolute top-4 left-4 z-10">
        <button
          onClick={() => router.back()}
          className="bg-gray-700 text-white px-4 py-2 rounded shadow-lg hover:bg-gray-600 transition"
        >
          ⬅ Volver
        </button>
      </div>

      {/* Contenido del Servicio */}
      <h1 className="text-3xl font-bold mb-6 mt-12">{service.name}</h1>

      {/* Video Principal */}
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-2">Video del Servicio</h2>
        <iframe
          src={service.video}
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
          title="Video del Servicio"
          className="w-full h-64 rounded"
        ></iframe>
      </div>

      {/* Descripción */}
      <p className="text-lg mb-6">{service.description}</p>

      {/* Galería de Imágenes */}
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-2">Galería Antes/Después</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {service.defaultGallery.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Galería ${index + 1}`}
              className="w-full h-40 object-cover rounded shadow"
            />
          ))}
        </div>
      </div>

      {/* 🟢 Botón para agregar a la cotización */}
      <div className="flex justify-center mt-6">
        {!isAdded ? (
          <button
            className="px-6 py-3 rounded shadow-md bg-primary hover:bg-orange-500 text-white transition-all duration-300"
            onClick={handleAddToQuote}
          >
            Agregar a Cotización
          </button>
        ) : (
          <p className="text-green-400 font-bold text-lg animate-fade-in">
            ✅ Servicio agregado a la cotización.
          </p>
        )}
      </div>
    </div>
  );
}
