export type TransactionIntent = "SALE" | "RENT";

export type UserRole = "OWNER" | "AGENT" | "BUYER_RENTER" | "STAFF" | "ADMIN";

export type DemoAccount = {
  email: string;
  name: string;
  role: UserRole;
};

export type Listing = {
  id: string;
  slug: string;
  title: string;
  description: string;
  intent: TransactionIntent;
  category: { name: string; slug: string };
  location: { city: string; township: string };
  price: { amount: number; currency: string; period?: "MONTH" | "WEEK" | "DAY" };
  facts: {
    bedrooms?: number;
    bathrooms?: number;
    floorAreaSqm?: number;
    landAreaSqm?: number;
    furnishing?: string;
  };
  amenities: string[];
  images: string[];
  status: "PUBLISHED" | "DRAFT" | "SUBMITTED";
  publishedAt: string;
  ownerRole?: UserRole;
  createdBy?: string;
};
