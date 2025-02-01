import { sendEmailWithQuote } from "../utils/sendEmail";

const testSendEmail = async () => {
  const customerInfo = {
    name: "Carlos Soto",
    email: "fernandezmadrid.rodrigo@gmail.com",
    brand: "Mazda",
    phone: "+569343252",
    model: "CX-5",
    year: 2023,
    quoteNumber:1001
  };

  const services = [
    { name: "PPF Consola Central", price: 39000 },
    { name: "PPF Pantalla Táctil", price: 10000 },
  ];

  const totalNet = services.reduce((sum, service) => sum + service.price, 0);

  try {
    await sendEmailWithQuote(customerInfo, services, totalNet);
    console.log("✅ Correo enviado con éxito");
  } catch (error) {
    console.error("❌ Error al enviar el correo:", error);
  }
};

testSendEmail();
