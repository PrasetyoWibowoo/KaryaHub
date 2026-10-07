import { describe, it, expect, beforeAll } from 'vitest'
import { validateFairRate } from '@/lib/guardrails'
import { prisma } from '@/lib/prisma'
import { Prisma } from '@/generated/prisma'

describe('validateFairRate', () => {
  beforeAll(async () => {
    // Ensure test wage data exists
    await prisma.minimumWage.upsert({
      where: { cityCode: 'jakarta' },
      update: {},
      create: {
        cityCode: 'jakarta',
        cityName: 'Jakarta',
        hourlyRate: new Prisma.Decimal('33120.67'),
        year: 2026,
      },
    })

    await prisma.minimumWage.upsert({
      where: { cityCode: 'default' },
      update: {},
      create: {
        cityCode: 'default',
        cityName: 'Default (Nasional)',
        hourlyRate: new Prisma.Decimal('33120.67'),
        year: 2026,
      },
    })
  })

  it('should pass with valid rate (Rp 500k / 10 jam)', async () => {
    const result = await validateFairRate({
      budget: new Prisma.Decimal('500000'),
      estimatedHours: 10,
      cityCode: 'jakarta',
    })

    expect(result.valid).toBe(true)
    expect(result.hourlyRate?.toString()).toBe('50000')
  })

  it('should fail with invalid rate (Rp 100k / 30 jam)', async () => {
    const result = await validateFairRate({
      budget: new Prisma.Decimal('100000'),
      estimatedHours: 30,
      cityCode: 'default',
    })

    expect(result.valid).toBe(false)
    expect(result.message).toContain('di bawah minimum')
    expect(result.suggestedBudget).toBeDefined()
  })

  it('should fallback to default for unknown city', async () => {
    const result = await validateFairRate({
      budget: new Prisma.Decimal('500000'),
      estimatedHours: 10,
      cityCode: 'unknown_city',
    })

    expect(result.valid).toBe(true)
  })

  it('should handle exact minimum boundary', async () => {
    // Jakarta min: 33120.67/hr
    // Budget: 33120.67 * 10 = 331206.70
    const result = await validateFairRate({
      budget: new Prisma.Decimal('331206.70'),
      estimatedHours: 10,
      cityCode: 'jakarta',
    })

    expect(result.valid).toBe(true)
  })

  it('should maintain decimal precision', async () => {
    // 1 cent below minimum
    const result = await validateFairRate({
      budget: new Prisma.Decimal('331206.69'),
      estimatedHours: 10,
      cityCode: 'jakarta',
    })

    expect(result.valid).toBe(false)
  })
})
