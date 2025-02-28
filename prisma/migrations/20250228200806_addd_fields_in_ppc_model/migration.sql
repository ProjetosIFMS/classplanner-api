/*
  Warnings:

  - Added the required column `complementaryHours` to the `PedagogicalProject` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `PedagogicalProject` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hasTCC` to the `PedagogicalProject` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stageHours` to the `PedagogicalProject` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PedagogicalProject" ADD COLUMN     "complementaryHours" INTEGER NOT NULL,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "hasTCC" BOOLEAN NOT NULL,
ADD COLUMN     "stageHours" INTEGER NOT NULL;
