
import { useMemo, useState } from "react";

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import StatCard from "./components/StatCard";
import FocusNotes from "./components/FocusNotes";
import SearchBar from "./components/SearchBar";
import FilterTabs from "./components/FilterTabs";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import DeleteConfirm from "./components/DeleteConfirm";
import SettingsPage from "./components/SettingsPage";
import HelpSupport from "./components/HelpSupport";

import { initialTasks } from "./data/sampleTasks";
import useLocalStorage from "./hooks/useLocalStorage";

function App() {
  const [tasks, setTasks] = useLocalStorage(
    "focusboard-tasks",
    initialTasks
  );

  const [activePage, setActivePage] = useState("Dashboard");
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("All");

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Task statistics
  const totalTasks = tasks.length;

  const inProgressTasks = tasks.filter(
    (task) => task.status === "In progress"
  ).length;

  const completedTasks = tasks.filter(
    (task) => task.status === "Completed"
  ).length;

  const completionRate =
    totalTasks === 0
      ? 0
      : Math.round((completedTasks / totalTasks) * 100);

  // Task filter counts
  const counts = {
    All: totalTasks,
    "To do": tasks.filter(
      (task) => task.status === "To do"
    ).length,
    "In progress": inProgressTasks,
    Completed: completedTasks,
  };

  // Search and filter tasks
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const title = (task.title || "").toLowerCase();
      const description = (task.description || "").toLowerCase();
      const search = searchTerm.trim().toLowerCase();

      const matchesSearch =
        title.includes(search) ||
        description.includes(search);

      const matchesStatus =
        activeFilter === "All" ||
        task.status === activeFilter;

      const matchesPriority =
        priorityFilter === "All" ||
        task.priority === priorityFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesPriority
      );
    });
  }, [tasks, searchTerm, activeFilter, priorityFilter]);

  // Navigate between pages
  const navigateToPage = (page) => {
    setActivePage(page);
    setSidebarOpen(false);

    // Reset task filters when opening My Tasks
    if (page === "My Tasks") {
      setActiveFilter("All");
      setPriorityFilter("All");
      setSearchTerm("");
    }
  };

  // Create task
  const openCreateForm = () => {
    setEditingTask(null);
    setIsFormOpen(true);
  };

  // Edit task
  const openEditForm = (task) => {
    setEditingTask(task);
    setIsFormOpen(true);
  };

  // Close task form
  const closeForm = () => {
    setIsFormOpen(false);
    setEditingTask(null);
  };

  // Save task
  const saveTask = (formData) => {
    if (editingTask) {
      setTasks((previousTasks) =>
        previousTasks.map((task) =>
          task.id === editingTask.id
            ? { ...task, ...formData }
            : task
        )
      );
    } else {
      const newTask = {
        id: Date.now(),
        ...formData,
        createdAt: new Date().toISOString().slice(0, 10),
      };

      setTasks((previousTasks) => [
        newTask,
        ...previousTasks,
      ]);
    }

    closeForm();
  };

  // Delete task
  const deleteTask = () => {
    if (!taskToDelete) return;

    setTasks((previousTasks) =>
      previousTasks.filter(
        (task) => task.id !== taskToDelete.id
      )
    );

    setTaskToDelete(null);
  };

  // Update task status
  const updateTaskStatus = (taskId, newStatus) => {
    setTasks((previousTasks) =>
      previousTasks.map((task) =>
        task.id === taskId
          ? { ...task, status: newStatus }
          : task
      )
    );
  };

  // Render task management section
  const renderTasksSection = () => (
    <section className="tasks-section">
      <div className="tasks-heading">
        <div>
          <span className="section-eyebrow">
            {activePage === "My Tasks"
              ? "YOUR WORKSPACE"
              : "STAY ON TRACK"}
          </span>

          <h2>
            {activePage === "My Tasks"
              ? "My Tasks"
              : "Your Tasks"}
          </h2>

          <p>
            Manage your tasks and keep moving forward.
          </p>
        </div>

        <button
          className="primary-button"
          onClick={openCreateForm}
        >
          <span>+</span>
          Add Task
        </button>
      </div>

      <div className="task-toolbar">
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />

        <div className="priority-filter">
          <label htmlFor="priority-filter">
            Priority:
          </label>

          <select
            id="priority-filter"
            value={priorityFilter}
            onChange={(event) =>
              setPriorityFilter(event.target.value)
            }
          >
            <option value="All">All priorities</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
      </div>

      <FilterTabs
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        counts={counts}
      />

      <TaskList
        tasks={filteredTasks}
        onEdit={openEditForm}
        onDelete={setTaskToDelete}
        onStatusChange={updateTaskStatus}
      />
    </section>
  );

  return (
    <div className="app-layout">
      <Sidebar
        activePage={activePage}
        setActivePage={navigateToPage}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <main className="main-content">
        <Header
          activePage={activePage}
          onAddTask={openCreateForm}
          onMenuClick={() => setSidebarOpen(true)}
        />

        <div className="dashboard-content">

          {/* DASHBOARD PAGE */}
          {activePage === "Dashboard" && (
            <>
              <section className="welcome-section">
                <div>
                  <span className="welcome-date">
                    YOUR PERSONAL WORKSPACE
                  </span>

                  <h2>
                    Good day, Srimathi <span>✦</span>
                  </h2>

                  <p>
                    Stay focused, stay organized, and make today count.
                  </p>
                </div>

                <div
                  className="welcome-decoration"
                  aria-hidden="true"
                >
                  <span>✦</span>
                  <span>✧</span>
                  <span>✦</span>
                </div>
              </section>

              <section
                className="stats-grid"
                aria-label="Task statistics"
              >
                <StatCard
                  type="total"
                  label="Total Tasks"
                  value={totalTasks}
                  subtitle="Tasks in your workspace"
                />

                <StatCard
                  type="progress"
                  label="In Progress"
                  value={inProgressTasks}
                  subtitle="Currently being worked on"
                />

                <StatCard
                  type="completed"
                  label="Completed"
                  value={completedTasks}
                  subtitle="Successfully finished"
                />

                <StatCard
                  type="rate"
                  label="Completion Rate"
                  value={`${completionRate}%`}
                  subtitle="Overall task progress"
                />
              </section>

              <section className="dashboard-middle">
                <FocusNotes />

                <section className="progress-card">
                  <div className="progress-heading">
                    <div>
                      <span className="section-eyebrow">
                        YOUR PROGRESS
                      </span>
                      <h2>Task Overview</h2>
                    </div>

                    <span className="progress-icon">↗</span>
                  </div>

                  <div className="progress-number">
                    <strong>{completionRate}%</strong>
                    <span>completed</span>
                  </div>

                  <div
                    className="progress-track"
                    role="progressbar"
                    aria-label="Task completion"
                    aria-valuenow={completionRate}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  >
                    <div
                      className="progress-fill"
                      style={{
                        width: `${completionRate}%`,
                      }}
                    />
                  </div>

                  <div className="progress-summary">
                    <span>{completedTasks} completed</span>
                    <span>
                      {totalTasks - completedTasks} remaining
                    </span>
                  </div>

                  <div className="progress-divider" />

                  <div className="progress-bottom">
                    <div>
                      <span className="progress-small-label">
                        Keep it up!
                      </span>

                      <strong>
                        You're making progress.
                      </strong>
                    </div>

                    <span className="progress-star">✦</span>
                  </div>
                </section>
              </section>

              {renderTasksSection()}
            </>
          )}

          {/* MY TASKS PAGE */}
          {activePage === "My Tasks" && (
            <>
              {renderTasksSection()}
            </>
          )}

          {/* SETTINGS PAGE */}
          {activePage === "Settings" && (
            <SettingsPage />
          )}

          {/* HELP & SUPPORT PAGE */}
          {activePage === "Help & Support" && (
            <HelpSupport />
          )}

          <footer className="app-footer">
            <span>© 2026 FocusBoard</span>
            <span>
              Designed for better focus. Built for productivity.
            </span>
          </footer>
        </div>
      </main>

      {/* CREATE / EDIT TASK MODAL */}
      <TaskForm
        isOpen={isFormOpen}
        onClose={closeForm}
        onSave={saveTask}
        editingTask={editingTask}
      />

      {/* DELETE CONFIRMATION MODAL */}
      <DeleteConfirm
        task={taskToDelete}
        onCancel={() => setTaskToDelete(null)}
        onConfirm={deleteTask}
      />
    </div>
  );
}

export default App;
