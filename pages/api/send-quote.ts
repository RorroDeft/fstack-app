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

  try {
    await new Promise<void>((resolve, reject) => {
      form.parse(req, async (err, fields, files) => {
        if (err) {
          console.error("Error al parsear el formulario:", err);
          res
            .status(500)
            .json({ message: "Error al procesar el formulario", error: err });
          return reject(err);
        }

        try {
          // Extraer el quoteId desde fields (viene como string o array)
          const { quoteId } = fields;
          const quoteIdValue = Array.isArray(quoteId) ? quoteId[0] : quoteId;
          const docRef = doc(db, "quotes", quoteIdValue as string);
          const docSnap = await getDoc(docRef);

          if (!docSnap.exists()) {
            res.status(404).json({ message: "Cotización no encontrada" });
            return reject("Cotización no encontrada");
          }

          const quoteData = docSnap.data();
          const { customer_info, services, global_discount } = quoteData;

          // Obtener el nuevo número de cotización
          const quoteNumber = await getNextCotizacionNumber();

          // Calcular total neto
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

          // Procesar las imágenes (ahora soportando múltiples archivos)
          const imageAttachments: Array<{
            buffer: Buffer;
            filename: string;
            mimetype?: string;
          }> = [];
          if (files.image) {
            const imageFiles = Array.isArray(files.image)
              ? files.image
              : [files.image];
            imageFiles.forEach((file) => {
              const buffer = fs.readFileSync(file.filepath);
              // Se proporciona un valor por defecto si originalFilename es null
              const filename = file.originalFilename ?? "imagen-sin-nombre.jpg";
              const mimetype = file.mimetype || "application/octet-stream";
              imageAttachments.push({ buffer, filename, mimetype });
            });
          }

          // Enviar el correo, pasando las imágenes (si existen)
          await sendEmailWithQuote(
            customer_info,
            services,
            totalNet,
            pdfBlob,
            imageAttachments
          );

          // Responder con éxito
          res.status(200).json({
            message: "Cotización enviada con éxito",
            quoteNumber,
          });
          return resolve();
        } catch (error) {
          console.error("❌ Error al enviar la cotización:", error);
          res
            .status(500)
            .json({ message: "Error al enviar la cotización", error });
          return reject(error);
        }
      });
    });
  } catch (error) {
    console.log(error);
    // La respuesta ya se envió en el callback, solo se captura el error aquí.
    return;
  }
}
