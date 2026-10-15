-- P4 Escrow: simpan order id Midtrans untuk lookup webhook (architecture invariant #7).
ALTER TABLE "escrow_transactions" ADD COLUMN "midtransOrderId" TEXT;

CREATE UNIQUE INDEX "escrow_transactions_midtransOrderId_key" ON "escrow_transactions"("midtransOrderId");
