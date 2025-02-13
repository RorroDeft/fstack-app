import nodemailer from "nodemailer";
import * as dotenv from "dotenv";

// Cargar el archivo .env.local manualmente
dotenv.config({ path: ".env.local" });
export const sendEmailWithQuote = async (
  customerInfo: any,
  services: any[],
  totalNet: number,
  pdfBlob: any
) => {
  // Calcular IVA y bruto
  const iva = totalNet * 0.19;
  const totalBruto = totalNet + iva;

  const pdfBuffer = Buffer.from(await pdfBlob.arrayBuffer());

  console.log(process.env.NEXT_PUBLIC_SMTP_HOST);
  // Configurar transporte con tu servidor SMTP
  const transporter = nodemailer.createTransport({
    host: process.env.NEXT_PUBLIC_SMTP_HOST,
    port: Number(process.env.NEXT_PUBLIC_SMTP_PORT),
    secure: process.env.NEXT_PUBLIC_SMTP_PORT === "465", // true si el puerto es 465
    auth: {
      user: process.env.NEXT_PUBLIC_SMTP_USER,
      pass: process.env.NEXT_PUBLIC_SMTP_PASS,
    },
  });

  // Configurar correo
  const mailOptions = {
    from: '"Karina de F-Stack " <no-reply@fstack.cl>', // Dirección "de"
    to: customerInfo.email, // Dirección del cliente
    cc: "rodriigo.madrid@gmail.com",
    subject: "Cotización de Servicios - F-Stack",
    text: `Hola ${customerInfo.name},

Gracias por confiar en F-Stack. Aquí tienes la cotización solicitada para tu vehículo:
    
- Total Bruto (IVA Incluido): $${totalBruto.toLocaleString("es-CL")} CLP.

Adjunto encontrarás un PDF con el detalle completo de los servicios y precios.

Saludos,
El Equipo de F-Stack
`,
    attachments: [
      {
        filename: "Cotizacion-FStack.pdf",
        content: pdfBuffer, // Buffer del PDF
        contentType: "application/pdf",
      },
    ],
  };

  // Enviar correo
  try {
    await transporter.sendMail(mailOptions);
    console.log("✅ Correo enviado con éxito.");
  } catch (error) {
    console.error("❌ Error al enviar el correo:", error);
    throw error;
  }
};
