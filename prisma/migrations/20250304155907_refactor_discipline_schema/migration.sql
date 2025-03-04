/*
  Warnings:

  - Added the required column `course_id` to the `Discipline` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Discipline" ADD COLUMN     "course_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Discipline" ADD CONSTRAINT "Discipline_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;
