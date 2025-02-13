"use client";
import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth } from "../../firebase/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    // Se suscribe a los cambios en el estado de autenticación
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        // Si no hay usuario autenticado, redirige al login
        router.push("/login");
      }
    });

    // Limpia la suscripción al desmontar el componente
    return () => unsubscribe();
  }, [router]);

  return (
    <section className="flex flex-col h-screen">
      <header className="bg-gray-900 p-4">
        <h1 className="text-primary text-xl">Dashboard</h1>
      </header>
      <main className="flex-1 overflow-y-auto p-6">{children}</main>
    </section>
  );
}
