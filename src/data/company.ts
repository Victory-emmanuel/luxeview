import { CompanyInfo, Agent } from '@/types';
import agentImage from '@/assets/agent-profile.jpg';

export const agents: Agent[] = [
  {
    id: 1,
    name: 'Sarah Mitchell',
    title: 'Founding Partner & Senior Luxury Specialist',
    image: agentImage,
    bio: 'With over two decades of experience in ultra-luxury real estate, Sarah has established herself as one of the most trusted advisors in the industry. Her commitment to white-glove service and intimate knowledge of the most exclusive markets ensures a seamless journey to your dream home.',
    phone: '+1 (555) 123-4567',
    email: 'sarah.mitchell@luxeviewelite.com',
    specialties: ['Manhattan Penthouses', 'Hamptons Estates', 'Investment Properties'],
    experience: '20+ years'
  },
  {
    id: 2,
    name: 'Michael Chen',
    title: 'West Coast Luxury Specialist',
    image: agentImage,
    bio: 'Michael brings a unique perspective to luxury real estate with his background in architecture and design. His expertise in California\'s most prestigious markets has helped countless clients find their perfect coastal retreat.',
    phone: '+1 (555) 234-5678',
    email: 'michael.chen@luxeviewelite.com',
    specialties: ['Malibu Oceanfront', 'Beverly Hills Estates', 'Modern Architecture'],
    experience: '15+ years'
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    title: 'Mountain & Resort Specialist',
    image: agentImage,
    bio: 'Emily specializes in luxury mountain properties and resort communities. Her deep understanding of seasonal markets and recreational property investments makes her the go-to expert for mountain luxury.',
    phone: '+1 (555) 345-6789',
    email: 'emily.rodriguez@luxeviewelite.com',
    specialties: ['Aspen Properties', 'Ski Resorts', 'Mountain Retreats'],
    experience: '12+ years'
  },
  {
    id: 4,
    name: 'David Thompson',
    title: 'Estate & Investment Specialist',
    image: agentImage,
    bio: 'David focuses on large estates and investment properties, bringing institutional-level expertise to private clients. His analytical approach and market insights have generated exceptional returns for his clients.',
    phone: '+1 (555) 456-7890',
    email: 'david.thompson@luxeviewelite.com',
    specialties: ['Large Estates', 'Investment Analysis', 'Portfolio Management'],
    experience: '18+ years'
  }
];

export const companyInfo: CompanyInfo = {
  name: 'LuxeView Elite',
  tagline: 'Experience Unparalleled Living',
  description: 'LuxeView Elite represents the pinnacle of luxury real estate services, specializing in the world\'s most extraordinary properties. Our curated approach and white-glove service ensure that every client experience exceeds expectations.',
  mission: 'To redefine luxury real estate by providing unparalleled service, expertise, and access to the world\'s most extraordinary properties.',
  vision: 'To be the global leader in luxury real estate, setting the standard for excellence and innovation in the industry.',
  founded: '2010',
  team: agents,
  contact: {
    phone: '+1 (555) 123-LUXE',
    email: 'info@luxeviewelite.com',
    address: '432 Park Avenue, Suite 4500, New York, NY 10016',
    hours: 'Monday - Friday: 9:00 AM - 7:00 PM\nSaturday: 10:00 AM - 6:00 PM\nSunday: By Appointment',
    socialMedia: {
      instagram: '@luxeviewelite',
      linkedin: 'company/luxeview-elite',
      facebook: 'LuxeViewElite'
    }
  }
};
