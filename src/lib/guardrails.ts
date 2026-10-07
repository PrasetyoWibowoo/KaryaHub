import { prisma } from '@/lib/prisma'
import { Prisma } from '@/generated/prisma'

export interface ValidateFairRateInput {
  budget: Prisma.Decimal
  estimatedHours: number
  cityCode: string | null | undefined
}

export interface ValidateFairRateResult {
  valid: boolean
  hourlyRate?: Prisma.Decimal
  minimumRate?: Prisma.Decimal
  suggestedBudget?: Prisma.Decimal
  message?: string
}

export async function validateFairRate({
  budget,
  estimatedHours,
  cityCode,
}: ValidateFairRateInput): Promise<ValidateFairRateResult> {
  const effectiveCityCode = cityCode?.toLowerCase() || 'default'
  
  let wage = await prisma.minimumWage.findUnique({
    where: { cityCode: effectiveCityCode },
    select: { hourlyRate: true },
  })

  if (!wage) {
    wage = await prisma.minimumWage.findUnique({
      where: { cityCode: 'default' },
      select: { hourlyRate: true },
    })
  }

  if (!wage) {
    throw new Error('Data upah minimum tidak ditemukan')
  }

  const minimumRate = wage.hourlyRate
  const hourlyRate = budget.div(estimatedHours)

  if (hourlyRate.lessThan(minimumRate)) {
    const suggestedBudget = minimumRate.mul(estimatedHours).toDecimalPlaces(2)
    return {
      valid: false,
      hourlyRate,
      minimumRate,
      suggestedBudget,
      message: `Tarif per jam Rp ${hourlyRate.toFixed(2)} di bawah minimum Rp ${minimumRate.toFixed(2)}. Budget minimum yang disarankan: Rp ${suggestedBudget.toFixed(2)} untuk ${estimatedHours} jam.`,
    }
  }

  return { valid: true, hourlyRate, minimumRate }
}
