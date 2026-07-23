export interface Product {
  id: string;
  name: string;
  image: string;
  price: string;
  unit: string;
  badge: string;
  badgeColor: string;
  description: string;
  rating: string;
  seal: string;
  available: boolean;
}

export interface Plan {
  id: string;
  title: string;
  quantity: string;
  price: string;
  period: string;
  badge: string;
  badgeStyle: string;
  features: string[];
  highlighted: boolean;
  ctaText: string;
}

export interface SiteSettings {
  brandName: string;
  trustedFamilies: string;
  qualityRating: string;
  deliveryTime: string;
  heroHeadline: string;
  heroSubheadline: string;
  trustPill: string;
  contactPhone: string;
  contactEmail: string;
}

export const initialSiteSettings: SiteSettings = {
  brandName: "NSV Pure Milk",
  trustedFamilies: "350+",
  qualityRating: "4.9 ★",
  deliveryTime: "Before 7 AM",
  heroHeadline: "Pure NSV Farm Fresh Milk, Delivered Every Morning",
  heroSubheadline: "Directly from our natural dairy farms to your kitchen. Chilled rapidly at 4°C and delivered to your doorstep before 7:00 AM.",
  trustPill: "🌱 100% Pure, Organic & Chemical-Free Milk",
  contactPhone: "+91 98765 43210",
  contactEmail: "info@nsvpuremilk.com",
};

export const initialProducts: Product[] = [
  {
    id: "cow-milk",
    name: "NSV Pure Cow Milk",
    image: "/images/cow_milk.jpg",
    price: "₹65",
    unit: "/ Litre",
    badge: "⭐ Most Popular",
    badgeColor: "bg-amber-100 text-amber-950 border-amber-300 font-extrabold",
    description: "100% pure, unadulterated fresh cow milk directly from NSV Dairy Farm. Rich in natural calcium, protein, and essential vitamins.",
    rating: "4.9 ★ (150+ reviews)",
    seal: "NSV Certified Pure",
    available: true,
  },
  {
    id: "buffalo-milk",
    name: "NSV Rich Buffalo Milk",
    image: "/images/buffalo_milk.jpg",
    price: "₹80",
    unit: "/ Litre",
    badge: "🥛 Thick & Creamy",
    badgeColor: "bg-emerald-100 text-emerald-950 border-emerald-300 font-extrabold",
    description: "Thick, high-fat pure buffalo milk from NSV farms, ideal for tea, coffee, rich curd, and traditional Indian sweets.",
    rating: "4.9 ★ (120+ reviews)",
    seal: "NSV High Cream",
    available: true,
  },
  {
    id: "a2-milk",
    name: "NSV Native A2 Desi Milk",
    image: "/images/a2_milk.jpg",
    price: "₹110",
    unit: "/ Litre",
    badge: "🌿 Organic A2 Pure",
    badgeColor: "bg-purple-100 text-purple-950 border-purple-300 font-extrabold",
    description: "Easy-to-digest A2 beta-casein protein milk from indigenous free-grazing desi cows at NSV Dairy Farm.",
    rating: "5.0 ★ (80+ reviews)",
    seal: "NSV A2 Original",
    available: true,
  },
  {
    id: "fresh-curd",
    name: "NSV Farm Fresh Curd",
    image: "/images/fresh_curd.jpg",
    price: "₹60",
    unit: "/ Kg",
    badge: "🥣 Clay Pot Dahi",
    badgeColor: "bg-teal-100 text-teal-950 border-teal-300 font-extrabold",
    description: "Thick, naturally set fresh curd prepared in traditional terracotta clay pots with zero artificial additives.",
    rating: "4.8 ★ (95+ reviews)",
    seal: "NSV Clay Pot Pure",
    available: true,
  },
];

export const initialPlans: Plan[] = [
  {
    id: "plan-lite",
    title: "Daily Lite Plan",
    quantity: "500 ml / Day",
    price: "₹975",
    period: "/ month",
    badge: "For Small Families / Individuals",
    badgeStyle: "bg-slate-100 text-slate-800 border-slate-300",
    features: [
      "100% Farm Fresh Cow or Buffalo Milk",
      "Daily Morning Delivery before 7:00 AM",
      "Pause, Resume or Modify Anytime",
      "Chilled Cold-Chain Storage at 4°C",
    ],
    highlighted: false,
    ctaText: "Start Lite Plan (Trial)",
  },
  {
    id: "plan-family",
    title: "Family 1-Month Plan",
    quantity: "1 Litre / Day",
    price: "₹1,950",
    period: "/ month",
    badge: "⭐ MOST POPULAR PLAN",
    badgeStyle: "bg-amber-400 text-amber-950 font-black shadow-xs",
    features: [
      "100% Farm Fresh Pure Milk (1L/Day)",
      "Guaranteed Delivery Before 7:00 AM",
      "Pause / Resume Anytime via App/WhatsApp",
      "Free Sample Bottle on First Order",
      "Priority Doorstep Service",
    ],
    highlighted: true,
    ctaText: "Subscribe 1-Month Family Plan",
  },
  {
    id: "plan-premium",
    title: "Premium Family Plan",
    quantity: "2 Litres / Day",
    price: "₹3,800",
    period: "/ month",
    badge: "Best Value (Save ₹200/mo)",
    badgeStyle: "bg-emerald-100 text-emerald-950 border-emerald-300",
    features: [
      "2 Litres Daily Pure Milk Delivery",
      "Mix Cow Milk & Buffalo Milk as needed",
      "Flexible Delivery Schedules (Alt Days available)",
      "Zero Cancellation or Pause Fees",
    ],
    highlighted: false,
    ctaText: "Start Premium 2L Plan",
  },
];
