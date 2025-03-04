/*
  Warnings:

  - You are about to drop the column `menu` on the `Discipline` table. All the data in the column will be lost.
  - Added the required column `code` to the `Discipline` table without a default value. This is not possible if the table is not empty.
  - Added the required column `extensionHours` to the `Discipline` table without a default value. This is not possible if the table is not empty.
  - Added the required column `practicalHours` to the `Discipline` table without a default value. This is not possible if the table is not empty.
  - Added the required column `theoreticalHours` to the `Discipline` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Discipline" DROP COLUMN "menu",
ADD COLUMN     "code" TEXT NOT NULL,
ADD COLUMN     "extensionHours" INTEGER NOT NULL,
ADD COLUMN     "practicalHours" INTEGER NOT NULL,
ADD COLUMN     "theoreticalHours" INTEGER NOT NULL;
