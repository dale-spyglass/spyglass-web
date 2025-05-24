/*
  Warnings:

  - A unique constraint covering the columns `[traceId]` on the table `Trace` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `traceId` to the `Trace` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Trace` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Trace" ADD COLUMN     "spans" JSONB,
ADD COLUMN     "traceId" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "AIMetric" (
    "id" TEXT NOT NULL,
    "requestId" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "provider" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "promptTokens" INTEGER NOT NULL,
    "completionTokens" INTEGER NOT NULL,
    "totalTokens" INTEGER NOT NULL,
    "latencyMs" INTEGER NOT NULL,
    "costUsd" DOUBLE PRECISION NOT NULL,
    "statusCode" INTEGER NOT NULL,
    "traceId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AIMetric_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AIMetric_requestId_key" ON "AIMetric"("requestId");

-- CreateIndex
CREATE INDEX "AIMetric_userId_idx" ON "AIMetric"("userId");

-- CreateIndex
CREATE INDEX "AIMetric_traceId_idx" ON "AIMetric"("traceId");

-- CreateIndex
CREATE UNIQUE INDEX "Trace_traceId_key" ON "Trace"("traceId");

-- CreateIndex
CREATE INDEX "Trace_userId_idx" ON "Trace"("userId");
