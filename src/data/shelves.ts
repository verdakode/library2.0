export interface Shelf {
  id: string;
  name: string;
  description: string;
  color: string;
}

export const shelves: Shelf[] = [
  {
    id: "000",
    name: "Generalities",
    description: "Tools, Hacks, General Knowledge",
    color: "from-[#4A3B27] to-[#785C38]",
  },
  {
    id: "100",
    name: "Philosophy",
    description: "Personal Philosophy, Life Events",
    color: "from-[#5C4033] to-[#8B4513]",
  },
  {
    id: "200",
    name: "Spirituality",
    description: "Personal Growth, Meditation",
    color: "from-[#785C38] to-[#C4A484]",
  },
  {
    id: "300",
    name: "Social",
    description: "Guestbook, Social Connections",
    color: "from-[#8B4513] to-[#D2691E]",
  },
  {
    id: "400",
    name: "Language",
    description: "Writing, Blog Posts",
    color: "from-[#4A3B27] to-[#785C38]",
  },
  {
    id: "500",
    name: "Science",
    description: "Health Tracking, Data",
    color: "from-[#5C4033] to-[#8B4513]",
  },
  {
    id: "600",
    name: "Technology",
    description: "Tech Projects Archive",
    color: "from-[#785C38] to-[#C4A484]",
  },
  {
    id: "700",
    name: "Arts",
    description: "Media Consumption, Creative Works",
    color: "from-[#8B4513] to-[#D2691E]",
  },
  {
    id: "800",
    name: "Literature",
    description: "Reading List, Book Notes",
    color: "from-[#4A3B27] to-[#785C38]",
  },
  {
    id: "900",
    name: "History",
    description: "Personal Timeline, Memory Archive",
    color: "from-[#5C4033] to-[#8B4513]",
  },
]; 