/*
  Warnings:

  - You are about to drop the column `modality_id` on the `ClassGradeDiscipline` table. All the data in the column will be lost.
  - You are about to drop the column `modality_id` on the `Discipline` table. All the data in the column will be lost.
  - You are about to drop the `_ClassGradeToModality` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ClassGradeDiscipline" DROP CONSTRAINT "ClassGradeDiscipline_modality_id_fkey";

-- DropForeignKey
ALTER TABLE "Discipline" DROP CONSTRAINT "Discipline_modality_id_fkey";

-- DropForeignKey
ALTER TABLE "_ClassGradeToModality" DROP CONSTRAINT "_ClassGradeToModality_A_fkey";

-- DropForeignKey
ALTER TABLE "_ClassGradeToModality" DROP CONSTRAINT "_ClassGradeToModality_B_fkey";

-- AlterTable
ALTER TABLE "ClassGradeDiscipline" DROP COLUMN "modality_id";

-- AlterTable
ALTER TABLE "Discipline" DROP COLUMN "modality_id";

-- DropTable
DROP TABLE "_ClassGradeToModality";

-- CreateTable
CREATE TABLE "_DisciplineToModality" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_DisciplineToModality_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_ClassGradeDisciplineToModality" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ClassGradeDisciplineToModality_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_DisciplineToModality_B_index" ON "_DisciplineToModality"("B");

-- CreateIndex
CREATE INDEX "_ClassGradeDisciplineToModality_B_index" ON "_ClassGradeDisciplineToModality"("B");

-- AddForeignKey
ALTER TABLE "_DisciplineToModality" ADD CONSTRAINT "_DisciplineToModality_A_fkey" FOREIGN KEY ("A") REFERENCES "Discipline"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DisciplineToModality" ADD CONSTRAINT "_DisciplineToModality_B_fkey" FOREIGN KEY ("B") REFERENCES "Modality"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClassGradeDisciplineToModality" ADD CONSTRAINT "_ClassGradeDisciplineToModality_A_fkey" FOREIGN KEY ("A") REFERENCES "ClassGradeDiscipline"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClassGradeDisciplineToModality" ADD CONSTRAINT "_ClassGradeDisciplineToModality_B_fkey" FOREIGN KEY ("B") REFERENCES "Modality"("id") ON DELETE CASCADE ON UPDATE CASCADE;
