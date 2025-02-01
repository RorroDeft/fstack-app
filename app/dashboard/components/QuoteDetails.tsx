import { useState } from "react";

export default function QuoteDetails({ quote }) {
  const [prices, setPrices] = useState(quote.services);

  const handlePriceChange = (serviceId, newPrice) => {
    setPrices((prev) =>
      prev.map((service) =>
        service.id === serviceId
          ? { ...service, adjusted_price: newPrice }
          : service
      )
    );
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Detalles de Cotización</h2>
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
            </tr>
          </thead>
          <tbody>
            {prices.map((service) => (
              <tr key={service.id}>
                <td>{service.name}</td>
                <td>{service.base_price}</td>
                <td>
                  <input
                    type="number"
                    value={service.adjusted_price || service.base_price}
                    onChange={(e) =>
                      handlePriceChange(service.id, e.target.value)
                    }
                    className="w-full p-2 rounded bg-gray-700 text-white"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
