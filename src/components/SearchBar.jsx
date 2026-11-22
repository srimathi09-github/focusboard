
import { Search, X } from "lucide-react";

function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <div className="search-wrapper">
      <Search size={19} className="search-icon" />

      <input
        type="text"
        placeholder="Search tasks..."
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
        aria-label="Search tasks by title or description"
      />

      {searchTerm && (
        <button
          className="clear-search"
          onClick={() => setSearchTerm("")}
          aria-label="Clear search"
        >
          <X size={17} />
        </button>
      )}
    </div>
  );
}

export default SearchBar;
