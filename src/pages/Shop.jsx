import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { FiSliders, FiX } from "react-icons/fi";
import { getProducts } from "../services/productService";
import ProductGrid from "../components/ProductGrid";
import { ProductGridSkeleton } from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import SearchBar from "../components/SearchBar";
import FilterSidebar from "../components/FilterSidebar";

const PAGE_SIZE = 8;
const SORTS = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Rating" },
  { value: "newest", label: "Newest" },
  { value: "bestselling", label: "Best Selling" },
];

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [allProducts, setAllProducts] = useState([]);
  const [status, setStatus] = useState("loading");
  const [query, setQuery] = useState(searchParams.get("search") || "");
  const [sort, setSort] = useState("featured");
  const [page, setPage] = useState(1);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [filters, setFilters] = useState({
    category: searchParams.get("category") || "All",
    minPrice: "",
    maxPrice: "",
    minRating: 0,
  });

  useEffect(() => {
    let alive = true;
    getProducts()
      .then((data) => alive && (setAllProducts(data), setStatus("ready")))
      .catch(() => alive && setStatus("error"));
    return () => { alive = false; };
  }, []);

  useEffect(() => {
    setPage(1);
  }, [query, sort, filters]);

  const filtered = useMemo(() => {
    let result = [...allProducts];

    if (query.trim()) {
      const q = query.trim().toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    if (filters.category && filters.category !== "All") {
      result = result.filter((p) => p.category === filters.category);
    }

    if (filters.minPrice) result = result.filter((p) => p.price >= Number(filters.minPrice));
    if (filters.maxPrice) result = result.filter((p) => p.price <= Number(filters.maxPrice));
    if (filters.minRating) result = result.filter((p) => p.ratingValue >= filters.minRating);

    switch (sort) {
      case "price-asc": result.sort((a, b) => a.price - b.price); break;
      case "price-desc": result.sort((a, b) => b.price - a.price); break;
      case "rating": result.sort((a, b) => b.ratingValue - a.ratingValue); break;
      case "newest": result.sort((a, b) => b.createdAt - a.createdAt); break;
      case "bestselling": result.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0)); break;
      default: break;
    }

    return result;
  }, [allProducts, query, filters, sort]);

  const visible = filtered.slice(0, page * PAGE_SIZE);
  const hasMore = visible.length < filtered.length;

  function clearFilters() {
    setFilters({ category: "All", minPrice: "", maxPrice: "", minRating: 0 });
    setQuery("");
    setSearchParams({});
  }

  return (
    <div>
      <div className="page-hero">
        <div className="container">
          <div className="breadcrumb">Home / Shop</div>
          <h1>Shop All</h1>
        </div>
      </div>

      <div className="container section shop-layout">
        <div className="shop-sidebar-wrap">
          <button className="btn btn-outline btn-sm shop-filter-toggle" onClick={() => setMobileFiltersOpen(true)}>
            <FiSliders size={14} /> Filters
          </button>
          <div className={`shop-sidebar-mobile ${mobileFiltersOpen ? "open" : ""}`}>
            <div className="shop-sidebar-mobile-head">
              <h3>Filters</h3>
              <button onClick={() => setMobileFiltersOpen(false)} aria-label="Close filters"><FiX size={20} /></button>
            </div>
            <FilterSidebar filters={filters} setFilters={setFilters} onClear={clearFilters} />
          </div>
          <div className="shop-sidebar-desktop">
            <FilterSidebar filters={filters} setFilters={setFilters} onClear={clearFilters} />
          </div>
        </div>

        <div className="shop-main">
          <div className="shop-toolbar">
            <SearchBar value={query} onChange={setQuery} />
            <select value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Sort products">
              {SORTS.map((s) => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </select>
          </div>

          {status === "ready" && (
            <p className="shop-results-count">
              Showing {visible.length} of {filtered.length} products
            </p>
          )}

          {status === "loading" && <ProductGridSkeleton count={8} />}
          {status === "error" && <ErrorMessage message="We couldn't load products." onRetry={() => window.location.reload()} />}
          {status === "ready" && <ProductGrid products={visible} />}

          {status === "ready" && hasMore && (
            <div className="shop-load-more">
              <button className="btn btn-outline" onClick={() => setPage((p) => p + 1)}>
                Load More
              </button>
            </div>
          )}
        </div>
      </div>
      {mobileFiltersOpen && <div className="navbar-overlay" onClick={() => setMobileFiltersOpen(false)} />}
    </div>
  );
}
