
import {
  CalendarDays,
  Check,
  Circle,
  Clock3,
  MoreHorizontal,
  Pencil,
  Trash2,
} from "lucide-react";

function TaskCard({ task, onEdit, onDelete, onStatusChange }) {

  const isCompleted = task.status === "Completed";

  const formattedDate = task.dueDate
    ? new Date(`${task.dueDate}T00:00:00`).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
      })
    : "No date";

  return (
    <article className={`task-card ${isCompleted ? "task-completed" : ""}`}>
      <button
        className={`task-check ${
          isCompleted ? "task-check-done" : ""
        }`}
        onClick={() =>
          onStatusChange(
            task.id,
            isCompleted ? "To do" : "Completed"
          )
        }
        aria-label={
          isCompleted ? "Mark task as to do" : "Mark task as completed"
        }
        title="Toggle completion"
      >
        {isCompleted ? <Check size={15} /> : <Circle size={17} />}
      </button>

      <div className="task-card-content">
        <div className="task-card-title-row">
          <h3>{task.title}</h3>

          <div className="task-actions">
            <button
              className="task-action-button"
              onClick={() => onEdit(task)}
              aria-label={`Edit ${task.title}`}
              title="Edit task"
            >
              <Pencil size={16} />
            </button>

            <button
              className="task-action-button task-delete-button"
              onClick={() => onDelete(task)}
              aria-label={`Delete ${task.title}`}
              title="Delete task"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>

        <p className="task-description">
          {task.description || "No description provided."}
        </p>

        <div className="task-card-footer">
          <div className="task-meta">
            <span className={`priority-badge priority-${task.priority.toLowerCase()}`}>
              <span />
              {task.priority}
            </span>

            <span className="task-date">
              <CalendarDays size={14} />
              {formattedDate}
            </span>
          </div>

          <span
            className={`status-badge status-${task.status
              .toLowerCase()
              .replaceAll(" ", "-")}`}
          >
            {task.status}
          </span>
        </div>
      </div>
    </article>
  );
}

export default TaskCard;
