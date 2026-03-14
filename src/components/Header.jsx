import { Bell, Search, User } from 'lucide-react';

export default function Header() {
  return (
    <header className="top-header">
      <div className="header-title text-gradient">
        Equipment Monitoring
      </div>
      
      <div className="header-actions">
        <button className="icon-button" aria-label="Search">
          <Search size={20} />
        </button>
        <button className="icon-button" aria-label="Notifications">
          <Bell size={20} />
        </button>
        <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)'}}>
          <User size={20} color="white" />
        </div>
      </div>
    </header>
  );
}
