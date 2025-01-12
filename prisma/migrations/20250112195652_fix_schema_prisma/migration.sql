/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `sessions` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `pivot_id` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "pivot_id" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Course" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "quantity_semester" INTEGER NOT NULL,
    "workload" INTEGER NOT NULL,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PedagogicalProject" (
    "id" TEXT NOT NULL,
    "course_id" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "status" BOOLEAN NOT NULL,

    CONSTRAINT "PedagogicalProject_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Discipline" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "menu" TEXT NOT NULL,
    "workload" INTEGER NOT NULL,
    "semester" INTEGER NOT NULL,
    "pivot_id" TEXT NOT NULL,
    "pedagogical_project_id" TEXT NOT NULL,

    CONSTRAINT "Discipline_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pivot" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Pivot_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Course_id_key" ON "Course"("id");

-- CreateIndex
CREATE UNIQUE INDEX "PedagogicalProject_id_key" ON "PedagogicalProject"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Discipline_id_key" ON "Discipline"("id");

-- CreateIndex
CREATE INDEX "Discipline_pivot_id_idx" ON "Discipline"("pivot_id");

-- CreateIndex
CREATE INDEX "Discipline_pedagogical_project_id_idx" ON "Discipline"("pedagogical_project_id");

-- CreateIndex
CREATE UNIQUE INDEX "Pivot_id_key" ON "Pivot"("id");

-- CreateIndex
CREATE INDEX "User_pivot_id_idx" ON "User"("pivot_id");

-- CreateIndex
CREATE UNIQUE INDEX "sessions_id_key" ON "sessions"("id");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_pivot_id_fkey" FOREIGN KEY ("pivot_id") REFERENCES "Pivot"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PedagogicalProject" ADD CONSTRAINT "PedagogicalProject_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Discipline" ADD CONSTRAINT "Discipline_pivot_id_fkey" FOREIGN KEY ("pivot_id") REFERENCES "Pivot"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Discipline" ADD CONSTRAINT "Discipline_pedagogical_project_id_fkey" FOREIGN KEY ("pedagogical_project_id") REFERENCES "PedagogicalProject"("id") ON DELETE CASCADE ON UPDATE CASCADE;
