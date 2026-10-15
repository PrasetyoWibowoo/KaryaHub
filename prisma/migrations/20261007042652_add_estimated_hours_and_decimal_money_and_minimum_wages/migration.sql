/*
  Warnings:

  - You are about to alter the column `amount` on the `escrow_transactions` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(14,2)`.
  - You are about to alter the column `budget` on the `jobs` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(14,2)`.
  - You are about to alter the column `bidAmount` on the `proposals` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(14,2)`.
  - Added the required column `estimated_hours` to the `jobs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "EscrowStatus" ADD VALUE 'FAILED';
ALTER TYPE "EscrowStatus" ADD VALUE 'EXPIRED';

-- AlterTable
ALTER TABLE "escrow_transactions" ALTER COLUMN "amount" SET DATA TYPE DECIMAL(14,2);

-- AlterTable
ALTER TABLE "jobs" ADD COLUMN     "estimated_hours" INTEGER NOT NULL,
ALTER COLUMN "budget" SET DATA TYPE DECIMAL(14,2);

-- AlterTable
ALTER TABLE "profiles" ADD COLUMN     "cityCode" TEXT;

-- AlterTable
ALTER TABLE "proposals" ALTER COLUMN "bidAmount" SET DATA TYPE DECIMAL(14,2);

-- CreateTable
CREATE TABLE "minimum_wages" (
    "id" TEXT NOT NULL,
    "cityCode" TEXT NOT NULL,
    "cityName" TEXT NOT NULL,
    "hourlyRate" DECIMAL(10,2) NOT NULL,
    "year" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "minimum_wages_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "minimum_wages_cityCode_key" ON "minimum_wages"("cityCode");

-- CreateIndex
CREATE INDEX "minimum_wages_cityCode_idx" ON "minimum_wages"("cityCode");
