
import {
  LayoutDashboard,
  CheckSquare,
  Settings,
  HelpCircle,
  LogOut,
  X,
} from "lucide-react";

function Sidebar({ activePage, setActivePage, isOpen, onClose }) {
  const menuItems = [
    { label: "Dashboard", icon: LayoutDashboard },
    { label: "My Tasks", icon: CheckSquare },
  ];

  const preferenceItems = [
    { label: "Settings", icon: Settings },
    { label: "Help & Support", icon: HelpCircle },
  ];

  const handleNavigation = (page) => {
    setActivePage(page);
    onClose();
  };

  const renderMenuItem = (item) => {
    const Icon = item.icon;

    return (
      <button
        key={item.label}
        type="button"
        className={`nav-item ${
          activePage === item.label ? "nav-item-active" : ""
        }`}
        onClick={() => handleNavigation(item.label)}
        aria-current={activePage === item.label ? "page" : undefined}
      >
        <Icon size={19} />
        <span>{item.label}</span>
      </button>
    );
  };

  return (
    <>
      {isOpen && (
        <button
          className="sidebar-overlay"
          aria-label="Close navigation"
          onClick={onClose}
        />
      )}

      <aside className={`sidebar ${isOpen ? "sidebar-open" : ""}`}>
        <div className="sidebar-brand">
          <div className="brand-icon">
            <CheckSquare size={23} />
          </div>

          <span>FocusBoard</span>

          <button
            className="sidebar-close"
            onClick={onClose}
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
        </div>

        <div className="sidebar-section-label">WORKSPACE</div>

        <nav className="sidebar-nav" aria-label="Main navigation">
          {menuItems.map(renderMenuItem)}
        </nav>

        <div className="sidebar-bottom">
          <div className="sidebar-section-label">PREFERENCES</div>

          <nav aria-label="Preferences navigation">
            {preferenceItems.map(renderMenuItem)}
          </nav>

          <div className="sidebar-profile">
            <div className="profile-avatar">S</div>

            <div className="profile-details">
              <strong>Srimathi</strong>
              <span>Personal workspace</span>
            </div>

            <button
              className="profile-logout"
              type="button"
              aria-label="Log out"
              title="Log out"
              disabled
            >
              <LogOut size={17} />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
