"use client";

import { useEffect, useState } from "react";
import { db } from "../../../firebase/firebaseConfig";
import {
  collection,
  query,
  where,
  onSnapshot,
  orderBy,
} from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function QuoteList() {
  const [quotes, setQuotes] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchQuotes = async () => {
      const q = query(collection(db, "quotes"), orderBy("created_at", "desc"));

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const fetchedQuotes = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setQuotes(fetchedQuotes);
      });
      return unsubscribe;
    };

    fetchQuotes();
  }, []);

  return (
    <div className="bg-gray-800 p-4 rounded shadow">
      {quotes.length > 0 ? (
        <table className="table-auto w-full text-left">
          <thead>
            <tr>
              <th className="p-2">Cliente</th>
              <th className="p-2">Estado</th>
              <th className="p-2">Acción</th>
              <th className="p-2">fecha Cotización</th>
            </tr>
          </thead>
          <tbody>
            {quotes.map(
              (quote) => {
                const date = quote.created_at.toDate();
                const formattedDateTime = date.toLocaleString("es-CL", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false, // Para formato 24 horas
                });
                return (
                  <tr key={quote.id}>
                    <td className="p-2">{quote.customer_info.name}</td>
                    <td className="p-2">{quote.status}</td>
                    <td className="p-2">{formattedDateTime}</td>
                    <td className="p-2">
                      <button
                        onClick={() =>
                          router.push(`/dashboard/quote/${quote.id}`)
                        }
                        className="bg-primary text-white px-4 py-1 rounded"
                      >
                        Ver Detalle
                      </button>
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      ) : (
        <p>No tienes cotizaciones asignadas.</p>
      )}
    </div>
  );
}
