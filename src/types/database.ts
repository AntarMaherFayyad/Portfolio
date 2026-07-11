export interface PersonalInfo {
  id: number;
  name: string;
  title: string;
  phone: string | null;
  email: string | null;
  github: string | null;
  github_username: string | null;
  available: boolean;
  image: string | null;
  description: string | null;
}

export interface Project {
  id: number;
  name: string;
  description: string | null;
  image: string | null;
  tech: string[];
  live_demo: string | null;
  github: string | null;
  created_at: string;
}

export interface Skill {
  id: number;
  name: string;
  level: string;
  sort_order: number;
  icon_name: string;
  level_percent: number;
  tone: string;
}