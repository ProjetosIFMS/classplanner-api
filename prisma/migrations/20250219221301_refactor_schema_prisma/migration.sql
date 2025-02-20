/*
  Warnings:

  - You are about to drop the column `modalityId` on the `Discipline` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Discipline" DROP CONSTRAINT "Discipline_modalityId_fkey";

-- AlterTable
ALTER TABLE "Discipline" DROP COLUMN "modalityId",
ADD COLUMN     "modality_id" TEXT;

-- AddForeignKey
ALTER TABLE "Discipline" ADD CONSTRAINT "Discipline_modality_id_fkey" FOREIGN KEY ("modality_id") REFERENCES "Modality"("id") ON DELETE SET NULL ON UPDATE CASCADE;
