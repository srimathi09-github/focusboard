
import { Bell, Menu, Plus } from "lucide-react";

function Header({ onAddTask, onMenuClick, activePage }) {
  return (
    <header className="top-header">
      <div className="header-left">
        <button
          className="mobile-menu-button"
          onClick={onMenuClick}
          aria-label="Open navigation"
        >
          <Menu size={22} />
        </button>

        <div>
          <div className="breadcrumb">Workspace / {activePage}</div>
          <h1>{activePage}</h1>
        </div>
      </div>

      <div className="header-actions">
        <button className="notification-button" aria-label="Notifications">
          <Bell size={20} />
          <span className="notification-dot" />
        </button>

        <button className="primary-button" onClick={onAddTask}>
          <Plus size={18} />
          <span>New Task</span>
        </button>
      </div>
    </header>
  );
}

export default Header;
