"use client"

import { Card } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { ProjectStatusChart } from "@/components/dashboard/ProjectStatusChart"
import { ApplicantTrendChart } from "@/components/dashboard/ApplicantTrendChart"
import { 
  PlusCircle, 
  Briefcase, 
  Users, 
  DollarSign,
  TrendingUp,
  Clock,
  CheckCircle,
  FileText,
  ArrowRight
} from "lucide-react"

// Mock data - in production, fetch from API
const umkmData = {
  name: "TechStartup Inc",
  stats: {
    activeProjects: 8,
    totalApplicants: 124,
    budgetSpent: 45000000,
    hiredFreelancers: 15,
  },
  projectStatus: [
    { name: "Completed", value: 12 },
    { name: "In Progress", value: 8 },
    { name: "Reviewing", value: 5 },
    { name: "Cancelled", value: 2 },
  ],
  applicantTrend: [
    { month: "Jan", applicants: 45, hired: 8 },
    { month: "Feb", applicants: 52, hired: 10 },
    { month: "Mar", applicants: 61, hired: 12 },
    { month: "Apr", applicants: 78, hired: 15 },
    { month: "May", applicants: 85, hired: 18 },
    { month: "Jun", applicants: 124, hired: 22 },
  ],
  activeProjects: [
    { 
      id: 1, 
      title: "Website Redesign", 
      freelancer: "John Doe",
      status: "In Progress",
      progress: 65,
      deadline: "2 days"
    },
    { 
      id: 2, 
      title: "Mobile App Development", 
      freelancer: "Jane Smith",
      status: "In Progress",
      progress: 40,
      deadline: "1 week"
    },
  ],
  recentApplicants: [
    {
      id: 1,
      name: "Alex Johnson",
      job: "UI/UX Designer",
      skills: ["Figma", "UI/UX", "Prototyping"],
      matchScore: 92
    },
    {
      id: 2,
      name: "Sarah Williams",
      job: "Full Stack Developer",
      skills: ["React", "Node.js", "MongoDB"],
      matchScore: 88
    },
  ]
}

export default function UMKMDashboard() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-text-heading">
            Welcome, {umkmData.name}! 🚀
          </h1>
          <p className="text-text-muted mt-1">Manage your projects and team</p>
        </div>
        <Button>
          <PlusCircle className="w-4 h-4 mr-2" />
          Post New Job
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-muted mb-1">Active Projects</p>
              <p className="text-2xl font-bold text-text-heading">
                {umkmData.stats.activeProjects}
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Briefcase className="w-6 h-6 text-primary" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-xs text-success">
            <TrendingUp className="w-3 h-3 mr-1" />
            +15% from last month
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-muted mb-1">Total Applicants</p>
              <p className="text-2xl font-bold text-text-heading">
                {umkmData.stats.totalApplicants}
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
              <Users className="w-6 h-6 text-accent" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-xs text-success">
            <TrendingUp className="w-3 h-3 mr-1" />
            +28% from last month
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-muted mb-1">Budget Spent</p>
              <p className="text-2xl font-bold text-text-heading">
                Rp {(umkmData.stats.budgetSpent / 1000000).toFixed(1)}M
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-warning/10 flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-warning" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-xs text-text-muted">
            65% of total budget
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-muted mb-1">Hired Freelancers</p>
              <p className="text-2xl font-bold text-text-heading">
                {umkmData.stats.hiredFreelancers}
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-success" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-xs text-success">
            <TrendingUp className="w-3 h-3 mr-1" />
            +3 this month
          </div>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-text-heading mb-4 flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-primary" />
            Project Status Overview
          </h2>
          <ProjectStatusChart data={umkmData.projectStatus} />
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold text-text-heading mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-accent" />
            Applicant Trends
          </h2>
          <ApplicantTrendChart data={umkmData.applicantTrend} />
        </Card>
      </div>

      {/* Active Projects & Recent Applicants */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-text-heading">Active Projects</h2>
            <Button variant="ghost" size="sm">
              View All
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
          
          <div className="space-y-4">
            {umkmData.activeProjects.map((project) => (
              <div key={project.id} className="p-4 rounded-lg border border-border">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-text-heading text-sm">{project.title}</h3>
                    <p className="text-xs text-text-muted mt-1">
                      <Users className="w-3 h-3 inline mr-1" />
                      {project.freelancer}
                    </p>
                  </div>
                  <Badge variant="warning" className="text-xs">
                    <Clock className="w-3 h-3 mr-1" />
                    {project.deadline}
                  </Badge>
                </div>
                
                <div className="mb-2">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-text-muted">Progress</span>
                    <span className="font-semibold text-text-heading">{project.progress}%</span>
                  </div>
                  <div className="w-full h-2 bg-surface-alt rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary rounded-full transition-all"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </div>

                <Button variant="outline" size="sm" className="w-full mt-2">
                  <FileText className="w-3 h-3 mr-1" />
                  View Details
                </Button>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-text-heading">Recent Applicants</h2>
            <Button variant="ghost" size="sm">
              View All
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
          
          <div className="space-y-4">
            {umkmData.recentApplicants.map((applicant) => (
              <div key={applicant.id} className="p-4 rounded-lg border border-border hover:border-primary/50 transition-all">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-semibold text-text-heading text-sm">{applicant.name}</h3>
                    <p className="text-xs text-text-muted mt-0.5">{applicant.job}</p>
                  </div>
                  <Badge variant="success" className="text-xs">
                    {applicant.matchScore}% Match
                  </Badge>
                </div>
                
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {applicant.skills.map((skill) => (
                    <Badge key={skill} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>

                <div className="flex gap-2">
                  <Button variant="default" size="sm" className="flex-1">
                    Accept
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    Review
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}


