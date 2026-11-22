
import { useEffect, useState } from "react";
import { CalendarDays, X } from "lucide-react";

const emptyForm = {
  title: "",
  description: "",
  status: "To do",
  priority: "Medium",
  dueDate: "",
};

function TaskForm({ isOpen, onClose, onSave, editingTask }) {
  const [formData, setFormData] = useState(emptyForm);
  const [error, setError] = useState("");

  useEffect(() => {
    if (editingTask) {
      setFormData({
        title: editingTask.title || "",
        description: editingTask.description || "",
        status: editingTask.status || "To do",
        priority: editingTask.priority || "Medium",
        dueDate: editingTask.dueDate || "",
      });
    } else {
      setFormData(emptyForm);
    }

    setError("");
  }, [editingTask, isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formData.title.trim()) {
      setError("Please enter a task title.");
      return;
    }

    onSave({
      ...formData,
      title: formData.title.trim(),
      description: formData.description.trim(),
    });
  };

  return (
    <div
      className="modal-overlay"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        className="task-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="task-modal-title"
      >
        <div className="modal-header">
          <div>
            <span className="modal-eyebrow">TASK MANAGEMENT</span>
            <h2 id="task-modal-title">
              {editingTask ? "Edit Task" : "Create New Task"}
            </h2>
            <p>
              {editingTask
                ? "Update the details of your task."
                : "Add a new task to your workspace."}
            </p>
          </div>

          <button
            className="modal-close"
            onClick={onClose}
            aria-label="Close form"
          >
            <X size={21} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="task-title">Task Title *</label>
            <input
              id="task-title"
              name="title"
              type="text"
              placeholder="What needs to be done?"
              value={formData.title}
              onChange={handleChange}
              maxLength={100}
              autoFocus
            />
          </div>

          <div className="form-group">
            <label htmlFor="task-description">Description</label>
            <textarea
              id="task-description"
              name="description"
              placeholder="Add some details about this task..."
              value={formData.description}
              onChange={handleChange}
              rows={3}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="task-status">Status</label>
              <select
                id="task-status"
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option>To do</option>
                <option>In progress</option>
                <option>Completed</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="task-priority">Priority</label>
              <select
                id="task-priority"
                name="priority"
                value={formData.priority}
                onChange={handleChange}
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="task-date">Due Date</label>
            <div className="date-input-wrapper">
              <CalendarDays size={17} />
              <input
                id="task-date"
                name="dueDate"
                type="date"
                value={formData.dueDate}
                onChange={handleChange}
              />
            </div>
          </div>

          {error && <p className="form-error" role="alert">{error}</p>}

          <div className="modal-footer">
            <button
              type="button"
              className="secondary-button"
              onClick={onClose}
            >
              Cancel
            </button>

            <button type="submit" className="primary-button">
              {editingTask ? "Save Changes" : "Create Task"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default TaskForm;
