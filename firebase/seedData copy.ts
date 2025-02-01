import { db } from "./firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

const seedQuotes = async () => {
  try {
    const quotesRef = collection(db, "quotes");

    // Documento de ejemplo
    const quoteData = {
      customer_info: {
        name: "Rodrigo",
        email: "fernandezmadrid.rodrigo@gmail.com",
        phone: "123456789",
        brand: "Mazda",
        model: "3",
        year: 2023
      },
      services: [
        {
          id: "kit_interior",
          name: "Kit Interior",
          price: 199000,
          details: {
            included_items: [
              "Piano Black de consola central",
              "Pantalla de radio",
              "Pantalla del tacómetro"
            ],
            image_url: "https://example.com/images/mazda3_2023_interior.jpg"
          }
        },
        {
          id: "pilares",
          name: "Pilares Piano Black",
          price: 50000,
          image_url: "https://example.com/images/pilares_piano_black.jpg"
        }
      ],
      status: "pendiente",
      note: "Cliente interesado en servicios adicionales.",
      global_discount: 15000
    };

    // Agregar la cotización
    const docRef = await addDoc(quotesRef, quoteData);
    console.log(`✅ Documento agregado con ID: ${docRef.id}`);
  } catch (error) {
    console.error("❌ Error al poblar datos:", error);
  }
};

seedQuotes();