"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { db } from "../../../../firebase/firebaseConfig";
import { doc, getDoc, updateDoc, collection, addDoc } from "firebase/firestore";

export default function QuoteDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const [quote, setQuote] = useState<any>(null);
  const [note, setNote] = useState<string>(""); // Campo para la nota
  const [newService, setNewService] = useState({ name: "", price: 0 }); // Estado para el nuevo ítem
  const [loading, setLoading] = useState(true);
  const [globalDiscount, setGlobalDiscount] = useState<number>(0);

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const docRef = doc(db, "quotes", id as string);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setQuote(data);
          setNote(data.note || "");
          setGlobalDiscount(data.global_discount || 0);
        } else {
          alert("La cotización no existe.");
          router.push("/dashboard");
        }
      } catch (error) {
        console.error("Error al obtener la cotización:", error);
        alert("Hubo un problema al cargar la cotización.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuote();
  }, [id]);

  const calculateTotalWithDiscount = () => {
    if (!quote || !quote.services) {
      return { subtotal: 0, total: 0, iva: 0, toPay: 0 };
    }

    const subtotal = quote.services.reduce((acc: number, service: any) => {
      return (
        acc +
        (service.adjusted_price || service.base_price) * (service.quantity || 1)
      );
    }, 0);

    const discountAmount = globalDiscount || 0;
    const total = subtotal - discountAmount;
    const iva = total * 0.19;
    const toPay = total + iva;
    return { subtotal, total, iva, toPay };
  };

  const handlePriceChange = (serviceId: string, newPrice: number) => {
    setQuote((prevQuote: any) => ({
      ...prevQuote,
      services: prevQuote.services.map((service: any) =>
        service.id === serviceId
          ? { ...service, adjusted_price: newPrice }
          : service
      ),
    }));
  };

  const handleQuantityChange = (serviceId: string, newQuantity: number) => {
    console.log(serviceId, newQuantity);
    setQuote((prevQuote: any) => ({
      ...prevQuote,
      services: prevQuote.services.map((service: any) =>
        service.id === serviceId
          ? { ...service, quantity: newQuantity === 0 ? 1 : newQuantity }
          : service
      ),
    }));
    console.log(quote);
  };

  const handleAddService = async () => {
    if (!newService.name || newService.price <= 0) {
      alert("Por favor, completa todos los campos correctamente.");
      return;
    }

    const newServiceItem = {
      id: Date.now().toString(),
      name: newService.name,
      base_price: newService.price,
      adjusted_price: newService.price,
      quantity: 1,
    };

    const updatedServices = [...(quote?.services || []), newServiceItem];

    try {
      setQuote((prevQuote: any) => ({
        ...prevQuote,
        services: updatedServices,
      }));

      const docRef = doc(db, "quotes", id as string);
      await updateDoc(docRef, { services: updatedServices });

      alert("Servicio agregado correctamente.");
    } catch (error) {
      console.error("Error al agregar el servicio:", error);
      alert("Hubo un error al agregar el servicio.");
    }

    setNewService({ name: "", price: 0 });
  };

  const handleDeleteService = async (serviceId: string) => {
    if (
      !window.confirm("¿Estás seguro de que deseas eliminar este servicio?")
    ) {
      return;
    }

    const updatedServices = quote.services.filter(
      (service: any) => service.id !== serviceId
    );

    try {
      setQuote((prevQuote: any) => ({
        ...prevQuote,
        services: updatedServices,
      }));

      const docRef = doc(db, "quotes", id as string);
      await updateDoc(docRef, { services: updatedServices });

      alert("Servicio eliminado correctamente.");
    } catch (error) {
      console.error("Error al eliminar el servicio:", error);
      alert("Hubo un error al eliminar el servicio.");
    }
  };

  const handleSaveChanges = async () => {
    try {
      const docRef = doc(db, "quotes", id as string);
      await updateDoc(docRef, {
        services: quote.services,
        status: "Actualizada",
        note,
        global_discount: globalDiscount,
      });

      alert("Cambios guardados");
    } catch (error) {
      console.error("❌ Error al guardar cambios:", error);
      alert("Hubo un error al guardar los cambios.");
    }
  };

  const handleSendQuote = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/send-quote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ quoteId: id }),
      });

      if (!response.ok) {
        throw new Error("Error al enviar la cotización");
      }

      alert("✅ Cotización enviada con éxito");

      const docRef = doc(db, "quotes", id as string);
      await updateDoc(docRef, { status: "Enviada" });
    } catch (error) {
      console.error("❌ Error al enviar la cotización:", error);
      alert("Hubo un error al enviar la cotización. Inténtalo nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Cargando detalles...</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Detalles de la Cotización</h2>

      <div className="bg-gray-800 p-4 rounded shadow">
        <p>
          <strong>Cliente:</strong> {quote.customer_info.name}
        </p>
        <p>
          <strong>Email:</strong> {quote.customer_info.email}
        </p>

        <table className="table-auto w-full mt-4">
          <thead>
            <tr>
              <th>Servicio</th>
              <th>Precio Base</th>
              <th>Precio Ajustado</th>
              <th>Cantidad</th>
              <th>Total</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {quote.services.map((service: any) => (
              <tr key={service.id}>
                <td>{service.name}</td>
                <td>${service.base_price}</td>
                <td>
                  <input
                    type="number"
                    value={service.adjusted_price || service.base_price}
                    onChange={(e) =>
                      handlePriceChange(service.id, Number(e.target.value))
                    }
                    className="w-full p-2 rounded bg-gray-700 text-white"
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={service.quantity || 1}
                    onChange={(e) =>
                      handleQuantityChange(service.id, Number(e.target.value))
                    }
                    className="w-full p-2 rounded bg-gray-700 text-white"
                  />
                </td>
                <td>
                  $
                  {(
                    (service.adjusted_price || service.base_price) *
                    (service.quantity || 1)
                  ).toLocaleString()}
                </td>
                <td>
                  <button
                    onClick={() => handleDeleteService(service.id)}
                    className="bg-red-600 text-white px-4 py-2 rounded"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Formulario para agregar nuevo ítem */}
        <div className="mt-4">
          <h3 className="text-lg font-bold text-white mb-2">
            Agregar nuevo servicio
          </h3>
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Nombre del servicio"
              value={newService.name}
              onChange={(e) =>
                setNewService((prev) => ({ ...prev, name: e.target.value }))
              }
              className="w-full p-2 rounded bg-gray-700 text-white"
            />
            <input
              type="number"
              placeholder="Precio"
              value={newService.price}
              onChange={(e) =>
                setNewService((prev) => ({
                  ...prev,
                  price: Number(e.target.value),
                }))
              }
              className="w-full p-2 rounded bg-gray-700 text-white"
            />
            <button
              onClick={handleAddService}
              className="bg-primary text-white px-4 py-2 rounded"
            >
              Agregar
            </button>
          </div>
        </div>

        {/* Campo de texto para la nota */}
        <div className="mt-4">
          <label className="block text-white font-bold mb-2">
            Nota sobre el cliente:
          </label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="w-full p-2 rounded bg-gray-700 text-white"
            placeholder="Escribe aquí una nota sobre el cliente..."
          />
        </div>

        <div className="mt-4">
          <p>
            <strong>Subtotal:</strong> $
            {calculateTotalWithDiscount().subtotal.toLocaleString()}
          </p>
          <p>
            <strong>Descuento:</strong> ${globalDiscount.toLocaleString()}
          </p>
          <p>
            <strong>Total con Descuento:</strong> $
            {calculateTotalWithDiscount().total.toLocaleString()}
          </p>
          <p>
            <strong>IVA (19%):</strong> $
            {calculateTotalWithDiscount().iva.toLocaleString()}
          </p>
          <p>
            <strong>A pagar:</strong> $
            {calculateTotalWithDiscount().toPay.toLocaleString()}
          </p>
        </div>
        <div className="mt-4">
          <label className="block text-white font-bold mb-2">
            Descuento Global ($):
          </label>
          <input
            type="number"
            value={globalDiscount}
            onChange={(e) => setGlobalDiscount(Number(e.target.value))}
            className="w-full p-2 rounded bg-gray-700 text-white"
            placeholder="Ingrese un descuento"
          />
        </div>

        <div className="flex gap-4 mt-4">
          <button
            onClick={handleSaveChanges}
            className={`bg-primary text-white px-4 py-2 rounded ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Guardando..." : "Guardar Cambios"}
          </button>
          <button
            onClick={handleSendQuote}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Enviar Cotización
          </button>
        </div>
      </div>
    </div>
  );
}
