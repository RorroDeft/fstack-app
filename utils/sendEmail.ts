import nodemailer from "nodemailer";

export const sendEmailWithQuote = async (
  customerInfo: any,
  services: any[],
  totalNet: number,
  pdfBlob: any,
  imageAttachments: Array<{
    buffer: Buffer;
    filename: string;
    mimetype?: string;
  }> = [] // valor por defecto vacío
) => {
  // Calcular IVA y total bruto
  const iva = totalNet * 0.19;
  const totalBruto = totalNet + iva;

  // Convertir el PDF Blob a Buffer
  const pdfBuffer = Buffer.from(await pdfBlob.arrayBuffer());

  // Configurar el transporte SMTP
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: process.env.SMTP_PORT === "465", // true si el puerto es 465
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  // Construir los attachments: el PDF siempre se adjunta
  const attachments = [
    {
      filename: "Cotizacion-FStack.pdf",
      content: pdfBuffer,
      contentType: "application/pdf",
    },
  ];
  // Si se ha enviado una imagen, agregarla al array de attachments
  imageAttachments.forEach((img) => {
    attachments.push({
      filename: img.filename,
      content: img.buffer,
      contentType: img.mimetype, // se establece según lo recibido
    });
  });

  // Configurar el correo
  const mailOptions = {
    from: '"Karina de F-Stack " <karinafernandez@fstack.cl>', // Dirección "de"
    to: customerInfo.email, // Dirección del cliente
    cc: process.env.CC_EMAIL,
    subject: "Cotización de Servicios - F-Stack",
    text: `Hola ${customerInfo.name},

Gracias por confiar en F-Stack. Aquí tienes la cotización solicitada para tu vehículo:
    
- Total Bruto (IVA Incluido): $${totalBruto.toLocaleString("es-CL")} CLP.

Adjunto encontrarás un PDF con el detalle completo de los servicios y precios.

Saludos,
El Equipo de F-Stack
`,
    attachments,
  };

  // Enviar el correo
  try {
    await transporter.sendMail(mailOptions);
    console.log("✅ Correo enviado con éxito.");
  } catch (error) {
    console.error("❌ Error al enviar el correo:", error);
    throw error;
  }
};
