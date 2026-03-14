export default function DashboardLayout({ children }) {
  return (
    <div className="app-container">
      {children[0]} {/* Sidebar */}
      <main className="main-content">
        {children[1]} {/* Header */}
        <div className="dashboard-container">
          {children.slice(2)} {/* Page Content */}
        </div>
      </main>
    </div>
  );
}
