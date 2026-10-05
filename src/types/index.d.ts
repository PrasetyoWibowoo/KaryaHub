export * from "./job";
export * from "./ats";
export * from "./escrow";

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: "FREELANCER" | "UMKM" | "ADMIN";
  avatarUrl?: string;
  headline?: string;
  university?: string;
  major?: string;
  skills: string[];
}
