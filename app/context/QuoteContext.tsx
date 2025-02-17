"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { services } from "../../data/services";
type VehicleType =
  | "Sedan/Hatchback"
  | "SUV"
  | "Pickup / 3 Corridas de asientos"
  | "Pickup XL"
  | "Musclecar"
  | "Coupé/Deportivo";
interface Service {
  id: string;
  name: string;
  base_price: number;
  adjusted_price: number;
  size_price?: Record<VehicleType, number>;
  quantity: number;
  image?: string;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const QuoteContext = createContext<any>(null);

export function QuoteProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Service[]>([]);

  // ✅ Cargar vehículo del cliente desde localStorage
  const getVehicleData = () => {
    if (typeof window !== "undefined") {
      return JSON.parse(localStorage.getItem("vehicleFormData") || "{}");
    }
    return {};
  };

  // ✅ Cargar servicios cotizados desde localStorage (Evita errores SSR)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedServices = localStorage.getItem("quoteServices");
      if (storedServices) {
        setCart(JSON.parse(storedServices));
      }
    }
  }, []);

  // ✅ Guardar cambios en localStorage cuando cambia el carrito
  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem("quoteServices", JSON.stringify(cart));
    } else {
      localStorage.removeItem("quoteServices");
    }
  }, [cart]);

  // ✅ Función para obtener el precio correcto según el vehículo
  const getPriceForVehicle = (serviceId: string) => {
    const vehicle = getVehicleData();
    const service = services.find((s) => s.id === serviceId);
    if (!service) return 0;

    // Si el servicio tiene precios por tamaño de auto
    if (service.size_price && vehicle.vehicleType) {
      return (
        service.size_price[
          vehicle.vehicleType as keyof typeof service.size_price
        ] || service.base_price
      );
    }

    return service.base_price; // Fallback al precio base
  };

  // ✅ Agregar servicio a la cotización (incluyendo `quantity` y `adjusted_price`)
  const addToQuote = (serviceId: string) => {
    const service = services.find((s) => s.id === serviceId);
    if (!service) return;

    const price = getPriceForVehicle(serviceId);

    const newService: Service = {
      id: service.id,
      name: service.name,
      base_price: price,
      adjusted_price: 0, // 🔥 Se mantiene en `0` hasta que el vendedor lo modifique
      quantity: service.quantity, // 🔢 Cantidad inicial por defecto
      image: service.defaultGallery?.[0] || "", // ✅ Primera imagen como preview
    };

    setCart((prevCart) => {
      if (!prevCart.some((s) => s.id === serviceId)) {
        return [...prevCart, newService];
      }
      return prevCart;
    });
  };

  // ✅ Eliminar servicio de la cotización
  const removeFromQuote = (serviceId: string) => {
    setCart((prevCart) => prevCart.filter((s) => s.id !== serviceId));
  };

  // ✅ Vaciar toda la cotización
  const clearQuote = () => {
    setCart([]);
  };

  return (
    <QuoteContext.Provider
      value={{ cart, addToQuote, removeFromQuote, clearQuote }}
    >
      {children}
    </QuoteContext.Provider>
  );
}

export function useQuote() {
  return useContext(QuoteContext);
}
