# LUXORA — Elevate Your Everyday Style

A complete, production-quality e-commerce frontend for a modern fashion brand, built as a portfolio-grade React application. LUXORA sells clothing, shoes, bags, and accessories with a full browsing, cart, wishlist, checkout, and account experience — all running entirely on the frontend.

## Features

- **Home** — hero, shop-by-category, featured products, promo banner, best sellers, trust badges, newsletter
- **Shop** — live search, category/price/rating filters, sorting, responsive grid, Load More pagination
- **Product Details** — image gallery, color/size selection, quantity, tabs (description/features/reviews), local review submission, related products
- **Cart** — quantity controls, remove, move to wishlist, promo codes (`LUXORA10`, `WELCOME20`), live totals
- **Wishlist** — persisted list with move-to-cart
- **Authentication (demo)** — register, login, forgot password, protected routes, persisted session
- **Checkout** — shipping form, payment method selection (card/COD/PayPal UI), validated demo card form, order summary
- **Orders** — order history and detailed order view with a delivery progress tracker
- **Profile** — editable account info, quick links to orders/wishlist/settings
- **About / Contact** — brand story, stats, team, validated contact form
- **Toasts, skeleton loaders, empty states, and a custom 404** throughout

All cart, wishlist, auth, and order data persist in `localStorage` and survive a page refresh.

## Tech Stack

- React 19 + Vite
- React Router DOM v7
- Context API (Cart, Wishlist, Auth, Toast)
- Axios for API calls
- React Icons
- Plain CSS with a shared design-token system (no CSS framework)
- oxlint for linting
- [Fake Store API](https://fakestoreapi.com/products) as the product data source (remapped into fashion categories, pricing, and imagery)

No TypeScript. No Next.js. No real backend or payment processing — this is a frontend-only project with realistic mocked flows.

## Project Structure

```
src/
├── components/     Reusable UI: Navbar, Footer, ProductCard, ProductGrid, CartItem, etc.
├── pages/           Route-level pages
├── context/          CartContext, WishlistContext, AuthContext, ToastContext
├── services/        productService.js — API layer over Fake Store API
├── utils/            validation.js, formatCurrency.js, localStorage.js
├── data/             demoData.js — coupons, categories, team, demo orders
├── styles/           layout.css — component/page styles
├── App.jsx
├── main.jsx
└── index.css         Design tokens & base styles
```

## Installation

```bash
npm install
```

## Running Locally

```bash
npm run dev
```

The app runs at `http://localhost:5173` by default.

## Building for Production

```bash
npm run build
npm run preview   # preview the production build locally
```

## Linting

```bash
npm run lint
```

## API Used

Product data comes from the public [Fake Store API](https://fakestoreapi.com/products). The `src/services/productService.js` layer fetches and remaps that data into LUXORA's fashion categories (Clothing, Shoes, Bags, Accessories), pricing, and demo product attributes (sizes, colors, material, SKU, stock, ratings). All other components consume products only through this service — no component calls the API directly.

## Demo Accounts & Coupons

- **Auth**: register any email/password combination — it's stored in `localStorage`. No real backend is used.
- **Coupons**: `LUXORA10` (10% off), `WELCOME20` (20% off)

## Deployment to Vercel

1. Push this project to a GitHub repository.
2. In Vercel, click **New Project** and import the repository.
3. Framework preset: **Vite**. Build command: `npm run build`. Output directory: `dist`.
4. Deploy — `vercel.json` is already included with a SPA rewrite rule so client-side routes (e.g. `/product/1`) work correctly on refresh and direct load.

Alternatively, via CLI:

```bash
npm install -g vercel
vercel
```

## Notes

- Payments, real authentication, and email delivery are intentionally mocked — this is a frontend-only showcase.
- Reviews submitted on a product page are stored per-browser via `localStorage` and are not shared across devices.
