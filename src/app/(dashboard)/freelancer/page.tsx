"use client"

import { Card } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { SkillsRadarChart } from "@/components/dashboard/SkillsRadarChart"
import { SkillsBarChart } from "@/components/dashboard/SkillsBarChart"
import { ActivityTimeline } from "@/components/dashboard/ActivityTimeline"
import { motion } from "framer-motion"
import { 
  Briefcase, 
  TrendingUp, 
  Clock, 
  CheckCircle2, 
  ArrowRight,
  Sparkles,
  Target,
  Award
} from "lucide-react"

// Mock data - in production, fetch from API
const freelancerData = {
  name: "John Doe",
  title: "Full Stack Developer",
  skills: ["React", "TypeScript", "Node.js", "Figma", "Next.js"],
  stats: {
    jobsApplied: 24,
    proposalsSent: 18,
    acceptanceRate: 65,
    activeProjects: 3,
  },
  skillsData: [
    { skill: "React", level: 90, jobs: 12 },
    { skill: "TypeScript", level: 85, jobs: 10 },
    { skill: "Node.js", level: 80, jobs: 8 },
    { skill: "Figma", level: 75, jobs: 6 },
    { skill: "Next.js", level: 70, jobs: 5 },
  ],
  recentActivity: [
    { type: "applied" as const, title: "UI/UX Designer needed", time: "2 hours ago" },
    { type: "accepted" as const, title: "Website Redesign Project", time: "1 day ago" },
    { type: "submitted" as const, title: "E-commerce Platform", time: "3 days ago" },
  ],
  recommendedJobs: [
    { 
      id: 1, 
      title: "React Developer for SaaS Dashboard", 
      budget: "Rp 5.000.000", 
      matchScore: 95,
      skills: ["React", "TypeScript", "Tailwind CSS"]
    },
    { 
      id: 2, 
      title: "Full Stack Engineer - Fintech", 
      budget: "Rp 8.000.000", 
      matchScore: 88,
      skills: ["Next.js", "Node.js", "PostgreSQL"]
    },
  ]
}

export default function FreelancerDashboard() {
  const reveal = {
    hidden: { opacity: 0, y: 16 },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: index * 0.06, duration: 0.35, ease: [0.16, 1, 0.3, 1] as const }
    })
  }

  return (
    <div className="space-y-8 pb-8">
      {/* Header */}
      <div className="border-b border-border pb-7">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-accent">Freelancer workspace</p>
          <h1 className="font-display text-3xl font-bold tracking-tight text-text-heading sm:text-4xl">
            Welcome back, {freelancerData.name}
          </h1>
          <p className="mt-2 max-w-lg text-sm leading-relaxed text-text-muted">
            Your next strong match is closer than you think. Review your progress and keep your profile ready.
          </p>
        </div>
        <Button variant="black" className="shrink-0">
          <Target className="w-4 h-4 mr-2" />
          Find Jobs
        </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div custom={0} initial="hidden" animate="visible" variants={reveal}>
        <Card hover={false} className="p-6 border-l-4 border-l-primary">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-muted mb-1">Jobs Applied</p>
              <p className="text-2xl font-bold text-text-heading">
                {freelancerData.stats.jobsApplied}
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Briefcase className="w-6 h-6 text-primary" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-xs text-success">
            <TrendingUp className="w-3 h-3 mr-1" />
            +12% from last month
          </div>
        </Card>
        </motion.div>

        <motion.div custom={1} initial="hidden" animate="visible" variants={reveal}>
        <Card hover={false} className="p-6 border-l-4 border-l-accent">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-muted mb-1">Proposals Sent</p>
              <p className="text-2xl font-bold text-text-heading">
                {freelancerData.stats.proposalsSent}
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
              <Clock className="w-6 h-6 text-accent" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-xs text-success">
            <TrendingUp className="w-3 h-3 mr-1" />
            +8% from last month
          </div>
        </Card>
        </motion.div>

        <motion.div custom={2} initial="hidden" animate="visible" variants={reveal}>
        <Card hover={false} className="p-6 border-l-4 border-l-success">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-muted mb-1">Acceptance Rate</p>
              <p className="text-2xl font-bold text-text-heading">
                {freelancerData.stats.acceptanceRate}%
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 text-success" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-xs text-success">
            <TrendingUp className="w-3 h-3 mr-1" />
            +5% from last month
          </div>
        </Card>
        </motion.div>

        <motion.div custom={3} initial="hidden" animate="visible" variants={reveal}>
        <Card hover={false} className="p-6 border-l-4 border-l-warning">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-muted mb-1">Active Projects</p>
              <p className="text-2xl font-bold text-text-heading">
                {freelancerData.stats.activeProjects}
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-warning/10 flex items-center justify-center">
              <Award className="w-6 h-6 text-warning" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-xs text-text-muted">
            2 completing this week
          </div>
        </Card>
        </motion.div>
      </div>



      {/* Charts Section */}
      <div className="workspace-analytics-grid">
        <Card hover={false} className="workspace-primary-panel p-6">
          <h2 className="text-lg font-semibold text-text-heading mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-accent" />
            Skills vs Job Opportunities
          </h2>
          <SkillsBarChart data={freelancerData.skillsData} />
        </Card>

        <Card hover={false} className="workspace-insight-panel p-6">
          <h2 className="text-lg font-semibold text-text-heading mb-4 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            Skills Distribution
          </h2>
          <SkillsRadarChart data={freelancerData.skillsData} />
        </Card>
      </div>

      {/* Activity & Recommendations */}
      <div className="workspace-lower-grid">
        <Card hover={false} className="p-6">
          <h2 className="text-lg font-semibold text-text-heading mb-4">Recent Activity</h2>
          <ActivityTimeline activities={freelancerData.recentActivity} />
        </Card>

        <Card hover={false} className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-text-heading">Recommended for You</h2>
            <Button variant="ghost" size="sm">
              View All
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
          
          <div className="space-y-4">
            {freelancerData.recommendedJobs.map((job) => (
              <div key={job.id} className="p-4 rounded-lg border border-border hover:border-primary/50 transition-all">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-text-heading text-sm">{job.title}</h3>
                  <Badge variant="success" className="text-xs">
                    {job.matchScore}% Match
                  </Badge>
                </div>
                <p className="text-sm text-primary font-semibold mb-3">{job.budget}</p>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {job.skills.map((skill) => (
                    <Badge key={skill} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  View Details
                </Button>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
