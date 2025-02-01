"use client";
import { categories } from "@/data/categories";
import { useState, useEffect } from "react";
import CategoryFilter from "../components/CategoryFilter";
import { services } from "@/data/services";
import ServiceCard from "../components/ServiceCard";
import QuoteButton from "../components/QuoteButton";

export default function ServicesPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [quoteServices, setQuoteServices] = useState<string[]>([]);

  useEffect(() => {
    const storedCategory = localStorage.getItem("selectedCategory");
    if (storedCategory) {
      setActiveCategory(storedCategory);
    }

    const storedServices = JSON.parse(
      localStorage.getItem("quoteServices") || "[]"
    );
    setQuoteServices(storedServices);
  }, []);

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    localStorage.setItem("selectedCategory", category);
  };

  const filteredCategories =
    activeCategory === "all"
      ? categories
      : categories.filter((cat) => cat.id === activeCategory);

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
        {/* ✅ Nuevo botón "Ver Cotización" en la parte superior derecha */}
        <div className="quote-button mt-16 md:mt-0">
          <QuoteButton />
        </div>

        {filteredCategories.map((category) => (
          <div key={category.id} className="mb-8">
            <h3 className="text-xl font-bold mb-4 text-primary">
              {category.name}
            </h3>

            <div
              className="grid gap-6"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
                gap: "1.5rem",
              }}
            >
              {services
                .filter((service) => service.category === category.id)
                .map((service) => (
                  <ServiceCard
                    key={service.id}
                    service={service}
                    addedToQuote={quoteServices.includes(service.id)}
                  />
                ))}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
