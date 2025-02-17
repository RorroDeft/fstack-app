import * as admin from "firebase-admin";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
      // Asegúrate de formatear correctamente la clave privada
      privateKey:
      process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(
          /\\n/g,
          "\n"
        ),
    }),
    // Opcional: databaseURL: process.env.FIREBASE_DATABASE_URL,
  });
}

const db = admin.firestore();
export default db;
