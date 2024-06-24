import {
  GraduationCap,
  Shield,
  University,
  Briefcase,
  ClipboardCheck,
  Wallet,
  Salad,
  KeyRound,
  Globe,
  BookMarked,
  Compass,
  Earth,
  User,
  Monitor,
  Banknote,
  Microscope,
  MessagesSquare,
  Lightbulb,
  Dumbbell,
  BusFront,
} from "lucide-react";

const categories = [
  {
    name: "Academics",
    icon: GraduationCap,
    value: "academics",
    items: 12,
  },
  { name: "Administrative", icon: Shield, value: "administrative", items: 7 },
  { name: "Admissions", icon: University, value: "admissions", items: 42 },
  { name: "Careers", icon: Briefcase, value: "careers", items: 8 },
  { name: "Enrollment", icon: ClipboardCheck, value: "enrollment", items: 45 },
  {
    name: "Faculty Services",
    icon: User,
    value: "faculty-services",
    items: 22,
  },
  { name: "Facilities", icon: KeyRound, value: "facilities", items: 15 },
  { name: "Finances", icon: Wallet, value: "finances", items: 18 },
  { name: "Housing & Dining", icon: Salad, value: "housing", items: 2 },
  { name: "International", icon: Globe, value: "international", items: 28 },
  { name: "IT Services", icon: Monitor, value: "it-services", items: 21 },
  { name: "Libraries", icon: BookMarked, value: "libraries", items: 15 },
  { name: "Orientation", icon: Compass, value: "orientation", items: 3 },
  { name: "Payroll & Taxes", icon: Banknote, value: "payroll-taxes", items: 4 },
  { name: "People & Culture", icon: Earth, value: "hr-benefits", items: 14 },
  {
    name: "Personal Information",
    icon: User,
    value: "personal-information",
    items: 7,
  },
  {
    name: "Social Media",
    icon: MessagesSquare,
    value: "social-media",
    items: 5,
  },
  { name: "Research", icon: Microscope, value: "research", items: 5 },
  {
    name: "Teaching & Learning",
    icon: Lightbulb,
    value: "teaching-learing",
    items: 14,
  },
  { name: "Training", icon: Dumbbell, value: "training", items: 2 },
  { name: "Transit", icon: BusFront, value: "transportation", items: 5 },
] as const;

const categoryNameMap = categories.reduce(
  (acc, category) => ({ ...acc, [category.value]: category.name }),
  {} as Record<CategoryValue, string>,
);

export type CategoryItem = (typeof categories)[number];
export type CategoryValue = CategoryItem["value"];

export const mapCategoryValueToName = (value: CategoryValue) =>
  categoryNameMap[value];
export default categories;
