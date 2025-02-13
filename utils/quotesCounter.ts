import db from "../firebase/firebaseAdmin"; // Ajusta la ruta según tu estructura

export const getNextCotizacionNumber = async () => {
  try {
    // Obtener el documento de configuración
    const configDocRef = db.doc("config/quotes");
     const docSnap = await configDocRef.get();

    let newCounter: number;
    if (docSnap.exists) {
      const data = docSnap.data();
     // Verificar que quotesCounter exista y sea un número; de lo contrario, usar 1000
      const currentCounter =
        data && typeof data.quotesCounter === "number"
          ? data.quotesCounter
          : 1000;
      newCounter = currentCounter + 1;
      // Actualizar el contador en Firestore
      await configDocRef.update({ quotesCounter: newCounter });
    } else {
      // Si el documento no existe, lo creamos con el primer número
      newCounter = 1001;
      await configDocRef.set({ quotesCounter: newCounter });
    }

    return newCounter; // Retornar el número de cotización
  } catch (error) {
    console.error(
      "Error al obtener o actualizar el número de cotización:",
      error
    );
    throw error;
  }
};
