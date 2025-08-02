import { CompanyInfo, Agent } from "@/types";

export const agents: Agent[] = [
  {
    id: 1,
    name: "Sarah Mitchell",
    title: "Founding Partner & Senior Luxury Specialist",
    image:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    bio: "With over two decades of experience in ultra-luxury real estate, Sarah has established herself as one of the most trusted advisors in the industry. Her commitment to white-glove service and intimate knowledge of the most exclusive markets ensures a seamless journey to your dream home.",
    phone: "+1 (555) 123-4567",
    email: "sarah.mitchell@luxeviewelite.com",
    specialties: [
      "Manhattan Penthouses",
      "Hamptons Estates",
      "Investment Properties",
    ],
    experience: "20+ years",
  },
  {
    id: 2,
    name: "Michael Chen",
    title: "Senior Luxury Specialist",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    bio: "Michael brings a unique perspective to luxury real estate with his background in architecture and design. His keen eye for exceptional properties and dedication to client satisfaction has made him one of the most sought-after agents in the industry.",
    phone: "+1 (555) 234-5678",
    email: "michael.chen@luxeviewelite.com",
    specialties: [
      "Modern Architecture",
      "Oceanfront Properties",
      "Celebrity Homes",
    ],
    experience: "15+ years",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    title: "Luxury Property Consultant",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    bio: "Emily specializes in mountain and ski properties, bringing unparalleled expertise to luxury resort real estate. Her passion for outdoor living and deep market knowledge helps clients find their perfect mountain retreat.",
    phone: "+1 (555) 345-6789",
    email: "emily.rodriguez@luxeviewelite.com",
    specialties: ["Mountain Properties", "Ski Resorts", "Vacation Homes"],
    experience: "12+ years",
  },
  {
    id: 4,
    name: "David Thompson",
    title: "Estate Specialist",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    bio: "David focuses on ultra-luxury estates and historic properties. His extensive network and negotiation skills have facilitated some of the most significant luxury real estate transactions in the industry.",
    phone: "+1 (555) 456-7890",
    email: "david.thompson@luxeviewelite.com",
    specialties: [
      "Historic Estates",
      "Ultra-Luxury Properties",
      "Investment Portfolios",
    ],
    experience: "18+ years",
  },
];

export const companyInfo: CompanyInfo = {
  name: "LuxeView Elite",
  tagline: "Experience Unparalleled Living",
  description:
    "LuxeView Elite represents the pinnacle of luxury real estate services, specializing in the world's most extraordinary properties. Our curated approach and white-glove service ensure that every client experience exceeds expectations.",
  mission:
    "To redefine luxury real estate by providing unparalleled service, expertise, and access to the world's most extraordinary properties.",
  vision:
    "To be the global leader in luxury real estate, setting the standard for excellence and innovation in the industry.",
  founded: "2010",
  team: agents,
  contact: {
    phone: "+1 (555) 123-LUXE",
    email: "info@luxeviewelite.com",
    address: "432 Park Avenue, Suite 4500, New York, NY 10016",
    hours:
      "Monday - Friday: 9:00 AM - 7:00 PM, Saturday - Sunday: 10:00 AM - 5:00 PM",
  },
  social: {
    instagram: "@luxeviewelite",
    facebook: "LuxeViewElite",
    linkedin: "company/luxeview-elite",
    twitter: "@luxeviewelite",
  },
  stats: {
    propertiesSold: "500+",
    totalValue: "$2.5B+",
    averagePrice: "$5M",
    clientSatisfaction: "99%",
  },
};
