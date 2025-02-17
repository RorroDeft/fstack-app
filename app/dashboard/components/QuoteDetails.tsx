import { useState } from "react";

export interface Service {
  id: string;
  name: string;
  base_price: number;
  adjusted_price?: number;
  // Puedes agregar otras propiedades que necesites, por ejemplo:
  // quantity?: number;
  // description?: string;
  // image?: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function QuoteDetails({ quote }: any) {
  const [prices, setPrices] = useState(quote.services);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handlePriceChange = (serviceId: any, newPrice: any) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setPrices((prev: any) =>
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      prev.map((service: any) =>
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
            {prices.map((service: Service) => (
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
