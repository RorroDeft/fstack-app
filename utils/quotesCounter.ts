import { db } from "../firebase/firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";

export const getNextCotizacionNumber = async () => {
  try {
    // Obtener el documento de configuración
    const configDocRef = doc(db, "config", "quotes");
    const docSnap = await getDoc(configDocRef);

    if (docSnap.exists()) {
      // Si existe el documento, obtén el contador actual
      const currentCounter = docSnap.data().quotesCounter;

      // Incrementar el contador
      const newCounter = currentCounter + 1;

      // Actualizar el contador en Firestore
      await updateDoc(configDocRef, { quotesCounter: newCounter });

      return newCounter; // Retornar el número de cotización
    } else {
      // Si no existe, creamos el documento inicial con el primer número
      await updateDoc(configDocRef, { quotesCounter: 1001 });
      return 1001; // Número inicial de cotización
    }
  } catch (error) {
    console.error(
      "Error al obtener o actualizar el número de cotización:",
      error
    );
    throw error;
  }
};
