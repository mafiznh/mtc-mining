import { LayoutDashboard, Tool, Activity, FileText, Settings, Factory } from 'lucide-react';

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="logo-icon">
          <Factory size={24} />
        </div>
        <span className="sidebar-title">MinePlanner</span>
      </div>
      
      <nav className="sidebar-nav">
        <a href="#" className="nav-item active">
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </a>
        <a href="#" className="nav-item">
          <Tool size={20} />
          <span>Equipment Fleet</span>
        </a>
        <a href="#" className="nav-item">
          <Activity size={20} />
          <span>Performance</span>
        </a>
        <a href="#" className="nav-item">
          <FileText size={20} />
          <span>Reports</span>
        </a>
        <div style={{ flex: 1 }}></div>
        <a href="#" className="nav-item" style={{ marginTop: 'auto' }}>
          <Settings size={20} />
          <span>Settings</span>
        </a>
      </nav>
    </aside>
  );
}
