"use client";

import * as React from "react";
import { MOCK_ATS_RESULT } from "@/constants/sample-cv-data";
import { CVUploader } from "@/components/ats/cv-uploader";
import { ScoreGauge } from "@/components/ats/score-gauge";
import { FeedbackList } from "@/components/ats/feedback-list";
import { Sparkles } from "lucide-react";

export default function ATSCheckerPage() {
  const [hasScanned, setHasScanned] = React.useState(true);
  const [isScanning, setIsScanning] = React.useState(false);

  const handleFileSelect = () => {
    setIsScanning(true);
    // Simulate smart scanning
    setTimeout(() => {
      setIsScanning(false);
      setHasScanned(true);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-navy-950 tracking-tight">
          Evaluator CV ATS KaryaHub
        </h1>
        <p className="mt-1 text-sm text-text-secondary leading-relaxed">
          Pindai resume kamu menggunakan standar algoritma ATS untuk memastikan CV terbaca optimal sebelum melamar ke perusahaan & UMKM.
        </p>
      </div>

      {/* Uploader Section */}
      <div className="space-y-3">
        <CVUploader onFileSelect={handleFileSelect} isScanning={isScanning} />
      </div>

      {/* Results View */}
      {isScanning ? (
        <div className="h-48 rounded-lg border border-border-default bg-bg-surface p-6 flex flex-col items-center justify-center space-y-3 skeleton-shimmer">
          <Sparkles className="h-8 w-8 text-navy-950 animate-spin" />
          <p className="text-sm font-semibold text-navy-950">
            Menganalisis keterbacaan struktur, kata kunci, dan kompatibilitas ATS...
          </p>
        </div>
      ) : hasScanned ? (
        <div className="space-y-6">
          <ScoreGauge
            score={MOCK_ATS_RESULT.overallScore}
            tier={MOCK_ATS_RESULT.tier}
            breakdown={MOCK_ATS_RESULT.breakdown}
          />

          <FeedbackList
            feedbacks={MOCK_ATS_RESULT.feedbacks}
            missingKeywords={MOCK_ATS_RESULT.missingIndustryKeywords}
          />
        </div>
      ) : null}
    </div>
  );
}
