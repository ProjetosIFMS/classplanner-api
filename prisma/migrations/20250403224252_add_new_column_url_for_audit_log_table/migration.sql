/*
  Warnings:

  - Added the required column `url` to the `AuditLog` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AuditLog" ADD COLUMN     "url" TEXT NOT NULL;
