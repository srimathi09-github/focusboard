
import { Settings, UserRound, Database, Bell } from "lucide-react";

function SettingsPage() {
  return (
    <section className="secondary-page">
      <div className="secondary-page-heading">
        <span className="section-eyebrow">PREFERENCES</span>
        <h2>Settings</h2>
        <p>Manage your FocusBoard workspace preferences.</p>
      </div>

      <div className="settings-grid">
        <article className="settings-card">
          <div className="settings-card-icon">
            <UserRound size={21} />
          </div>
          <h3>Profile</h3>
          <p>Personal workspace</p>
          <span className="settings-detail">Srimathi</span>
        </article>

        <article className="settings-card">
          <div className="settings-card-icon">
            <Database size={21} />
          </div>
          <h3>Data storage</h3>
          <p>Your tasks are saved in this browser.</p>
          <span className="settings-detail">Local storage enabled</span>
        </article>

        <article className="settings-card">
          <div className="settings-card-icon">
            <Bell size={21} />
          </div>
          <h3>Notifications</h3>
          <p>Notification preferences can be configured here.</p>
          <span className="settings-detail">Not configured</span>
        </article>

        <article className="settings-card">
          <div className="settings-card-icon">
            <Settings size={21} />
          </div>
          <h3>Workspace</h3>
          <p>Your personal task management workspace.</p>
          <span className="settings-detail">FocusBoard</span>
        </article>
      </div>
    </section>
  );
}

export default SettingsPage;
