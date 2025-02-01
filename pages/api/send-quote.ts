import type { NextApiRequest, NextApiResponse } from "next";
import { generatePdf } from "../../utils/generatePdf";
import { sendEmailWithQuote } from "../../utils/sendEmail";
import { db } from "../../firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Método no permitido" });
  }

  try {
    const { quoteId } = req.body;

    // Obtener datos de la cotización desde Firestore
    const docRef = doc(db, "quotes", quoteId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return res.status(404).json({ message: "Cotización no encontrada" });
    }

    const quoteData = docSnap.data();
    const { quoteNumber, customer_info, services, global_discount } = quoteData;

    const totalNet = services.reduce((sum, service) => {
      return (
        sum + (service.adjusted_price || service.base_price) * service.quantity
      );
    }, 0);

    console.log({ quoteNumber, customer_info, services , global_discount});
    // Generar el PDF
    const pdfBlob = generatePdf(
      quoteNumber,
      customer_info,
      services,
      totalNet,
      global_discount
    );

    // Enviar correo
    await sendEmailWithQuote(customer_info, services, totalNet, pdfBlob);

    // Actualizar el estado de la cotización (opcional)
    res.status(200).json({ message: "Cotización enviada con éxito" });
  } catch (error) {
    console.error("❌ Error al enviar la cotización:", error);
    res.status(500).json({ message: "Error al enviar la cotización", error });
  }
}
