import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import DashboardLayout from './components/DashboardLayout';
import KPICard from './components/KPICard';
import PerformanceChart from './components/PerformanceChart';
import EquipmentTable from './components/EquipmentTable';
import { Loader2 } from 'lucide-react';
import './index.css';

function App() {
  const [kpiData, setKpiData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/kpi');
        if (!response.ok) throw new Error('API request failed');
        const data = await response.json();
        setKpiData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load KPI data. Please ensure database connection is configured.");
      } finally {
        setLoading(false);
      }
    }
    
    fetchData();
  }, []);

  return (
    <DashboardLayout>
      <Sidebar />
      <Header />
      
      {loading ? (
        <div style={{ display: 'flex', height: '50vh', alignItems: 'center', justifyContent: 'center' }}>
          <Loader2 className="spinning" size={48} color="var(--accent-primary)" />
        </div>
      ) : error ? (
        <div style={{ padding: '2rem', color: 'var(--danger)', background: 'rgba(239, 68, 68, 0.1)', borderRadius: 'var(--radius-md)' }}>
          <h3>Connection Error</h3>
          <p>{error}</p>
        </div>
      ) : (
        <>
          {/* KPI Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem' }}>
            <KPICard title="Physical Availability" value={kpiData?.PA || 0} unit="%" trend={0} description="Fleet PA vs Target (85%)" color="var(--accent-primary)" />
            <KPICard title="Use of Availability" value={kpiData?.UA || 0} unit="%" trend={0} description="Fleet UA vs Target (80%)" color="var(--success)" />
            <KPICard title="Effective Utilization" value={kpiData?.EU || 0} unit="%" trend={0} description="Overall Equipment Effectiveness" color="var(--accent-secondary)" />
            <KPICard title="MTTR" value={kpiData?.MTTR || 0} unit="hrs" trend={0} description="Mean Time To Repair (Lower is better)" color="var(--warning)" />
            <KPICard title="MTBF" value={kpiData?.MTBF || 0} unit="hrs" trend={0} description="Mean Time Between Failures" color="#ec4899" />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem', marginTop: '0.5rem' }}>
            <PerformanceChart />
            <EquipmentTable />
          </div>
        </>
      )}
    </DashboardLayout>
  );
}

export default App;
