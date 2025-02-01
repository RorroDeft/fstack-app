"use client";
import { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { auth } from "../../firebase/firebaseConfig";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const user = auth.currentUser;

      // if (!user) {
      //   // Si no hay usuario autenticado, redirige al login
      //   router.push("/login");
      // }
    };

    checkAuth();
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
