"use client";
import { createContext, useContext, useState } from "react";

interface Service {
  id: string;
  name: string;
  base_price: number;
  adjusted_price?: number;
  image: string;
}

const QuoteContext = createContext<any>(null);

export function QuoteProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Service[]>([]);

  const addToQuote = (service: Service) => {
    setCart((prevCart) => {
      if (!prevCart.some((s) => s.id === service.id)) {
        return [...prevCart, service];
      }
      return prevCart;
    });
  };

  return (
    <QuoteContext.Provider value={{ cart, addToQuote }}>
      {children}
    </QuoteContext.Provider>
  );
}

export function useQuote() {
  return useContext(QuoteContext);
}
