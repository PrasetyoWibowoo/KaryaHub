"use client"

import { useState, useCallback } from "react"

export interface ATSScanResult {
    score: number
    matchLevel: string
    summary: string
    matchedKeywords: string[]
    missingKeywords: string[]
    strengths: string[]
    improvements: string[]
}

export function useATS() {
    const [isScanning, setIsScanning] = useState(false)
    const [result, setResult] = useState<ATSScanResult | null>(null)
    const [error, setError] = useState<string | null>(null)

    const scan = useCallback(
        async (file: File, jobDescription?: string, keywords?: string[]) => {
            setIsScanning(true)
            setError(null)
            setResult(null)

            try {
                const formData = new FormData()
                formData.append("resume", file)

                if (jobDescription) {
                    formData.append("jobDescription", jobDescription)
                }

                if (keywords && keywords.length > 0) {
                    formData.append("keywords", JSON.stringify(keywords))
                }

                const res = await fetch("/api/ats/scan", {
                    method: "POST",
                    body: formData,
                })

                const data = await res.json()

                if (!res.ok) {
                    throw new Error(data.message || "ATS scan failed")
                }

                const scanData = data.data
                const mapped: ATSScanResult = {
                    score: scanData.score ?? 0,
                    matchLevel: getMatchLevel(scanData.score ?? 0),
                    summary: scanData.feedback?.summary ?? "",
                    matchedKeywords: scanData.breakdown?.matched ?? [],
                    missingKeywords: scanData.breakdown?.missing ?? [],
                    strengths: scanData.feedback?.strengths ?? [],
                    improvements: scanData.feedback?.improvements ?? [],
                }

                setResult(mapped)
                return mapped
            } catch (err) {
                const message =
                    err instanceof Error ? err.message : "An error occurred during scan"
                setError(message)
                return null
            } finally {
                setIsScanning(false)
            }
        },
        []
    )

    const reset = useCallback(() => {
        setResult(null)
        setError(null)
        setIsScanning(false)
    }, [])

    return {
        isScanning,
        result,
        error,
        scan,
        reset,
    }
}

function getMatchLevel(score: number): string {
    if (score >= 85) return "Tinggi (Strong Match)"
    if (score >= 70) return "Baik (Good Match)"
    if (score >= 50) return "Cukup (Fair Match)"
    return "Rendah (Weak Match)"
}
