export default function ClientLayout({ children }: { children: React.ReactNode }) {
    return (
      <div className="min-h-screen bg-gray-900 text-white">
        <header className="bg-primary py-4 text-center">
          <h1 className="text-2xl font-bold">F-Stack - Cotizador de Servicios</h1>
        </header>
        <main className="p-4 pt-1">{children}</main>
      </div>
    );
  }
  