export interface PersonalInfo {
  name: string;
  title: string;
  subtitle: string;
  email: string;
  phone: string;
  location: string;
  profileName: string;
  avatar: string;
  whatsappNumber: string;
  resumePath: string;
  github: string;
  linkedin: string;
}

export interface ProfessionalSummary {
  text: string;
  stats: {
    yearsExperience: string;
    projectsCompleted: string;
    apiIntegrations: string;
  };
}

export interface ApiIntegration {
  name: string;
  description: string;
  logo: string;
}

export interface ZohoProduct {
  name: string;
  description: string;
  logo: string;
}

export interface ContentCreation {
  name: string;
  description: string;
  logo: string;
}

export interface Skills {
  coreExpertise: string[];
  technical: {
    [category: string]: string[];
  };
  apiIntegrations: ApiIntegration[];
  contentCreation: ContentCreation[];
  zohoExperience: ZohoProduct[];
  other: {
    [category: string]: string[];
  };
}

export interface Experience {
  title: string;
  company: string;
  period: string;
  location: string;
  type: string;
  achievements: string[];
}

export interface Service {
  title: string;
  description: string;
  features: string[];
  platforms: string[];
  pricing: string;
}

export interface Project {
  title: string;
  description: string;
  link?: string;
  linkText?: string;
  status: string;
  metrics?: string;
}

export interface Education {
  degree: string;
  institution: string;
  duration: string;
  focus?: string;
  coursework?: string[];
}

export interface Certification {
  title: string;
  issuer: string;
  date: string;
  description: string;
}

export interface Contact {
  formTitle: string;
  formDescription: string;
  messageTitle: string;
}

export interface Footer {
  copyright: string;
}

export interface PortfolioData {
  personalInfo: PersonalInfo;
  professionalSummary: ProfessionalSummary;
  skills: Skills;
  services: Service[];
  experience: Experience[];
  projects: Project[];
  education: Education[];
  certifications: Certification[];
  contact: Contact;
  footer: Footer;
  navigation: string[];
}
