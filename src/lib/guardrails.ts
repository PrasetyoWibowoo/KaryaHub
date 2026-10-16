export interface ValidateFairRateInput {
    budget: number
    estimatedHours: number
}

export interface ValidateFairRateResult {
    fair: boolean
    hourlyRate: number
    minimumRate: number
    suggestedBudget?: number
    reason?: string
}

// Default minimum hourly rate in IDR (UMR-based approximation)
// Jakarta UMR ~5.067.381/month ÷ 173 jam = ~29.290/jam
const DEFAULT_MINIMUM_HOURLY_RATE = 25000

export async function validateFairRate({
    budget,
    estimatedHours,
}: ValidateFairRateInput): Promise<ValidateFairRateResult> {
    const minimumRate = DEFAULT_MINIMUM_HOURLY_RATE
    const hourlyRate = budget / estimatedHours

    if (hourlyRate < minimumRate) {
        const suggestedBudget = Math.ceil(minimumRate * estimatedHours)
        return {
            fair: false,
            hourlyRate,
            minimumRate,
            suggestedBudget,
            reason: `Tarif per jam Rp ${Math.round(hourlyRate).toLocaleString('id-ID')} di bawah minimum Rp ${minimumRate.toLocaleString('id-ID')}. Budget minimum yang disarankan: Rp ${suggestedBudget.toLocaleString('id-ID')} untuk ${estimatedHours} jam.`,
        }
    }

    return { fair: true, hourlyRate, minimumRate }
}
