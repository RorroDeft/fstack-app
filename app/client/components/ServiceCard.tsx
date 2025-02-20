"use client";
import { useRouter } from "next/navigation";

interface ServiceCardProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  service: any; // Puedes reemplazar 'any' por el tipo correcto si lo tienes definido
  addedToQuote: boolean;
}

export default function ServiceCard({ service, addedToQuote }: ServiceCardProps) {
  const router = useRouter();

  return (
    <div className="bg-gray-800 p-4 rounded shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-lg">
      <img
        src={service.image}
        alt={service.name}
        className="w-full h-52 object-cover rounded mb-4"
      />
      <h3 className="text-lg font-bold">{service.name}</h3>
      <p className="text-sm text-gray-400 mb-4">{service.shortDescription}</p>

      <div className="flex justify-center">
        {!addedToQuote ? (
          <button
            className="px-6 py-2 rounded bg-primary text-white transition duration-300 hover:bg-orange-500"
            onClick={() => router.push(`/client/services/${service.id}`)}
          >
            Cotizar
          </button>
        ) : (
          <p className="text-green-400 font-bold text-lg">✅ Agregado</p>
        )}
      </div>
    </div>
  );
}
