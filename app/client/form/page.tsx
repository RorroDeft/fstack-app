"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function VehicleFormPage() {
  const router = useRouter();

  // Aseguramos que los hooks siempre se llamen en el mismo orden
  const [isClient, setIsClient] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    brand: "",
    model: "",
    year: "",
    version: "",
    vehicleType: "",
  });

  const [errors, setErrors] = useState({
    email: false,
    phone: false,
    year: false,
  });
  
  const vehicleTypes = [
    "Sedan/Hatchback",
    "SUV",
    "Pickup / 3 Corridas de asientos",
    "Pickup XL",
    "Musclecar",
    "Coupé/Deportivo",
  ];

  useEffect(() => {
    setIsClient(true);
  }, []);

  // **IMPORTANTE**: Evita el error de hidratación retornando `null` si aún no se ha montado el cliente
  if (!isClient) return null;

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validatePhone = (phone: string) => /^\+56\s?\d{9}$/.test(phone);

  const validateYear = (year: string) =>
    /^\d{4}$/.test(year) &&
    Number(year) >= 1900 &&
    Number(year) <= new Date().getFullYear();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "email")
      setErrors((prev) => ({ ...prev, email: !validateEmail(value) }));
    if (name === "phone")
      setErrors((prev) => ({ ...prev, phone: !validatePhone(value) }));
    if (name === "year")
      setErrors((prev) => ({ ...prev, year: !validateYear(value) }));
  };

  const isFormValid =
    formData.name &&
    formData.email &&
    formData.phone &&
    formData.brand &&
    formData.model &&
    formData.year &&
    formData.version &&
    formData.vehicleType &&
    !errors.email &&
    !errors.phone &&
    !errors.year;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid) {
      console.log("✅ Formulario enviado con éxito:", formData);
      localStorage.setItem("vehicleFormData", JSON.stringify(formData));
      document.cookie = "formPassed=true; path=/; max-age=1800";
      router.push("/client/services");
    } else {
      alert("❌ Por favor, revisa los campos.");
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-gray-800 p-6 rounded-lg shadow-lg mt-10 text-white">
      <h2 className="text-2xl font-bold mb-4">
        Ingresa los datos de tu vehículo
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Nombre"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full p-2 rounded bg-gray-700 text-white"
        />

        <input
          type="email"
          name="email"
          placeholder="Correo Electrónico"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full p-2 rounded bg-gray-700 text-white"
        />
        {errors.email && (
          <p className="text-red-500 text-sm">❌ Correo inválido</p>
        )}

        <input
          type="text"
          name="phone"
          placeholder="+56 912345678"
          value={formData.phone}
          onChange={handleChange}
          required
          className="w-full p-2 rounded bg-gray-700 text-white"
        />
        {errors.phone && (
          <p className="text-red-500 text-sm">
            ❌ Formato incorrecto (ej: +56 912345678)
          </p>
        )}

        <input
          type="text"
          name="brand"
          placeholder="Marca (Ej: Mazda, Toyota)"
          value={formData.brand}
          onChange={handleChange}
          required
          className="w-full p-2 rounded bg-gray-700 text-white"
        />

        <input
          type="text"
          name="model"
          placeholder="Modelo (Ej: CX-5, Corolla)"
          value={formData.model}
          onChange={handleChange}
          required
          className="w-full p-2 rounded bg-gray-700 text-white"
        />

        <input
          type="text"
          name="year"
          placeholder="Año (Ej: 2024)"
          value={formData.year}
          onChange={handleChange}
          required
          className="w-full p-2 rounded bg-gray-700 text-white"
        />
        {errors.year && (
          <p className="text-red-500 text-sm">
            ❌ Ingresa un año válido (Ej: 2024)
          </p>
        )}

        <input
          type="text"
          name="version"
          placeholder="Versión (Ej: Touring, Sport)"
          value={formData.version}
          onChange={handleChange}
          required
          className="w-full p-2 rounded bg-gray-700 text-white"
        />

        <select
          name="vehicleType"
          value={formData.vehicleType}
          onChange={handleChange}
          required
          className="w-full p-2 rounded bg-gray-700 text-white"
        >
          <option value="">Selecciona el tipo de vehículo</option>
          {vehicleTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>

        <button
          type="submit"
          disabled={!isFormValid}
          className={`w-full py-2 rounded ${
            isFormValid
              ? "bg-primary text-white"
              : "bg-gray-500 cursor-not-allowed"
          }`}
        >
          Siguiente
        </button>
      </form>
    </div>
  );
}
