/*
  Warnings:

  - You are about to drop the column `compileOuput` on the `Submission` table. All the data in the column will be lost.
  - Added the required column `compileOutput` to the `Submission` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Submission" DROP COLUMN "compileOuput",
ADD COLUMN     "compileOutput" TEXT NOT NULL,
ALTER COLUMN "stderr" DROP NOT NULL,
ALTER COLUMN "memory" DROP NOT NULL,
ALTER COLUMN "time" DROP NOT NULL;

-- CreateTable
CREATE TABLE "public"."TestCaseResult" (
    "id" TEXT NOT NULL,
    "submissionId" TEXT NOT NULL,
    "testCase" INTEGER NOT NULL,
    "passed" BOOLEAN NOT NULL,
    "stdout" TEXT,
    "expected" TEXT NOT NULL,
    "stderr" TEXT,
    "compileOutput" TEXT,
    "status" TEXT NOT NULL,
    "memory" TEXT,
    "time" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TestCaseResult_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "TestCaseResult_submissionId_idx" ON "public"."TestCaseResult"("submissionId");

-- AddForeignKey
ALTER TABLE "public"."TestCaseResult" ADD CONSTRAINT "TestCaseResult_submissionId_fkey" FOREIGN KEY ("submissionId") REFERENCES "public"."Submission"("id") ON DELETE CASCADE ON UPDATE CASCADE;
