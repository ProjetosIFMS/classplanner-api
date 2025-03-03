/*
  Warnings:

  - Added the required column `extensionCourses` to the `PedagogicalProject` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PedagogicalProject" ADD COLUMN     "extensionCourses" INTEGER NOT NULL;
