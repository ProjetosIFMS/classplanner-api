/*
  Warnings:

  - A unique constraint covering the columns `[user_id,discipline_id]` on the table `ProfessorInterest` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ProfessorInterest_user_id_discipline_id_key" ON "ProfessorInterest"("user_id", "discipline_id");
