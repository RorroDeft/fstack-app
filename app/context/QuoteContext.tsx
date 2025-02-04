"use client";
import { createContext, useContext, useState, useEffect } from "react";

interface Service {
  id: string;
  name: string;
  base_price: number;
  adjusted_price?: number;
  image: string;
}

const QuoteContext = createContext<any>(null);

export function QuoteProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Service[]>([]); // ⬅ Inicializamos vacío

  // ✅ Cargar servicios desde `localStorage` SOLO en el cliente (para evitar errores de hidratación)
  useEffect(() => {
    const storedServices = localStorage.getItem("quoteServices");
    if (storedServices) {
      setCart(JSON.parse(storedServices));
    }
  }, []);

  // ✅ Guardar en `localStorage` cuando cambia el carrito
  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem("quoteServices", JSON.stringify(cart));
    } else {
      localStorage.removeItem("quoteServices"); // Limpia el `localStorage` si está vacío
    }
  }, [cart]);

  // ✅ Agregar servicio a la cotización (sin duplicados)
  const addToQuote = (service: Service) => {
    setCart((prevCart) => {
      if (!prevCart.some((s) => s.id === service.id)) {
        return [...prevCart, service];
      }
      return prevCart;
    });
  };

  // ✅ Eliminar servicio de la cotización
  const removeFromQuote = (serviceId: string) => {
    setCart((prevCart) => prevCart.filter((s) => s.id !== serviceId));
  };

  // ✅ Vaciar toda la cotizabase_priceción
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
