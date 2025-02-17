import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../firebase/firebaseConfig"; // 🔥 Importamos la configuración de Firebase
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  try {
    const { customer_info, services, global_discount, notes, status } =
      req.body;

    // Validación básica
    if (!customer_info || !services || services.length === 0) {
      return res.status(400).json({ error: "Datos incompletos" });
    }

    const quotesCollection = collection(db, "quotes"); // 📌 Referencia a la colección "quotes"

    // Guardamos la cotización en Firestore con timestamp
    const docRef = await addDoc(quotesCollection, {
      customer_info,
      services,
      global_discount: global_discount || 0, // Si no hay descuento, usa 0
      notes, // Si no hay nota, usa un string vacío
      status: status || "pending", // Si no hay estado, se marca como "pending"
      created_at: serverTimestamp(), // 🔥 Guarda la fecha de creación automáticamente
    });

    return res.status(200).json({ success: true, id: docRef.id });
  } catch (error) {
    console.error("❌ Error al guardar la cotización:", error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
}
