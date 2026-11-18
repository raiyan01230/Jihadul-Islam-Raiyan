export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  category: 'web' | 'mobile' | 'ai' | 'islamic' | 'other';
  image: string;
  tech: string[];
  liveUrl: string;
  githubUrl?: string;
  featured: boolean;
  stats?: { stars?: number; forks?: number; users?: number };
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  credentialUrl: string;
  imageUrl: string;
  skills: string[];
}

export interface TimelineEvent {
  id: string;
  year: string;
  role: string;
  company: string;
  description: string;
  type: 'education' | 'experience' | 'milestone';
}

export interface Skill {
  name: string;
  category: 'Frontend' | 'Backend' | 'Database/Cloud' | 'AI & Tools' | 'Other';
  level: number; // 0 to 100
  icon: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai' | 'system';
  text: string;
  timestamp: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
}

export interface PricingPlan {
  name: string;
  price: string;
  priceLabel?: string;
  delivery: string;
  revisions: string;
  description: string;
  features: string[];
  isPopular?: boolean;
}

export interface PricingCategory {
  id: string;
  title: string;
  description: string;
  priceRange: string;
  plans: PricingPlan[];
}

