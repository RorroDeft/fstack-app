"use client";
import { categories } from "@/data/categories";
import { useState, useEffect, useMemo } from "react";
import CategoryFilter from "../components/CategoryFilter";
import { services } from "@/data/services";
import ServiceCard from "../components/ServiceCard";
import QuoteButton from "../components/QuoteButton";
import { useQuote } from "../../context/QuoteContext";

export default function ServicesPage() {
  const [activeCategory, setActiveCategory] = useState<string>("all"); // 🔹 "all" por defecto
  const [vehicleData, setVehicleData] = useState<any>(null); // 🚗 Datos del auto ingresado
  const { cart } = useQuote();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const fetchVehicleData = () => {
        const storedVehicleData = localStorage.getItem("vehicleFormData");
        console.log("Datos cargados desde localStorage:", storedVehicleData);
        console.log(storedVehicleData);
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
    if (!vehicleData) return services; // Si no hay datos, mostrar todo

    const { brand, model, year, vehicleType } = vehicleData;
    const vehicleKey = `${brand.toLowerCase()}-${model.toLowerCase()}-${year}`;
    const highEndBrands = ["ferrari", "porsche", "mercedes-amg", "lamborghini"];

    console.log("🚗 Vehicle Data:", vehicleData);
    console.log("🔎 Vehicle Key:", vehicleKey);

    return services.filter((service) => {
      console.log(
        `🛠 Evaluando: ${service.name} -> ${service.exclusiveCategory}`
      );

      // 🔹 1️⃣ Servicios exclusivos por modelo
      if (service.exclusiveCategory.includes(vehicleKey)) {
        console.log(`✅ Se incluyó por modelo: ${vehicleKey}`);
        return true;
      }

      // 🔹 2️⃣ Servicios exclusivos por marca
      if (service.exclusiveCategory.includes(brand.toLowerCase())) {
        console.log(`✅ Se incluyó por marca: ${brand.toLowerCase()}`);
        return true;
      }

      // 🔹 3️⃣ Servicios exclusivos para autos 2025
      if (
        year === 2025 &&
        service.exclusiveCategory.includes("exclusivo-2025")
      ) {
        console.log(`✅ Se incluyó por ser auto 2025`);
        return true;
      }

      // 🔹 4️⃣ Servicios exclusivos para alta gama
      if (
        highEndBrands.includes(brand.toLowerCase()) &&
        service.exclusiveCategory.includes("alta-gama")
      ) {
        console.log(`✅ Se incluyó por ser alta gama`);
        return true;
      }

      // 🔹 5️⃣ Si no coincide con nada, mostrar los servicios por defecto
      if (service.exclusiveCategory.includes("default")) {
        console.log(`✅ Se incluyó por defecto`);
        return true;
      }

      return false;
    });
  }, [vehicleData]);

  // ✅ `useMemo` para mejorar el rendimiento al filtrar categorías
  const filteredCategories = useMemo(() => {
    if (!filteredServices.length) return categories; // ✅ Si no hay servicios, devolver todas las categorías

    // 🔹 Verifica si el vehículo es 2025
    const isVehicle2025 = vehicleData?.year === 2025;

    // 🔹 Filtra las categorías según los servicios disponibles
    let availableCategories = categories.filter((cat) =>
      filteredServices.some((service) => service.category === cat.id)
    );

    // 🔹 Si el vehículo NO es 2025, eliminamos "Exclusivo 2025"
    if (!isVehicle2025) {
      availableCategories = availableCategories.filter(
        (cat) => cat.id !== "exclusive-2025"
      );
    }

    // 🔹 Mantiene la categoría seleccionada activa
    return activeCategory === "all"
      ? availableCategories
      : availableCategories.filter((cat) => cat.id === activeCategory);
  }, [filteredServices, activeCategory, vehicleData]);

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
        {/* ✅ Botón "Ver Cotización" en la parte superior derecha */}
        <div className="quote-button mt-16 md:mt-0">
          <QuoteButton />
        </div>

        {filteredCategories.map((category) => (
          <div key={category.id} className="mb-8">
            <h3 className="text-xl font-bold mb-4 text-primary">
              {category.name}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredServices
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
