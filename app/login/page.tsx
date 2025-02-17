"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  browserLocalPersistence,
  setPersistence,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    try {
      // Establecer la persistencia en localStorage
      await setPersistence(auth, browserLocalPersistence);

      await signInWithEmailAndPassword(
        auth,
        "fernandezmadrid.rodrigo@gmail.com",
        "test123"
      );
      document.cookie = "isLoggedIn=true; path=/; max-age=1800";
      // await signInWithEmailAndPassword(auth, email, password);
      console.log("Login exitoso");
      router.push("/dashboard"); // Redirige al Dashboard
    } catch (error: any) {
      console.error("Login error:", error.message);
      alert(`Error al iniciar sesión: ${error.message}`);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-background">
      <div className="bg-gray-800 p-8 rounded shadow-md w-80">
        <h2 className="text-white text-xl mb-4">Admin Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-2 p-2 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 p-2 rounded"
        />
        <button
          onClick={handleLogin}
          className="w-full bg-primary text-white py-2 rounded"
        >
          Sign In
        </button>
      </div>
    </div>
  );
}
