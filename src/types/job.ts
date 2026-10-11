export type JobType = "PROJECT" | "INTERNSHIP" | "FREELANCE";
export type WorkplaceType = "REMOTE" | "HYBRID" | "ONSITE";
export type JobStatus = "OPEN" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED";

export interface SkillItem {
  id: string;
  name: string;
  category?: string;
}

export interface JobMatchAnalysis {
  score: number; // 0 - 100
  matchedSkills: string[];
  missingSkills: string[];
  tier: "high" | "mid" | "low"; // high >= 80%, mid >= 60%, low < 60%
}

export interface Job {
  id: string;
  title: string;
  employerId: string;
  employerName: string;
  companyName?: string;
  employerAvatar?: string;
  category: string;
  type: JobType;
  workplace: WorkplaceType;
  location: string;
  duration: string; // e.g. "3 bulan" or "2 minggu"
  budget: number; // in IDR
  status: JobStatus;
  description: string;
  requirements: string[];
  skills: SkillItem[];
  matchScore?: JobMatchAnalysis;
  createdAt: string;
}

export interface JobFilterParams {
  search?: string;
  category?: string;
  type?: JobType | "ALL";
  workplace?: WorkplaceType | "ALL";
  minBudget?: number;
  maxBudget?: number;
}
