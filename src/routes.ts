import { Router } from "express";
import { categories, demoAccounts, demoPassword, listings, locations } from "./data.js";
import type { TransactionIntent, UserRole } from "./types.js";

export const router = Router();

const demoRoleFromRequest = (req: Parameters<Parameters<typeof router.get>[1]>[0]): UserRole | null => {
  const token = req.header("authorization")?.replace(/^Bearer\s+/i, "");
  const account = demoAccounts.find((item) => `demo-${item.role.toLowerCase()}` === token);
  return account?.role ?? null;
};

router.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "property-portal-api", version: "0.1.0" });
});

router.get("/auth/demo-accounts", (_req, res) => {
  res.json({ data: demoAccounts, password: demoPassword, mode: "development-only" });
});

router.post("/auth/login", (req, res) => {
  const email = typeof req.body?.email === "string" ? req.body.email.trim().toLowerCase() : "";
  const password = typeof req.body?.password === "string" ? req.body.password : "";
  const account = demoAccounts.find((item) => item.email === email);

  if (!account || password !== demoPassword) {
    res.status(401).json({ error: { code: "INVALID_CREDENTIALS", message: "Use one of the development demo accounts and password demo1234." } });
    return;
  }

  res.json({
    data: {
      accessToken: `demo-${account.role.toLowerCase()}`,
      user: account,
    },
    mode: "development-only",
  });
});

router.get("/locations", (_req, res) => res.json({ data: locations }));
router.get("/categories", (_req, res) => res.json({ data: categories }));

router.get("/me/listings", (req, res) => {
  const role = demoRoleFromRequest(req);
  if (!role) {
    res.status(401).json({ error: { code: "UNAUTHENTICATED", message: "Sign in is required." } });
    return;
  }

  const data = role === "OWNER" || role === "AGENT"
    ? listings.filter((listing) => !listing.ownerRole || listing.ownerRole === role)
    : [];
  res.json({ data, meta: { total: data.length, role } });
});

router.get("/listings", (req, res) => {
  const intent = typeof req.query.intent === "string" ? req.query.intent.toUpperCase() : undefined;
  const city = typeof req.query.city === "string" ? req.query.city.toLowerCase() : undefined;
  const category = typeof req.query.category === "string" ? req.query.category.toLowerCase() : undefined;
  const q = typeof req.query.q === "string" ? req.query.q.toLowerCase() : undefined;
  const minPrice = Number(req.query.minPrice ?? 0);
  const maxPrice = Number(req.query.maxPrice ?? Number.MAX_SAFE_INTEGER);
  const sort = req.query.sort === "price_asc" || req.query.sort === "price_desc" ? req.query.sort : "newest";
  const limit = Math.min(Math.max(Number(req.query.limit ?? 12), 1), 50);

  const filtered = listings
    .filter((listing) => !intent || listing.intent === intent)
    .filter((listing) => !city || listing.location.city.toLowerCase() === city)
    .filter((listing) => !category || listing.category.slug === category)
    .filter((listing) => listing.price.amount >= minPrice && listing.price.amount <= maxPrice)
    .filter((listing) => !q || `${listing.title} ${listing.description} ${listing.location.city} ${listing.location.township}`.toLowerCase().includes(q))
    .sort((a, b) => sort === "price_asc" ? a.price.amount - b.price.amount : sort === "price_desc" ? b.price.amount - a.price.amount : b.publishedAt.localeCompare(a.publishedAt));

  res.json({
    data: filtered.slice(0, limit),
    meta: { total: filtered.length, limit, filters: { intent, city, category, q, minPrice, maxPrice, sort } },
  });
});

router.post("/listings", (req, res) => {
  const role = demoRoleFromRequest(req);
  if (role !== "OWNER" && role !== "AGENT") {
    res.status(403).json({ error: { code: "LISTING_CREATE_FORBIDDEN", message: "Only owners and agents can create listings." } });
    return;
  }

  const body = req.body ?? {};
  const title = typeof body.title === "string" ? body.title.trim() : "";
  const description = typeof body.description === "string" ? body.description.trim() : "";
  const intent: TransactionIntent | null = body.intent === "RENT" ? "RENT" : body.intent === "SALE" ? "SALE" : null;
  const city = typeof body.city === "string" ? body.city.trim() : "";
  const township = typeof body.township === "string" ? body.township.trim() : "";
  const categorySlug = typeof body.category === "string" ? body.category : "house";
  const category = categories.find((item) => item.slug === categorySlug) ?? categories[1];
  const location = locations.find((item) => item.city.toLowerCase() === city.toLowerCase()) ?? locations[0];
  const priceAmount = Number(body.priceAmount);

  if (!title || !description || !intent || !city || !township || !Number.isFinite(priceAmount) || priceAmount <= 0) {
    res.status(400).json({ error: { code: "INVALID_LISTING", message: "Title, description, intent, location, and a positive price are required." } });
    return;
  }

  const slugBase = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || "property";
  const slug = `${slugBase}-${Date.now()}`;
  const account = demoAccounts.find((item) => item.role === role)!;
  const newListing = {
    id: `demo-created-${Date.now()}`,
    slug,
    title,
    description,
    intent,
    category: { name: category.name, slug: category.slug },
    location: { city: location.city, township },
    price: { amount: priceAmount, currency: "MMK", ...(intent === "RENT" ? { period: body.rentPeriod === "WEEK" || body.rentPeriod === "DAY" ? body.rentPeriod : "MONTH" } : {}) },
    facts: {
      ...(Number.isFinite(Number(body.bedrooms)) ? { bedrooms: Number(body.bedrooms) } : {}),
      ...(Number.isFinite(Number(body.bathrooms)) ? { bathrooms: Number(body.bathrooms) } : {}),
      ...(Number.isFinite(Number(body.floorAreaSqm)) ? { floorAreaSqm: Number(body.floorAreaSqm) } : {}),
      ...(Number.isFinite(Number(body.landAreaSqm)) ? { landAreaSqm: Number(body.landAreaSqm) } : {}),
      ...(typeof body.furnishing === "string" && body.furnishing ? { furnishing: body.furnishing } : {}),
    },
    amenities: Array.isArray(body.amenities) ? body.amenities.filter((item: unknown): item is string => typeof item === "string").slice(0, 8) : [],
    images: [typeof body.imageUrl === "string" && body.imageUrl.trim() ? body.imageUrl.trim() : "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"],
    status: "PUBLISHED" as const,
    publishedAt: new Date().toISOString(),
    ownerRole: role,
    createdBy: account.email,
  };

  listings.unshift(newListing);
  res.status(201).json({ data: newListing, mode: "development-only" });
});

router.get("/listings/:slug", (req, res) => {
  const listing = listings.find((item) => item.slug === req.params.slug);
  if (!listing) {
    res.status(404).json({ error: { code: "LISTING_NOT_FOUND", message: "Listing not found" } });
    return;
  }
  res.json({ data: listing });
});
