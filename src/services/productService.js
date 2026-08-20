import axios from "axios";

const BASE_URL = "https://fakestoreapi.com";

const CATEGORY_MAP = {
  "men's clothing": "Clothing",
  "women's clothing": "Clothing",
  jewelery: "Accessories",
  electronics: "Accessories",
};

// Deterministic pseudo-random generator seeded by id, so values stay
// stable across renders instead of reshuffling on every fetch.
function seededRandom(seed) {
  const x = Math.sin(seed * 9301 + 49297) * 233280;
  return x - Math.floor(x);
}

function normalizeProduct(raw) {
  const seed = raw.id;
  const discountRoll = seededRandom(seed);
  const hasDiscount = discountRoll > 0.55;
  const discountPercent = hasDiscount ? Math.floor(10 + seededRandom(seed + 1) * 35) : 0;
  const price = Math.round(raw.price * 8.5 * 100) / 100 + 12; // reprice into a fashion-appropriate range
  const originalPrice = hasDiscount ? Math.round((price / (1 - discountPercent / 100)) * 100) / 100 : null;
  const category = CATEGORY_MAP[raw.category] || "Accessories";
  const sizes = category === "Shoes"
    ? ["6", "7", "8", "9", "10", "11"]
    : category === "Clothing"
    ? ["XS", "S", "M", "L", "XL"]
    : ["One Size"];
  const colors = ["Black", "Ivory", "Camel", "Charcoal"].filter((_, i) => seededRandom(seed + i) > 0.3);

  return {
    id: raw.id,
    name: raw.title,
    slug: raw.title,
    description: raw.description,
    image: raw.image,
    images: [raw.image, raw.image, raw.image],
    category,
    originalCategory: raw.category,
    price,
    originalPrice,
    discountPercent,
    rating: Math.round(raw.rating?.rate || 4) * 1 || 4.2,
    ratingValue: raw.rating?.rate || 4.2,
    reviewCount: raw.rating?.count || Math.floor(seededRandom(seed + 5) * 200) + 10,
    inStock: seededRandom(seed + 2) > 0.08,
    brand: "LUXORA",
    sku: `LUX-${String(raw.id).padStart(5, "0")}`,
    material: category === "Shoes" ? "Full-grain leather" : category === "Bags" ? "Vegan leather" : "Premium cotton blend",
    sizes,
    colors: colors.length ? colors : ["Black"],
    isNew: seededRandom(seed + 3) > 0.75,
    isBestSeller: seededRandom(seed + 4) > 0.7,
    createdAt: Date.now() - Math.floor(seededRandom(seed + 6) * 1000 * 60 * 60 * 24 * 120),
  };
}

let cache = null;

export async function getProducts() {
  if (cache) return cache;
  const { data } = await axios.get(`${BASE_URL}/products`);
  cache = data.map(normalizeProduct);
  return cache;
}

export async function getProductById(id) {
  const products = await getProducts();
  const product = products.find((p) => String(p.id) === String(id));
  if (!product) throw new Error("Product not found");
  return product;
}

export async function getProductsByCategory(category) {
  const products = await getProducts();
  if (!category || category === "All") return products;
  return products.filter((p) => p.category === category);
}

export async function getRelatedProducts(product, limit = 4) {
  const products = await getProducts();
  return products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, limit);
}
