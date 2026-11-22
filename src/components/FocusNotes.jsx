
import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  Lightbulb,
  Sparkles,
} from "lucide-react";

const notes = [
  {
    category: "YOUR DAILY FOCUS",
    number: "01",
    title: "Make today count.",
    description:
      "A little focus today can create meaningful progress tomorrow.",
    taskStatus: "YOUR NEXT STEP",
    taskName: "Plan your priorities",
    progress: 35,
    progressLabel: "35%",
    completed: false,
  },
  {
    category: "PRODUCTIVITY TIP",
    number: "02",
    title: "Small steps, big progress.",
    description: "Keep your priorities in view.",
    taskStatus: "IN PROGRESS",
    taskName: "Fix navigation",
    progress: 67,
    progressLabel: "67%",
    completed: false,
  },
  {
    category: "DAILY CELEBRATION",
    number: "03",
    title: "Celebrate the wins.",
    description: "Every completed task moves you forward.",
    taskStatus: "COMPLETED",
    taskName: "Onboarding copy",
    progress: 100,
    progressLabel: "100%",
    completed: true,
  },
];

function FocusNotes() {
  const [activeIndex, setActiveIndex] = useState(0);

  const activeNote = notes[activeIndex];

  const previous = () => {
    setActiveIndex((current) =>
      current === 0 ? notes.length - 1 : current - 1
    );
  };

  const next = () => {
    setActiveIndex((current) =>
      current === notes.length - 1 ? 0 : current + 1
    );
  };

  return (
    <section className="focus-carousel">
      <div className="focus-carousel-inner" key={activeIndex}>
        <div className="focus-carousel-top">
          <div className="focus-carousel-brand">
            <div className="focus-carousel-icon">
              <Lightbulb size={19} />
            </div>

            <div>
              <span className="focus-carousel-label">
                FOCUS NOTES
              </span>
              <span className="focus-carousel-subtitle">
                A little inspiration for your day
              </span>
            </div>
          </div>

          <span className="focus-carousel-count">
            {activeNote.number} / 03
          </span>
        </div>

        <div className="focus-carousel-content">
          <div className="focus-carousel-copy">
            <span className="focus-carousel-category">
              {activeNote.category}
            </span>

            <h2>{activeNote.title}</h2>

            <p>{activeNote.description}</p>

            <div className="focus-carousel-decoration">
              <Sparkles size={16} />
              <span>Stay focused. Keep growing.</span>
            </div>
          </div>

          <div className="focus-carousel-visual">
            <div
              className={`focus-task-card ${
                activeNote.completed ? "focus-task-complete" : ""
              }`}
            >
              <div className="focus-task-card-top">
                <div className="focus-task-check">
                  <Check size={17} strokeWidth={3} />
                </div>

                <span
                  className={`focus-task-status ${
                    activeNote.completed
                      ? "focus-status-complete"
                      : ""
                  }`}
                >
                  {activeNote.taskStatus}
                </span>
              </div>

              <h3>{activeNote.taskName}</h3>

              <div className="focus-task-progress-heading">
                <span>Progress</span>
                <strong>{activeNote.progressLabel}</strong>
              </div>

              <div
                className="focus-task-progress-track"
                role="progressbar"
                aria-label={`${activeNote.taskName} progress`}
                aria-valuenow={activeNote.progress}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                <div
                  className="focus-task-progress-fill"
                  style={{
                    width: `${activeNote.progress}%`,
                  }}
                />
              </div>

              <div className="focus-task-bottom">
                <span>
                  {activeNote.completed
                    ? "Successfully completed"
                    : "Keep moving forward"}
                </span>

                <CheckCircle2 size={17} />
              </div>
            </div>
          </div>
        </div>

        <div className="focus-carousel-bottom">
          <div className="focus-carousel-dots">
            {notes.map((note, index) => (
              <button
                key={note.number}
                type="button"
                className={`focus-carousel-dot ${
                  activeIndex === index
                    ? "focus-carousel-dot-active"
                    : ""
                }`}
                onClick={() => setActiveIndex(index)}
                aria-label={`Show slide ${index + 1}`}
                aria-current={
                  activeIndex === index ? "true" : undefined
                }
              />
            ))}
          </div>

          <div className="focus-carousel-navigation">
            <button
              type="button"
              onClick={previous}
              aria-label="Previous focus note"
            >
              <ArrowLeft size={18} />
            </button>

            <button
              type="button"
              onClick={next}
              aria-label="Next focus note"
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FocusNotes;
