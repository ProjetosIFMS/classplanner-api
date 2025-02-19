-- CreateEnum
CREATE TYPE "ROLE" AS ENUM ('PROFESSOR', 'COORDINATOR', 'ADMIN');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "picture" TEXT,
    "area_id" TEXT,
    "role" "ROLE" NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sessions" (
    "id" TEXT NOT NULL,
    "refresh_token" TEXT NOT NULL,
    "expires_at" TIMESTAMP(3) NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "sessions_pkey" PRIMARY KEY ("id")
);

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
    "area_id" TEXT NOT NULL,
    "pedagogical_project_id" TEXT NOT NULL,
    "modalityId" TEXT,

    CONSTRAINT "Discipline_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Modality" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Modality_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DisciplineModality" (
    "id" TEXT NOT NULL,
    "discipline_id" TEXT NOT NULL,
    "modality_id" TEXT NOT NULL,
    "period_id" TEXT NOT NULL,

    CONSTRAINT "DisciplineModality_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProfessorClassGrade" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "classGrade_id" TEXT NOT NULL,
    "priority" BOOLEAN NOT NULL,

    CONSTRAINT "ProfessorClassGrade_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Period" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Period_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClassGrade" (
    "id" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "semester" INTEGER NOT NULL,
    "course_id" TEXT NOT NULL,
    "pedagogical_project_id" TEXT NOT NULL,

    CONSTRAINT "ClassGrade_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClassGradeDiscipline" (
    "id" TEXT NOT NULL,
    "classGrade_id" TEXT NOT NULL,
    "discipline_id" TEXT NOT NULL,
    "modality_id" TEXT NOT NULL,
    "period_id" TEXT NOT NULL,

    CONSTRAINT "ClassGradeDiscipline_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Area" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Area_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ClassGradeToModality" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ClassGradeToModality_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_area_id_idx" ON "User"("area_id");

-- CreateIndex
CREATE UNIQUE INDEX "sessions_id_key" ON "sessions"("id");

-- CreateIndex
CREATE INDEX "sessions_user_id_idx" ON "sessions"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Course_id_key" ON "Course"("id");

-- CreateIndex
CREATE UNIQUE INDEX "PedagogicalProject_id_key" ON "PedagogicalProject"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Discipline_id_key" ON "Discipline"("id");

-- CreateIndex
CREATE INDEX "Discipline_area_id_idx" ON "Discipline"("area_id");

-- CreateIndex
CREATE INDEX "Discipline_pedagogical_project_id_idx" ON "Discipline"("pedagogical_project_id");

-- CreateIndex
CREATE UNIQUE INDEX "Modality_id_key" ON "Modality"("id");

-- CreateIndex
CREATE UNIQUE INDEX "DisciplineModality_id_key" ON "DisciplineModality"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ProfessorClassGrade_id_key" ON "ProfessorClassGrade"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Period_id_key" ON "Period"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ClassGrade_id_key" ON "ClassGrade"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ClassGradeDiscipline_id_key" ON "ClassGradeDiscipline"("id");

-- CreateIndex
CREATE INDEX "ClassGradeDiscipline_classGrade_id_idx" ON "ClassGradeDiscipline"("classGrade_id");

-- CreateIndex
CREATE INDEX "ClassGradeDiscipline_discipline_id_idx" ON "ClassGradeDiscipline"("discipline_id");

-- CreateIndex
CREATE UNIQUE INDEX "Area_id_key" ON "Area"("id");

-- CreateIndex
CREATE INDEX "_ClassGradeToModality_B_index" ON "_ClassGradeToModality"("B");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_area_id_fkey" FOREIGN KEY ("area_id") REFERENCES "Area"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PedagogicalProject" ADD CONSTRAINT "PedagogicalProject_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Discipline" ADD CONSTRAINT "Discipline_area_id_fkey" FOREIGN KEY ("area_id") REFERENCES "Area"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Discipline" ADD CONSTRAINT "Discipline_pedagogical_project_id_fkey" FOREIGN KEY ("pedagogical_project_id") REFERENCES "PedagogicalProject"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Discipline" ADD CONSTRAINT "Discipline_modalityId_fkey" FOREIGN KEY ("modalityId") REFERENCES "Modality"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DisciplineModality" ADD CONSTRAINT "DisciplineModality_period_id_fkey" FOREIGN KEY ("period_id") REFERENCES "Period"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DisciplineModality" ADD CONSTRAINT "DisciplineModality_discipline_id_fkey" FOREIGN KEY ("discipline_id") REFERENCES "Discipline"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DisciplineModality" ADD CONSTRAINT "DisciplineModality_modality_id_fkey" FOREIGN KEY ("modality_id") REFERENCES "Modality"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProfessorClassGrade" ADD CONSTRAINT "ProfessorClassGrade_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProfessorClassGrade" ADD CONSTRAINT "ProfessorClassGrade_classGrade_id_fkey" FOREIGN KEY ("classGrade_id") REFERENCES "ClassGrade"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClassGrade" ADD CONSTRAINT "ClassGrade_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClassGrade" ADD CONSTRAINT "ClassGrade_pedagogical_project_id_fkey" FOREIGN KEY ("pedagogical_project_id") REFERENCES "PedagogicalProject"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClassGradeDiscipline" ADD CONSTRAINT "ClassGradeDiscipline_period_id_fkey" FOREIGN KEY ("period_id") REFERENCES "Period"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClassGradeDiscipline" ADD CONSTRAINT "ClassGradeDiscipline_modality_id_fkey" FOREIGN KEY ("modality_id") REFERENCES "Modality"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClassGradeDiscipline" ADD CONSTRAINT "ClassGradeDiscipline_classGrade_id_fkey" FOREIGN KEY ("classGrade_id") REFERENCES "ClassGrade"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClassGradeDiscipline" ADD CONSTRAINT "ClassGradeDiscipline_discipline_id_fkey" FOREIGN KEY ("discipline_id") REFERENCES "Discipline"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClassGradeToModality" ADD CONSTRAINT "_ClassGradeToModality_A_fkey" FOREIGN KEY ("A") REFERENCES "ClassGrade"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClassGradeToModality" ADD CONSTRAINT "_ClassGradeToModality_B_fkey" FOREIGN KEY ("B") REFERENCES "Modality"("id") ON DELETE CASCADE ON UPDATE CASCADE;
