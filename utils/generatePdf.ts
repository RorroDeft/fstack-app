// import { jsPDF } from "jspdf";
// import autoTable from "jspdf-autotable";
// import { logoBase64 } from "./global";

// export const generatePdf = (
//   customerInfo: any,
//   services: any[],
//   totalNet: number
// ) => {

//   const doc = new jsPDF();

//   // Calcular IVA y bruto
//   const iva = totalNet * 0.19;
//   const totalBruto = totalNet + iva;

//   // Agregar logo
//   doc.addImage(logoBase64, "PNG", 10, 10, 40, 15); // Cambia la ruta según tu logo

//   // Encabezado
//   doc.setFontSize(16);
//   doc.text("Cotización de Servicios - F-Stack", 105, 20, { align: "center" });

//   // Fecha y número de cotización
//   doc.setFontSize(10);
//   const currentDate = new Date()
//     .toLocaleDateString("es-CL", {
//       day: "2-digit",
//       month: "2-digit",
//       year: "numeric",
//     })
//     .replace(/\//g, "-"); // Cambia las / por -
//   doc.text(`Fecha de emisión: ${currentDate}`, 10, 30);
//   doc.text( "", 10, 36);

//   // Datos del cliente
//   doc.text(`Cliente: ${customerInfo.name}`, 10, 50);
//   doc.text(`Correo: ${customerInfo.email}`, 10, 56);
//   doc.text(`Teléfono: ${customerInfo.phone}`, 10, 62);
//   doc.text(
//     `Vehículo: ${customerInfo.brand} ${customerInfo.model} (${customerInfo.year})`,
//     10,
//     68
//   );

//   // Tabla de servicios
//   autoTable(doc, {
//     startY: 80,
//     head: [["Nº", "Servicio", "Cantidad", "Precio Neto"]],
//     body: services.map((service, index) => [
//       index + 1,
//       service.name,
//       "1", // Cantidad predeterminada como "1"
//       `$${service.price.toLocaleString()}`,
//     ]),
//     headStyles: {
//       fillColor: [237, 107, 13], // Color naranja de tu marca en formato RGB
//       textColor: [255, 255, 255], // Texto blanco
//       fontStyle: "bold", // Negrita para destacar
//     },
//     bodyStyles: {
//       fillColor: [245, 245, 245], // Color de fondo claro para las filas
//       textColor: [0, 0, 0], // Texto negro
//     },
//     alternateRowStyles: {
//       fillColor: [250, 250, 250], // Alternar color de fondo para las filas
//     },
//   });

//   // Totales
//   let finalY = (doc as any).lastAutoTable.finalY + 10; // Obtener posición final de la tabla
//   doc.setFontSize(12);
//   doc.text("Resumen de Totales:", 10, finalY);
//   doc.text(`Neto: $${totalNet.toLocaleString()} `, 10, finalY + 10);
//   doc.text(`IVA (19%): $${iva.toLocaleString()} `, 10, finalY + 20);
//   doc.text(`Total Bruto: $${totalBruto.toLocaleString()} `, 10, finalY + 30);

//   // Observaciones
//   doc.text("Observaciones:", 10, finalY + 50);
//   doc.setFontSize(10);
//   doc.text(
//     "- La validez de esta cotización es de 15 días hábiles.\n- Los precios pueden variar dependiendo de las condiciones específicas del vehículo.",
//     10,
//     finalY + 60
//   );

//   // Pie de página
//   doc.setFontSize(8);
//   doc.text(
//     "F-Stack | Nos, Región Metropolitana | www.fstack.cl | Instagram: @fstack.prodetailing",
//     105,
//     290,
//     {
//       align: "center",
//     }
//   );

//   // Guardar como Blob para enviar por correo
//   return doc.output("blob");
// };

import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { logoBase64 } from "./global";

export const generatePdf = (
  quoteNumber: number,
  customerInfo: any,
  services: any[],
  totalNet: number,
  global_discount: number
) => {
  const doc = new jsPDF();

  // Calcular IVA y bruto
  const iva = (totalNet - global_discount) * 0.19;
  const totalBruto = totalNet - global_discount + iva;

  // Agregar logo
  doc.addImage(logoBase64, "PNG", 10, 10, 40, 15); // Cambia la ruta según tu logo

  // Encabezado
  doc.setFontSize(16);
  doc.text("Cotización de Servicios - F-Stack", 105, 20, { align: "center" });

  // Fecha y número de cotización
  doc.setFontSize(10);
  const currentDate = new Date()
    .toLocaleDateString("es-CL", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
    .replace(/\//g, "-"); // Cambia las / por -
  doc.text(`Fecha de emisión: ${currentDate}`, 10, 30);
  doc.text(`Cotización Nº: ${quoteNumber}`, 10, 36);

  // Datos del cliente
  doc.text(`Cliente: ${customerInfo.name}`, 10, 50);
  doc.text(`Correo: ${customerInfo.email}`, 10, 56);
  doc.text(`Teléfono: ${customerInfo.phone}`, 10, 62);
  doc.text(
    `Vehículo: ${customerInfo.brand} ${customerInfo.model} (${customerInfo.year})`,
    10,
    68
  );

  // Tabla de servicios
  autoTable(doc, {
    startY: 80,
    head: [["Nº", "Descripción", "Cantidad", "Valor Unitario"]],
    body: services.map((service, index) => [
      index + 1,
      service.name,
      service.quantity, // Cantidad predeterminada como "1"
      `$${service.adjusted_price.toLocaleString()}`,
    ]),
    headStyles: {
      fillColor: [237, 107, 13], // Color naranja de tu marca en formato RGB
      textColor: [255, 255, 255], // Texto blanco
      fontStyle: "bold", // Negrita para destacar
    },
    bodyStyles: {
      fillColor: [245, 245, 245], // Color de fondo claro para las filas
      textColor: [0, 0, 0], // Texto negro
    },
    alternateRowStyles: {
      fillColor: [250, 250, 250], // Alternar color de fondo para las filas
    },
  });

  // Totales
  const finalY = (doc as any).lastAutoTable.finalY + 10; // Obtener posición final de la tabla
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text("Resumen de Totales:", 10, finalY);
  doc.setFont("helvetica", "normal");
  doc.text(`Valor Neto: $${totalNet.toLocaleString()} `, 10, finalY + 6);
  doc.text(`Descuento: $${global_discount.toLocaleString()} `, 10, finalY + 12);
  doc.text(`IVA (19%): $${iva.toLocaleString()} `, 10, finalY + 18);
  doc.text(`A Pagar: $${totalBruto.toLocaleString()} `, 10, finalY + 24);

  // Observaciones
  doc.text("Observaciones:", 10, finalY + 50);
  doc.setFontSize(10);
  doc.text(
    "- La validez de esta cotización es de 7 días hábiles.\n- Los precios pueden variar dependiendo de las condiciones específicas del vehículo.",
    10,
    finalY + 60
  );

  // Pie de página
  doc.setFontSize(8);
  doc.text(
    "F-Stack | Nos, Región Metropolitana | www.fstack.cl | Instagram: @fstack.prodetailing",
    105,
    290,
    {
      align: "center",
    }
  );

  // Guardar como Blob para enviar por correo
  return doc.output("blob");
};
