import QuoteList from './components/QuoteList';

export default function DashboardPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Cotizaciones Asignadas</h2>
      <QuoteList />
    </div>
  );
}

