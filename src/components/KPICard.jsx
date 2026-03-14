import { TrendingUp, TrendingDown } from 'lucide-react';

export default function KPICard({ title, value, unit, trend, description, color = 'var(--accent-primary)' }) {
  const isPositive = trend >= 0;
  
  return (
    <div className="glass-card animate-fade-in" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', borderTop: `3px solid ${color}` }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 className="subtitle" style={{ fontWeight: 600, color: 'var(--text-secondary)' }}>{title}</h3>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '4px', 
          fontSize: '0.85rem', 
          fontWeight: 600,
          color: isPositive ? 'var(--success)' : 'var(--danger)',
          background: isPositive ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
          padding: '2px 8px',
          borderRadius: 'var(--radius-sm)'
        }}>
          {isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
          {Math.abs(trend)}%
        </div>
      </div>
      
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
        <span style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text-primary)' }}>{value}</span>
        <span style={{ fontSize: '1rem', color: 'var(--text-secondary)' }}>{unit}</span>
      </div>
      
      <div className="subtitle" style={{ fontSize: '0.75rem', opacity: 0.8 }}>
        {description}
      </div>
    </div>
  );
}
