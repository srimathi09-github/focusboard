
import { ClipboardList } from "lucide-react";
import TaskCard from "./TaskCard";

function TaskList({ tasks, onEdit, onDelete, onStatusChange }) {
  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">
          <ClipboardList size={28} />
        </div>
        <h3>No tasks found</h3>
        <p>Try changing your search or filters, or create a new task.</p>
      </div>
    );
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
          onStatusChange={onStatusChange}
        />
      ))}
    </div>
  );
}

export default TaskList;
