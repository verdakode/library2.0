export interface Shelf {
  id: string;
  name: string;
  description: string;
  color: string;
}

export const shelves: Shelf[] = [
  {
    id: "000",
    name: "Biography & Personal History",
    description: "Personal chronicles, life events, and photographic records",
    color: "from-[#4A3B27] to-[#785C38]",
  },
  {
    id: "100",
    name: "Personal Development",
    description: "Future aspirations, plans, and personal growth",
    color: "from-[#5C4033] to-[#8B4513]",
  },
  {
    id: "200",
    name: "Notable Figures",
    description: "Profiles and influences of remarkable individuals",
    color: "from-[#785C38] to-[#C4A484]",
  },
  {
    id: "300",
    name: "Project Archives",
    description: "Documentation of past and present endeavors",
    color: "from-[#8B4513] to-[#D2691E]",
  },
  {
    id: "400",
    name: "Technical Reference",
    description: "Collected methodologies and practical knowledge",
    color: "from-[#4A3B27] to-[#785C38]",
  },
  {
    id: "500",
    name: "Regional Studies",
    description: "Michigan history, culture, and local information",
    color: "from-[#5C4033] to-[#8B4513]",
  },
  {
    id: "600",
    name: "Literature Collection",
    description: "Personal library catalog and reading records",
    color: "from-[#785C38] to-[#C4A484]",
  },
  {
    id: "700",
    name: "Health Sciences",
    description: "Medical records and wellness documentation",
    color: "from-[#8B4513] to-[#D2691E]",
  },
  {
    id: "800",
    name: "Engineering & Technology",
    description: "3D printing, robotics, and programming references",
    color: "from-[#4A3B27] to-[#785C38]",
  },
  {
    id: "900",
    name: "Guest Registry",
    description: "Visitor records and signatures",
    color: "from-[#5C4033] to-[#8B4513]",
  },
]; 