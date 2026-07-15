import {
  ScanLine,
  Package,
  BarChart3,
  Users,
  Receipt,
  ShieldCheck,
  Zap,
  Search,
  BadgeIndianRupee,
  UserRoundCog,
  Store,
  Shirt,
  ShoppingBag,
  Tags,
  CheckCircle2,
} from "lucide-react";

export const storeTypes = [
  {
    icon: Shirt,
    label: "Clothing Stores",
  },
  {
    icon: Store,
    label: "Boutiques",
  },
  {
    icon: ShoppingBag,
    label: "Fashion Retailers",
  },
  {
    icon: Tags,
    label: "Garment Stores",
  },
];

export const benefits = [
  {
    icon: Zap,
    title: "Faster counter billing",
    description:
      "Scan product tags, add customer details, apply discounts and complete bills without switching between multiple tools.",
  },
  {
    icon: Package,
    title: "Know your stock",
    description:
      "Track products by SKU, size and colour while keeping a clear view of available and low-stock items.",
  },
  {
    icon: BarChart3,
    title: "Understand your sales",
    description:
      "See revenue, bill counts and sales trends from a dashboard designed to make daily store performance easy to understand.",
  },
  {
    icon: ShieldCheck,
    title: "Controlled staff access",
    description:
      "Shop owners manage their store while sales staff get access to the tools they need for day-to-day billing.",
  },
  {
    icon: Search,
    title: "Find information quickly",
    description:
      "Search products and customers without digging through notebooks, spreadsheets or disconnected records.",
  },
  {
    icon: BadgeIndianRupee,
    title: "Designed for Indian retail",
    description:
      "A retail workflow built around Indian Rupees and the practical needs of clothing stores and boutiques.",
  },
];

export const features = [
  {
    icon: ScanLine,
    title: "QR-first billing",
    description:
      "Scan product tags at the counter, add items to a bill and move customers through checkout with fewer manual steps.",
  },
  {
    icon: Package,
    title: "Inventory management",
    description:
      "Manage products with SKU, category, size, colour, selling price, MRP and stock information from one place.",
  },
  {
    icon: Receipt,
    title: "Flexible billing",
    description:
      "Create customer bills, apply supported discounts and accept common payment methods including cash, card and UPI.",
  },
  {
    icon: BarChart3,
    title: "Sales reporting",
    description:
      "Review revenue and sales activity to understand how your store is performing across different periods.",
  },
  {
    icon: Users,
    title: "Customer records",
    description:
      "Keep useful customer information connected to your retail workflow instead of maintaining separate manual records.",
  },
  {
    icon: UserRoundCog,
    title: "Staff management",
    description:
      "Shop owners can create accounts for their sales team and maintain clear access boundaries between different roles.",
  },
];

export const workflowSteps = [
  {
    number: "01",
    icon: Store,
    title: "Get your store onboarded",
    description:
      "We set up your store and create the primary owner account. There is no open public registration.",
  },
  {
    number: "02",
    icon: Package,
    title: "Set up your inventory",
    description:
      "The shop owner adds products, prices, stock details and the information needed for day-to-day operations.",
  },
  {
    number: "03",
    icon: Users,
    title: "Add your sales team",
    description:
      "The owner creates staff accounts so salespeople can securely access the tools assigned to their role.",
  },
  {
    number: "04",
    icon: ScanLine,
    title: "Start billing",
    description:
      "Your team can log in at the counter, scan products, create bills and keep store activity organized digitally.",
  },
];

export const modules = [
  {
    number: "01",
    title: "Billing",
    description:
      "A streamlined counter experience for scanning products, creating bills, applying discounts and recording payments.",
    features: [
      "QR-based product scanning",
      "Customer details",
      "Discount handling",
      "Cash, card and UPI payments",
    ],
  },
  {
    number: "02",
    title: "Inventory",
    description:
      "A central place for managing your clothing catalogue and understanding current stock availability.",
    features: [
      "SKU-based products",
      "Size and colour variants",
      "MRP and selling price",
      "Low-stock visibility",
    ],
  },
  {
    number: "03",
    title: "Reports",
    description:
      "Clear business information that helps owners understand sales performance without manually calculating totals.",
    features: [
      "Revenue overview",
      "Sales trends",
      "Bill activity",
      "Business performance visibility",
    ],
  },
  {
    number: "04",
    title: "Customers & Staff",
    description:
      "Keep customer information organized while giving your team controlled access to the store console.",
    features: [
      "Customer directory",
      "Customer purchase context",
      "Salesperson accounts",
      "Role-based access",
    ],
  },
];

export const faqs = [
  {
    question: "Can anyone create an account?",
    answer:
      "No. TallySpurt does not use open public registration. Store accounts are created during onboarding so access stays controlled.",
  },
  {
    question: "Can a shop owner create accounts for employees?",
    answer:
      "Yes. Once the shop owner has access to their store, they can create accounts for sales staff according to the permissions available to that role.",
  },
  {
    question: "Will salespeople have access to owner-level features?",
    answer:
      "No. Access is role-based. The goal is to give sales staff the functionality required for their work without exposing owner-level management features.",
  },
  {
    question: "Can I manage products with different sizes and colours?",
    answer:
      "Yes. The inventory model is designed for clothing retail, where product information can include attributes such as SKU, size, colour, price and stock.",
  },
  {
    question: "Can the software be used for billing at the counter?",
    answer:
      "Yes. Counter billing is one of the core workflows. Staff can identify products, create a bill, apply supported discounts and record the payment method.",
  },
  {
    question: "How do I get started with TallySpurt?",
    answer:
      "Use the contact or demo option on this page. After discussing your store requirements, your store and owner account can be onboarded.",
  },
];

export const footerLinks = {
  product: [
    { label: "Features", href: "#features" },
    { label: "Modules", href: "#modules" },
    { label: "How it works", href: "#how-it-works" },
  ],
  resources: [
    { label: "FAQ", href: "#faq" },
    { label: "Contact", href: "#contact" },
  ],
};