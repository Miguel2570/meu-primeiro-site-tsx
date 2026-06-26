import { Dashboard } from '../components/Dashboard';

const SHEET_ID = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_ID || '';

export default function DashboardPage() {
  return (
    <main className="pt-16">
      <Dashboard 
        sheetId={SHEET_ID} 
        title="📊 Dashboard - Dados em Tempo Real"
      />
    </main>
  );
}