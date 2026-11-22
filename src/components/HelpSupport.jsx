
import { HelpCircle, ListChecks, Search, Mail } from "lucide-react";

function HelpSupport() {
  return (
    <section className="secondary-page">
      <div className="secondary-page-heading">
        <span className="section-eyebrow">WE'RE HERE TO HELP</span>
        <h2>Help & Support</h2>
        <p>Learn how to use FocusBoard to stay organized.</p>
      </div>

      <div className="help-grid">
        <article className="help-card">
          <div className="help-card-icon">
            <ListChecks size={22} />
          </div>
          <h3>Managing tasks</h3>
          <p>
            Use Add Task to create tasks. You can edit, delete,
            and update the status of your tasks.
          </p>
        </article>

        <article className="help-card">
          <div className="help-card-icon">
            <Search size={22} />
          </div>
          <h3>Searching and filtering</h3>
          <p>
            Search for tasks by title or description. Use the
            status and priority filters to narrow your list.
          </p>
        </article>

        <article className="help-card">
          <div className="help-card-icon">
            <HelpCircle size={22} />
          </div>
          <h3>Saving your tasks</h3>
          <p>
            Your tasks are stored in your browser using
            localStorage, so they remain after a page refresh.
          </p>
        </article>

        <article className="help-card">
          <div className="help-card-icon">
            <Mail size={22} />
          </div>
          <h3>Need more help?</h3>
          <p>
            This is a demo support section. A real support
            contact can be added when an address is available.
          </p>
        </article>
      </div>
    </section>
  );
}

export default HelpSupport;
