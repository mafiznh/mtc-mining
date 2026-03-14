import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const dummyData = [
  { name: 'Jan', pa: 82, ua: 75, eu: 65 },
  { name: 'Feb', pa: 85, ua: 78, eu: 68 },
  { name: 'Mar', pa: 84, ua: 76, eu: 67 },
  { name: 'Apr', pa: 88, ua: 82, eu: 72 },
  { name: 'May', pa: 86, ua: 80, eu: 70 },
  { name: 'Jun', pa: 89, ua: 85, eu: 75 },
  { name: 'Jul', pa: 92, ua: 88, eu: 79 },
];

export default function PerformanceChart() {
  return (
    <div className="glass-card animate-fade-in" style={{ height: '400px', display: 'flex', flexDirection: 'column' }}>
      <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 600 }}>Fleet Performance Trends (PA, UA, EU)</h3>
        <select style={{ 
          background: 'rgba(255,255,255,0.05)', 
          border: '1px solid var(--glass-border)', 
          color: 'var(--text-primary)',
          padding: '0.5rem 1rem',
          borderRadius: 'var(--radius-sm)',
          outline: 'none',
          cursor: 'pointer'
        }}>
          <option>Last 7 Months</option>
          <option>Year to Date</option>
        </select>
      </div>
      
      <div style={{ flex: 1, width: '100%' }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={dummyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorPa" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorUa" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
            <XAxis dataKey="name" stroke="var(--text-secondary)" tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis stroke="var(--text-secondary)" tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} axisLine={false} tickLine={false} />
            <Tooltip 
              contentStyle={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--glass-border)', borderRadius: 'var(--radius-md)', color: 'var(--text-primary)' }}
              itemStyle={{ color: '#fff' }}
            />
            <Area type="monotone" dataKey="pa" name="Physical Avail. (PA)" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorPa)" />
            <Area type="monotone" dataKey="ua" name="Use of Avail. (UA)" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorUa)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
