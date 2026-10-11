export interface ATSFeedbackItem {
  id: string;
  category: "critical" | "warning" | "positive";
  section: "Format" | "Keywords" | "Experience" | "Skills" | "Contact";
  title: string;
  description: string;
  recommendation: string;
}

export interface ATSAnalysisResult {
  overallScore: number; // 0 - 100
  tier: "needs_work" | "good" | "exceptional"; // <60, 60-79, >=80
  breakdown: {
    formatCompatibility: number; // e.g. 85
    keywordMatch: number;        // e.g. 70
    contentRelevance: number;    // e.g. 75
    readabilityScore: number;    // e.g. 90
  };
  detectedSkills: string[];
  missingIndustryKeywords: string[];
  feedbacks: ATSFeedbackItem[];
  scannedAt: string;
}

export interface CareerReadiness {
  score: number; // 0 - 100
  verifiedSkillsCount: number;
  atsScore: number;
  portfolioProjectsCount: number;
  nextRecommendedAction: {
    title: string;
    description: string;
    actionLabel: string;
    actionUrl: string;
  };
}
