/*
  Warnings:

  - A unique constraint covering the columns `[classGrade_id,discipline_id]` on the table `ClassGradeDiscipline` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ClassGradeDiscipline_classGrade_id_discipline_id_key" ON "ClassGradeDiscipline"("classGrade_id", "discipline_id");
