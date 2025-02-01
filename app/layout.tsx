import "../styles/globals.css";
import { ReactNode } from "react";
import { QuoteProvider } from "./context/QuoteContext";

export const metadata = {
  title: "F-Stack | Quote & Dashboard",
  description: "PPF Interior and Exterior Protection Services.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body className="bg-background text-white">
        <QuoteProvider>{children}</QuoteProvider>
      </body>
    </html>
  );
}
