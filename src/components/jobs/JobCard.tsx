import { Card } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { Building2, Clock, MapPin } from "lucide-react"
import Link from "next/link"

interface JobCardProps {
  id: string
  title: string
  employerName: string
  budget: number
  category: string
  skills: string[]
  location?: string
  postedAt?: string
  deadline?: string
}

export function JobCard({
  id,
  title,
  employerName,
  budget,
  category,
  skills,
  location = "Remote",
  postedAt = "2 hari lalu",
  deadline
}: JobCardProps) {
  const formatRupiah = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  return (
    <Card className="hover:border-primary/50 hover:shadow-card-hover transition-all duration-200 flex flex-col gap-4 p-6 group">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="outline" className="text-xs">
              {category}
            </Badge>
            {deadline && (
              <Badge variant="warning" className="text-xs">
                <Clock className="w-3 h-3 mr-1" />
                {deadline}
              </Badge>
            )}
          </div>
          <h3 className="text-lg font-bold text-text-heading mb-1.5 line-clamp-2 group-hover:text-primary transition-colors">
            {title}
          </h3>
          <div className="flex items-center gap-2 text-sm text-text-muted">
            <Building2 className="w-4 h-4" />
            <span>{employerName}</span>
            {location && (
              <>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  <span>{location}</span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Skills */}
      <div className="flex flex-wrap gap-1.5">
        {skills.slice(0, 5).map((skill, index) => (
          <Badge key={index} variant="neutral" className="text-xs">
            {skill}
          </Badge>
        ))}
        {skills.length > 5 && (
          <Badge variant="neutral" className="text-xs">
            +{skills.length - 5}
          </Badge>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-border mt-auto">
        <div>
          <p className="text-xs text-text-muted mb-0.5">Budget</p>
          <p className="text-primary font-bold text-lg">
            {formatRupiah(budget)}
          </p>
        </div>
        <Button variant="outline" size="sm" className="group-hover:border-primary group-hover:text-primary" asChild>
          <Link href={`/jobs/${id}`}>
            Lihat Detail
          </Link>
        </Button>
      </div>

      {/* Posted time */}
      <p className="text-xs text-text-subtle -mt-2">
        Diposting {postedAt}
      </p>
    </Card>
  )
}
