import { db } from "./firebaseConfig";
import { collection, addDoc, getDoc, doc, updateDoc } from "firebase/firestore";

const seedQuotes = async () => {
  try {
    const quotesRef = collection(db, "quotes");

    // Obtener el siguiente número de cotización
    const configRef = doc(db, "config/quoteNumber");
    const configDoc = await getDoc(configRef);
    let quoteNumber = 1001; // Número inicial por defecto

    if (configDoc.exists()) {
      quoteNumber = configDoc.data().current;
      await updateDoc(configRef, { current: quoteNumber + 1 });
    } else {
      await updateDoc(configRef, { current: quoteNumber + 1 });
    }

    // Documento de ejemplo
    const quoteData = {
      quoteNumber,
      customer_info: {
        name: "Juan Pérez",
        email: "juan.perez@gmail.com",
        phone: "123456789",
        brand: "Mazda",
        model: "3",
        year: 2023
      },
      services: [
        {
          id: "kit_interior",
          name: "Kit Interior",
          base_price: 199000,
          adjusted_price: 189000,
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
          base_price: 50000,
          adjusted_price: 50000,
          image_url: "https://example.com/images/pilares_piano_black.jpg"
        }
      ],
      status: "pendiente",
      note: "Cliente interesado en servicios adicionales.",
      global_discount: 10000
    };

    // Agregar la cotización
    const docRef = await addDoc(quotesRef, quoteData);
    console.log(`✅ Cotización creada con ID: ${docRef.id} y Número: ${quoteNumber}`);
  } catch (error) {
    console.error("❌ Error al poblar datos:", error);
  }
};

seedQuotes();
