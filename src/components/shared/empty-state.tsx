import * as React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FolderSearch } from "lucide-react";

export interface EmptyStateProps {
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
  onActionClick?: () => void;
  icon?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  actionLabel,
  actionHref,
  onActionClick,
  icon,
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 md:p-12 text-center rounded-lg border border-dashed border-border-default bg-bg-surface/60">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-bg-subtle text-text-muted mb-4">
        {icon || <FolderSearch className="h-6 w-6 text-navy-950" />}
      </div>
      <h3 className="text-base font-bold text-navy-950 mb-1">{title}</h3>
      <p className="text-xs text-text-secondary max-w-sm mb-5 leading-relaxed">
        {description}
      </p>

      {actionLabel && (
        <>
          {actionHref ? (
            <Link href={actionHref}>
              <Button size="sm" variant="outline">
                {actionLabel}
              </Button>
            </Link>
          ) : (
            <Button size="sm" variant="outline" onClick={onActionClick}>
              {actionLabel}
            </Button>
          )}
        </>
      )}
    </div>
  );
};
