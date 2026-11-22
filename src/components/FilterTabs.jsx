
const tabs = ["All", "To do", "In progress", "Completed"];

function FilterTabs({ activeFilter, setActiveFilter, counts }) {
  return (
    <div className="filter-tabs" role="group" aria-label="Filter tasks by status">
      {tabs.map((tab) => (
        <button
          key={tab}
          className={`filter-tab ${
            activeFilter === tab ? "filter-tab-active" : ""
          }`}
          onClick={() => setActiveFilter(tab)}
          aria-pressed={activeFilter === tab}
        >
          {tab}
          <span className="filter-count">{counts[tab] ?? 0}</span>
        </button>
      ))}
    </div>
  );
}

export default FilterTabs;
