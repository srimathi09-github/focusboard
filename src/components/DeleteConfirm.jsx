
import { AlertTriangle, X } from "lucide-react";

function DeleteConfirm({ task, onCancel, onConfirm }) {
  if (!task) return null;

  return (
    <div
      className="modal-overlay"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onCancel();
      }}
    >
      <section
        className="delete-modal"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="delete-title"
        aria-describedby="delete-description"
      >
        <button
          className="modal-close delete-close"
          onClick={onCancel}
          aria-label="Close dialog"
        >
          <X size={20} />
        </button>

        <div className="delete-icon">
          <AlertTriangle size={25} />
        </div>

        <h2 id="delete-title">Delete this task?</h2>

        <p id="delete-description">
          Are you sure you want to delete <strong>{task.title}</strong>?
          This action cannot be undone.
        </p>

        <div className="delete-actions">
          <button className="secondary-button" onClick={onCancel}>
            Cancel
          </button>

          <button className="danger-button" onClick={onConfirm}>
            Delete Task
          </button>
        </div>
      </section>
    </div>
  );
}

export default DeleteConfirm;
