import { FiSearch, FiX } from "react-icons/fi";

export default function SearchBar({ value, onChange, placeholder = "Search products…" }) {
  return (
    <div className="search-bar">
      <FiSearch size={16} />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label="Search products"
      />
      {value && (
        <button onClick={() => onChange("")} aria-label="Clear search">
          <FiX size={16} />
        </button>
      )}
    </div>
  );
}
