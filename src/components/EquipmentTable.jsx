import { useState, useEffect } from 'react';
import { AlertCircle, CheckCircle, Loader2 } from 'lucide-react';

export default function EquipmentTable() {
  const [equipments, setEquipments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEq() {
      try {
        const res = await fetch('/api/equipment');
        if (res.ok) {
          const data = await res.json();
          setEquipments(data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchEq();
  }, []);

  return (
    <div className="glass-card animate-fade-in" style={{ overflowX: 'auto' }}>
      <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 600 }}>Equipment Fleet Status</h3>
        <button style={{ 
          background: 'var(--accent-primary)', 
          color: 'white', 
          border: 'none', 
          padding: '0.5rem 1rem', 
          borderRadius: 'var(--radius-sm)', 
          cursor: 'pointer',
          fontWeight: 500
        }}>View All Fleet</button>
      </div>
      
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>
           <Loader2 className="spinning" size={32} color="var(--accent-primary)" />
        </div>
      ) : equipments.length === 0 ? (
        <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
          No equipment data found in the database.
        </div>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--glass-border)', color: 'var(--text-secondary)' }}>
              <th style={{ padding: '1rem', fontWeight: 500 }}>Unit Name</th>
              <th style={{ padding: '1rem', fontWeight: 500 }}>Type</th>
              <th style={{ padding: '1rem', fontWeight: 500 }}>Location</th>
              <th style={{ padding: '1rem', fontWeight: 500 }}>Status</th>
              <th style={{ padding: '1rem', fontWeight: 500 }}>PA (%)</th>
              <th style={{ padding: '1rem', fontWeight: 500 }}>MTBF (hrs)</th>
            </tr>
          </thead>
          <tbody>
            {equipments.map((eq) => (
              <tr key={eq.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', transition: 'background 0.2s' }} className="table-row">
                <td style={{ padding: '1rem', fontWeight: 500, color: 'var(--text-primary)' }}>{eq.name}</td>
                <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>{eq.type}</td>
                <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>{eq.location}</td>
                <td style={{ padding: '1rem' }}>
                  <div style={{ 
                    display: 'inline-flex', 
                    alignItems: 'center', 
                    gap: '6px', 
                    padding: '4px 10px', 
                    borderRadius: '20px', 
                    fontSize: '0.85rem',
                    fontWeight: 500,
                    backgroundColor: 
                      eq.status === 'Operational' ? 'rgba(16, 185, 129, 0.15)' : 
                      eq.status === 'Breakdown' ? 'rgba(239, 68, 68, 0.15)' : 
                      'rgba(245, 158, 11, 0.15)',
                    color: 
                      eq.status === 'Operational' ? 'var(--success)' : 
                      eq.status === 'Breakdown' ? 'var(--danger)' : 
                      'var(--warning)'
                  }}>
                    {eq.status === 'Operational' ? <CheckCircle size={14} /> : <AlertCircle size={14} />}
                    {eq.status}
                  </div>
                </td>
                <td style={{ padding: '1rem', color: 'var(--text-primary)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '50px', height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `85%`, background: 'var(--success)' }}></div>
                    </div>
                    <span>85%</span>
                  </div>
                </td>
                <td style={{ padding: '1rem', color: 'var(--text-primary)' }}>120</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
