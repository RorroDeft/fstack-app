"use client";
import { useState } from "react";

interface Category {
  id: string;
  name: string;
}

interface CategoryFilterProps {
  categories: Category[];
  onSelectCategory: (categoryId: string) => void;
}
export default function CategoryFilter({
  categories,
  onSelectCategory,
}: CategoryFilterProps) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {/* Filtro lateral en Tablet y Desktop */}
      <div className="hidden md:block bg-gray-900 p-5 rounded-lg shadow-md">
        <h3 className="text-lg font-bold mb-3 text-white">Categorías</h3>
        <ul className="space-y-3">
          <li></li>
          {categories.map((category) => (
            <li key={category.id}>
              <button
                onClick={() => onSelectCategory(category.id)}
                className="block w-full text-left bg-gray-700 text-white px-5 py-2 rounded hover:bg-gray-600 transition duration-200"
              >
                {category.name}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* 🔹 Botón flotante SOLO en Mobile */}
      <button
        onClick={() => setShowModal(true)}
        className="fixed bottom-6 right-6 bg-primary text-white p-4 rounded-full shadow-lg md:hidden flex items-center gap-2 transition duration-200 hover:scale-110"
      >
        🔍 Filtrar
      </button>

      {/* Modal de Filtros en Mobile con animación */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[100] animate-fadeIn">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-11/12 max-w-md z-[110] relative animate-slideUp">
            <h2 className="text-white text-lg mb-4">
              Selecciona una categoría
            </h2>
            <ul className="space-y-3">
              {categories.map((category) => (
                <li key={category.id}>
                  <button
                    onClick={() => {
                      onSelectCategory(category.id);
                      setShowModal(false);
                    }}
                    className="block w-full text-left bg-gray-700 text-white px-5 py-2 rounded hover:bg-gray-600 transition duration-200"
                  >
                    {category.name}
                  </button>
                </li>
              ))}
            </ul>
            <button
              onClick={() => setShowModal(false)}
              className="w-full mt-4 bg-red-500 text-white px-5 py-2 rounded hover:bg-red-600 transition duration-200"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </>
  );
}
