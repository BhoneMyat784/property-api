import type { DemoAccount, Listing } from "./types.js";

const image = (seed: string) => `https://images.unsplash.com/${seed}?auto=format&fit=crop&w=1200&q=80`;

export const locations = [
  { city: "Yangon", slug: "yangon", townships: ["Bahan", "Kamayut", "Mayangone", "Sanchaung"] },
  { city: "Mandalay", slug: "mandalay", townships: ["Chanayethazan", "Maha Aung Myay", "Aungmyaythazan", "Amarapura"] },
];

export const categories = [
  { name: "Apartment", slug: "apartment" },
  { name: "House", slug: "house" },
  { name: "Land", slug: "land" },
  { name: "Condo", slug: "condo" },
  { name: "Shop / retail", slug: "shop-retail" },
  { name: "Office", slug: "office" },
  { name: "Warehouse", slug: "warehouse" },
];

export const demoPassword = "demo1234";

export const demoAccounts: DemoAccount[] = [
  { email: "owner@example.com", name: "Olivia Owner", role: "OWNER" },
  { email: "agent@example.com", name: "Arun Agent", role: "AGENT" },
  { email: "buyer@example.com", name: "Bella Buyer", role: "BUYER_RENTER" },
  { email: "staff@example.com", name: "Sam Staff", role: "STAFF" },
  { email: "admin@example.com", name: "Ada Admin", role: "ADMIN" },
];

export const listings: Listing[] = [
  {
    id: "demo-001", slug: "sunlit-two-bedroom-apartment-bahan",
    title: "Sunlit two-bedroom apartment in Bahan",
    description: "A bright, well-kept apartment close to cafés, schools, and daily conveniences.", intent: "RENT",
    category: { name: "Apartment", slug: "apartment" }, location: { city: "Yangon", township: "Bahan" },
    price: { amount: 1800000, currency: "MMK", period: "MONTH" },
    facts: { bedrooms: 2, bathrooms: 2, floorAreaSqm: 112, furnishing: "Partly furnished" },
    amenities: ["Lift", "Backup generator", "Parking", "Security"],
    images: [image("photo-1600607687920-4e2a09cf159d")], status: "PUBLISHED", publishedAt: "2026-09-05T08:00:00.000Z",
  },
  {
    id: "demo-002", slug: "modern-family-house-kamayut",
    title: "Modern family house with garden in Kamayut",
    description: "A private family home with generous living areas and a quiet garden setting.", intent: "SALE",
    category: { name: "House", slug: "house" }, location: { city: "Yangon", township: "Kamayut" },
    price: { amount: 980000000, currency: "MMK" },
    facts: { bedrooms: 4, bathrooms: 3, landAreaSqm: 372, floorAreaSqm: 240, furnishing: "Unfurnished" },
    amenities: ["Garden", "Parking", "Staff room", "Quiet street"],
    images: [image("photo-1600585154340-be6161a56a0c")], status: "PUBLISHED", publishedAt: "2026-09-03T08:00:00.000Z",
  },
  {
    id: "demo-003", slug: "commercial-land-mayangone-main-road",
    title: "Commercial land near the main road in Mayangone",
    description: "A rectangular plot suited to a showroom, office, or mixed-use development.", intent: "SALE",
    category: { name: "Land", slug: "land" }, location: { city: "Yangon", township: "Mayangone" },
    price: { amount: 1450000000, currency: "MMK", },
    facts: { landAreaSqm: 728 }, amenities: ["Main road access", "Corner plot", "Electricity nearby"],
    images: [image("photo-1500382017468-9049fed747ef")], status: "PUBLISHED", publishedAt: "2026-08-29T08:00:00.000Z",
  },
  {
    id: "demo-004", slug: "central-mandalay-condo-chanayethazan",
    title: "Move-in ready condo in central Mandalay",
    description: "Convenient central condo with natural light, secure access, and city views.", intent: "SALE",
    category: { name: "Condo", slug: "condo" }, location: { city: "Mandalay", township: "Chanayethazan" },
    price: { amount: 420000000, currency: "MMK" },
    facts: { bedrooms: 3, bathrooms: 2, floorAreaSqm: 148, furnishing: "Fully furnished" },
    amenities: ["Lift", "Security", "Generator", "City view"],
    images: [image("photo-1600566753190-17f0baa2a6c3")], status: "PUBLISHED", publishedAt: "2026-09-01T08:00:00.000Z",
  },
  {
    id: "demo-005", slug: "quiet-two-bedroom-rental-maha-aung-myay",
    title: "Quiet two-bedroom rental in Maha Aung Myay",
    description: "A practical rental home near universities, markets, and transport links.", intent: "RENT",
    category: { name: "House", slug: "house" }, location: { city: "Mandalay", township: "Maha Aung Myay" },
    price: { amount: 850000, currency: "MMK", period: "MONTH" },
    facts: { bedrooms: 2, bathrooms: 1, floorAreaSqm: 96, furnishing: "Unfurnished" },
    amenities: ["Parking", "Water tank", "Near market"],
    images: [image("photo-1600047509807-ba8f99d2cdde")], status: "PUBLISHED", publishedAt: "2026-08-26T08:00:00.000Z",
  },
  {
    id: "demo-006", slug: "warehouse-space-amarapura",
    title: "Flexible warehouse space in Amarapura",
    description: "High-ceiling warehouse with loading access for distribution or light industrial use.", intent: "RENT",
    category: { name: "Warehouse", slug: "warehouse" }, location: { city: "Mandalay", township: "Amarapura" },
    price: { amount: 3200000, currency: "MMK", period: "MONTH" },
    facts: { floorAreaSqm: 520, landAreaSqm: 780 }, amenities: ["Loading access", "High ceiling", "Truck access"],
    images: [image("photo-1565793298595-6a879b1d9492")], status: "PUBLISHED", publishedAt: "2026-08-21T08:00:00.000Z",
  },
];
