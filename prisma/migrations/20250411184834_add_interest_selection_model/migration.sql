-- CreateEnum
CREATE TYPE "INTEREST_STATUS" AS ENUM ('ACTIVE', 'INACTIVE', 'PENDING', 'APPROVED');

-- CreateTable
CREATE TABLE "ProfessorInterest" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "discipline_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "INTEREST_STATUS" NOT NULL DEFAULT 'PENDING',

    CONSTRAINT "ProfessorInterest_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProfessorInterest_id_key" ON "ProfessorInterest"("id");

-- AddForeignKey
ALTER TABLE "ProfessorInterest" ADD CONSTRAINT "ProfessorInterest_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProfessorInterest" ADD CONSTRAINT "ProfessorInterest_discipline_id_fkey" FOREIGN KEY ("discipline_id") REFERENCES "Discipline"("id") ON DELETE CASCADE ON UPDATE CASCADE;
