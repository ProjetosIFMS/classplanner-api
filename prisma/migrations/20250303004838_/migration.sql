/*
  Warnings:

  - Added the required column `workload` to the `PedagogicalProject` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PedagogicalProject" ADD COLUMN     "workload" INTEGER NOT NULL;
