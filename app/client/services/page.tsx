"use client";
import { categories } from "@/data/categories";
import { useState, useEffect, useMemo } from "react";
import CategoryFilter from "../components/CategoryFilter";
import { services } from "@/data/services";
import ServiceCard from "../components/ServiceCard";
import QuoteButton from "../components/QuoteButton";
import { useQuote } from "../../context/QuoteContext";
interface Service {
  id: string;
  // otras propiedades según corresponda...
}
export default function ServicesPage() {
  const [activeCategory, setActiveCategory] = useState<string>("all"); // 🔹 "all" por defecto
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [vehicleData, setVehicleData] = useState<any>(null); // 🚗 Datos del auto ingresado
  const { cart } = useQuote();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const fetchVehicleData = () => {
        const storedVehicleData = localStorage.getItem("vehicleFormData");
        console.log("Datos cargados desde localStorage:", storedVehicleData);
        if (storedVehicleData) {
          setVehicleData(JSON.parse(storedVehicleData));
        }
      };

      fetchVehicleData();

      // 🔄 Volver a ejecutar si `storage` cambia
      window.addEventListener("storage", fetchVehicleData);

      return () => {
        window.removeEventListener("storage", fetchVehicleData);
      };
    }
  }, []);

  const filteredServices = useMemo(() => {
    if (!vehicleData) return services;

    const { brand, model, year } = vehicleData;
    const vehicleKey = `${brand.toLowerCase()}-${model.toLowerCase()}-${year}`;
    const highEndBrands = ["ferrari", "porsche", "mercedes-amg", "lamborghini"];

    let filtered = services.filter((service) => {
      if (service.exclusiveCategory.includes(vehicleKey)) return true;
      if (service.exclusiveCategory.includes(brand.toLowerCase())) return true;
      if (year === 2025 && service.exclusiveCategory.includes("exclusivo-2025"))
        return true;
      if (
        highEndBrands.includes(brand.toLowerCase()) &&
        service.exclusiveCategory.includes("alta-gama")
      )
        return true;
      return service.exclusiveCategory.includes("default");
    });

    // ✅ Filtra solo los servicios por categoría activa, NO las categorías
    if (activeCategory !== "all") {
      filtered = filtered.filter(
        (service) => service.category === activeCategory
      );
    }

    return filtered;
  }, [vehicleData, activeCategory]);

  // ✅ `useMemo` para mejorar el rendimiento al filtrar categorías
  const filteredCategories = useMemo(() => {
    if (!services.length) return categories;

    const isVehicle2025 = vehicleData?.year === 2025;

    let availableCategories = categories.filter(
      (cat) => services.some((service) => service.category === cat.id) // 🔹 NOTA: Se usa `services`, NO `filteredServices`
    );

    // ✅ Ocultar "Exclusivo 2025" si no hay servicios de esa categoría y el auto NO es 2025
    availableCategories = availableCategories.filter(
      (cat) =>
        cat.id !== "exclusive-2025" ||
        (isVehicle2025 &&
          services.some((service) => service.category === "exclusive-2025"))
    );

    // ✅ Asegurar que "Todas las Categorías" siempre esté disponible
    return [
      { id: "all", name: "Todas las Categorías" },
      ...availableCategories,
    ];
  }, [services, vehicleData]); // 🔹 Se basa en `services`, NO `filteredServices`

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    if (typeof window !== "undefined") {
      localStorage.setItem("selectedCategory", category);
    }
  };

  return (
    <div className="relative flex flex-col md:flex-row gap-8 px-4 md:px-8 lg:px-16 min-h-screen">
      {/* 🖥 Sidebar en Desktop y Tablet */}
      <aside className="hidden md:block md:w-1/4 lg:w-1/5 self-start sticky top-4">
        <CategoryFilter
          categories={filteredCategories}
          onSelectCategory={handleCategoryChange}
        />
      </aside>

      {/* 📱 Botón "Filtrar" flotante en Mobile */}
      <div className="md:hidden z-[60]">
        <CategoryFilter
          categories={filteredCategories}
          onSelectCategory={handleCategoryChange}
        />
      </div>

      {/* 📌 Catálogo de Servicios */}
      <section className="flex-1 pb-24">
        {/* ✅ Botón "Ver Cotización" en la parte superior derecha */}
        <div className="quote-button mt-16 md:mt-0">
          <QuoteButton />
        </div>

        {filteredCategories.map((category) => {
          const categoryServices = filteredServices.filter(
            (service) => service.category === category.id
          );

          // 🔹 Si la categoría no tiene servicios y NO estamos en "Todas las Categorías", no la mostramos
          if (categoryServices.length === 0 && activeCategory !== "all")
            return null;

          return (
            <div key={category.id} className="mb-8">
              <h3 className="text-xl font-bold mb-4 text-primary">
                {category.name}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {categoryServices.map((service) => (
                  <ServiceCard
                    key={service.id}
                    service={service}
                    addedToQuote={cart.some(
                      (s: Service) => s.id === service.id
                    )}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
}
