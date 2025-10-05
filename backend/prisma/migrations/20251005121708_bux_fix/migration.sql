/*
  Warnings:

  - You are about to drop the column `contraints` on the `Problem` table. All the data in the column will be lost.
  - Added the required column `constraints` to the `Problem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Problem" DROP COLUMN "contraints",
ADD COLUMN     "constraints" TEXT NOT NULL;
