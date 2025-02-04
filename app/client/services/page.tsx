"use client";
import { categories } from "@/data/categories";
import { useState, useEffect, useMemo } from "react";
import CategoryFilter from "../components/CategoryFilter";
import { services } from "@/data/services";
import ServiceCard from "../components/ServiceCard";
import QuoteButton from "../components/QuoteButton";
import { useQuote } from "../../context/QuoteContext";

export default function ServicesPage() {
  const [activeCategory, setActiveCategory] = useState<string>("all"); // 🔹 Cambié null → "all"
  const { cart } = useQuote();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedCategory = localStorage.getItem("selectedCategory") || "all";
      setActiveCategory(storedCategory);
    }
  }, []);

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    if (typeof window !== "undefined") {
      localStorage.setItem("selectedCategory", category);
    }
  };

  // ✅ `useMemo` SIEMPRE se ejecuta en el mismo orden
  const filteredCategories = useMemo(() => {
    return activeCategory === "all"
      ? categories
      : categories.filter((cat) => cat.id === activeCategory);
  }, [activeCategory]);

  return (
    <div className="relative flex flex-col md:flex-row gap-8 px-4 md:px-8 lg:px-16 min-h-screen">
      {/* 🖥 Sidebar en Desktop y Tablet */}
      <aside className="hidden md:block md:w-1/4 lg:w-1/5 self-start sticky top-4">
        <CategoryFilter
          categories={categories}
          onSelectCategory={handleCategoryChange}
        />
      </aside>

      {/* 📱 Botón "Filtrar" flotante en Mobile */}
      <div className="md:hidden z-[60]">
        <CategoryFilter
          categories={categories}
          onSelectCategory={handleCategoryChange}
        />
      </div>

      {/* 📌 Catálogo de Servicios */}
      <section className="flex-1 pb-24">
        {/* ✅ Botón "Ver Cotización" fijo en la parte superior derecha */}
        <div className="quote-button mt-16 md:mt-0">
          <QuoteButton />
        </div>

        {filteredCategories.map((category) => (
          <div key={category.id} className="mb-8">
            <h3 className="text-xl font-bold mb-4 text-primary">
              {category.name}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {services
                .filter((service) => service.category === category.id)
                .map((service) => (
                  <ServiceCard
                    key={service.id}
                    service={service}
                    addedToQuote={cart.some((s) => s.id === service.id)}
                  />
                ))}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
