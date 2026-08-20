export const COUPONS = {
  LUXORA10: 0.1,
  WELCOME20: 0.2,
};

export const CATEGORIES = [
  {
    name: "Women's Fashion",
    slug: "Clothing",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&q=80",
  },
  {
    name: "Men's Fashion",
    slug: "Clothing",
    image: "https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?w=600&q=80",
  },
  {
    name: "Shoes",
    slug: "Shoes",
    image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=600&q=80",
  },
  {
    name: "Bags",
    slug: "Bags",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80",
  },
  {
    name: "Accessories",
    slug: "Accessories",
    image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=600&q=80",
  },
];

export const TEAM = [
  { name: "Elena Marsh", role: "Founder & Creative Director", image: "https://images.unsplash.com/photo-1521146764736-56c929d59c83?w=400&q=80" },
  { name: "David Okafor", role: "Head of Design", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80" },
  { name: "Mira Sato", role: "Head of Merchandising", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80" },
  { name: "Theo Bianchi", role: "Sustainability Lead", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80" },
];

const now = Date.now();
const day = 1000 * 60 * 60 * 24;

export function getDemoOrders() {
  return [
    {
      id: "LX-100482",
      date: now - day * 2,
      status: "Processing",
      total: 318.5,
      items: [
        { name: "Tailored Wool Blazer", qty: 1, price: 228 },
        { name: "Silk Blend Scarf", qty: 1, price: 90.5 },
      ],
    },
    {
      id: "LX-100311",
      date: now - day * 9,
      status: "Shipped",
      total: 156,
      items: [{ name: "Leather Ankle Boots", qty: 1, price: 156 }],
    },
    {
      id: "LX-099876",
      date: now - day * 24,
      status: "Delivered",
      total: 412.75,
      items: [
        { name: "Structured Tote Bag", qty: 1, price: 268 },
        { name: "Gold Hoop Earrings", qty: 1, price: 64.75 },
        { name: "Cashmere Beanie", qty: 1, price: 80 },
      ],
    },
    {
      id: "LX-098220",
      date: now - day * 51,
      status: "Cancelled",
      total: 89,
      items: [{ name: "Classic Denim Jacket", qty: 1, price: 89 }],
    },
  ];
}
