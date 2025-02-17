import { useRouter } from "next/navigation";
import { useQuote } from "../../context/QuoteContext";

export default function QuoteButton() {
  const router = useRouter();
  const { cart } = useQuote(); // Obtener servicios agregados desde el contexto

  return (
    <button
      onClick={() => router.push("/client/summary")}
      className="
    absolute right-4 bg-primary text-white px-4 py-2 rounded-lg shadow-md 
    hover:bg-orange-500 transition-all duration-300
    top-1 md:top-6 lg:top-8
    md:fixed lg:fixed
    mb-6"
    >
      🛒 Cotización ({cart.length})
    </button>
  );
}
