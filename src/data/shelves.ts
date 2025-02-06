export interface Shelf {
  id: string;
  name: string;
  description: string;
  color: string;
}

export const shelves: Shelf[] = [
  {
    id: "000",
    name: "Biographical Records",
    description: "Personal memoirs, photographs, and historical documentation",
    color: "from-[#4A3B27] to-[#785C38]",
  },
  {
    id: "100",
    name: "Self Development",
    description: "Goal setting, personal growth, and life planning",
    color: "from-[#5C4033] to-[#8B4513]",
  },
  {
    id: "200",
    name: "Biographical Studies",
    description: "Studies and analyses of influential figures",
    color: "from-[#785C38] to-[#C4A484]",
  },
  {
    id: "300",
    name: "Project Documentation",
    description: "Technical specifications and project records",
    color: "from-[#8B4513] to-[#D2691E]",
  },
  {
    id: "400",
    name: "Methodologies",
    description: "Procedural documentation and technical methodologies",
    color: "from-[#4A3B27] to-[#785C38]",
  },
  {
    id: "500",
    name: "Michigan Studies",
    description: "Regional history and cultural documentation",
    color: "from-[#5C4033] to-[#8B4513]",
  },
  {
    id: "600",
    name: "Literary Archives",
    description: "Book collection and reading documentation",
    color: "from-[#785C38] to-[#C4A484]",
  },
  {
    id: "700",
    name: "Medical Records",
    description: "Health documentation and wellness records",
    color: "from-[#8B4513] to-[#D2691E]",
  },
  {
    id: "800",
    name: "Technical Reference",
    description: "Engineering and computer science documentation",
    color: "from-[#4A3B27] to-[#785C38]",
  },
  {
    id: "900",
    name: "Visitor Records",
    description: "Guest registry and visitation documentation",
    color: "from-[#5C4033] to-[#8B4513]",
  },
]; 