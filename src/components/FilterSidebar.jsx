const CATEGORIES = ["All", "Clothing", "Shoes", "Bags", "Accessories"];
const RATINGS = [4, 3, 2];

export default function FilterSidebar({ filters, setFilters, onClear }) {
  function update(key, value) {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }

  return (
    <aside className="filter-sidebar">
      <div className="filter-group">
        <h4>Category</h4>
        <ul>
          {CATEGORIES.map((cat) => (
            <li key={cat}>
              <label className="filter-radio">
                <input
                  type="radio"
                  name="category"
                  checked={filters.category === cat}
                  onChange={() => update("category", cat)}
                />
                {cat}
              </label>
            </li>
          ))}
        </ul>
      </div>

      <div className="filter-group">
        <h4>Price Range</h4>
        <div className="price-inputs">
          <div className="form-field" style={{ marginBottom: 0 }}>
            <label htmlFor="minPrice">Min</label>
            <input
              id="minPrice"
              type="number"
              min="0"
              value={filters.minPrice}
              onChange={(e) => update("minPrice", e.target.value)}
              placeholder="$0"
            />
          </div>
          <div className="form-field" style={{ marginBottom: 0 }}>
            <label htmlFor="maxPrice">Max</label>
            <input
              id="maxPrice"
              type="number"
              min="0"
              value={filters.maxPrice}
              onChange={(e) => update("maxPrice", e.target.value)}
              placeholder="$500"
            />
          </div>
        </div>
      </div>

      <div className="filter-group">
        <h4>Rating</h4>
        <ul>
          {RATINGS.map((r) => (
            <li key={r}>
              <label className="filter-radio">
                <input
                  type="radio"
                  name="rating"
                  checked={filters.minRating === r}
                  onChange={() => update("minRating", r)}
                />
                {r}★ & above
              </label>
            </li>
          ))}
          <li>
            <label className="filter-radio">
              <input
                type="radio"
                name="rating"
                checked={!filters.minRating}
                onChange={() => update("minRating", 0)}
              />
              Any rating
            </label>
          </li>
        </ul>
      </div>

      <button className="btn btn-outline btn-block btn-sm" onClick={onClear}>
        Clear Filters
      </button>
    </aside>
  );
}
