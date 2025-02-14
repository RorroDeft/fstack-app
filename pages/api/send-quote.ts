import type { NextApiRequest, NextApiResponse } from "next";
import { IncomingForm } from "formidable";
import fs from "fs";
import { generatePdf } from "../../utils/generatePdf";
import { sendEmailWithQuote } from "../../utils/sendEmail";
import { db } from "../../firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { getNextCotizacionNumber } from "../../utils/quotesCounter";

// Desactiva el bodyParser para procesar multipart/form-data
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Método no permitido" });
  }

  const form = new IncomingForm();

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error("Error al parsear el formulario:", err);
      return res
        .status(500)
        .json({ message: "Error al procesar el formulario", error: err });
    }

    try {
      // Extraer el quoteId desde fields (viene como string)
      const { quoteId } = fields;
      const quoteIdValue = Array.isArray(quoteId) ? quoteId[0] : quoteId;
      const docRef = doc(db, "quotes", quoteIdValue as string);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        return res.status(404).json({ message: "Cotización no encontrada" });
      }

      const quoteData = docSnap.data();
      const { customer_info, services, global_discount } = quoteData;

      // Obtener el nuevo número de cotización
      const quoteNumber = await getNextCotizacionNumber();

      // Calcular total neto
      const totalNet = services.reduce((sum: number, service: any) => {
        return (
          sum +
          (service.adjusted_price || service.base_price) * service.quantity
        );
      }, 0);

      // Generar el PDF
      const pdfBlob = generatePdf(
        quoteNumber,
        customer_info,
        services,
        totalNet,
        global_discount
      );

      // Procesar la imagen, si se envió
      let imageBuffer: Buffer | undefined = undefined;
      let imageFilename: string | undefined = undefined;
      if (files.image) {
        // Si se envió un solo archivo (o toma el primero si se enviaron varios)
        const file = Array.isArray(files.image) ? files.image[0] : files.image;
        imageBuffer = fs.readFileSync(file.filepath);
        imageFilename = file.originalFilename;
      }

      // Enviar el correo, pasando la imagen (si existe) a sendEmailWithQuote
      await sendEmailWithQuote(
        customer_info,
        services,
        totalNet,
        pdfBlob,
        imageBuffer,
        imageFilename
      );

      // Responder con éxito
      res.status(200).json({
        message: "Cotización enviada con éxito",
        quoteNumber,
      });
    } catch (error) {
      console.error("❌ Error al enviar la cotización:", error);
      res.status(500).json({ message: "Error al enviar la cotización", error });
    }
  });
}
