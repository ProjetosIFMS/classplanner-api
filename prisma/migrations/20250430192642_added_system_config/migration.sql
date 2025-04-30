-- CreateEnum
CREATE TYPE "DISCIPLINE_SELECTION_MODE" AS ENUM ('INTEREST', 'SELECTION', 'NONE');

-- CreateTable
CREATE TABLE "SystemConfig" (
    "id" TEXT NOT NULL DEFAULT 'singleton',
    "discipline_selection_mode" "DISCIPLINE_SELECTION_MODE" NOT NULL DEFAULT 'NONE',
    "discipline_selection_mode_expires_at" TIMESTAMP(3),
    "updated_at" TIMESTAMP(3) NOT NULL,
    "updated_by" TEXT,

    CONSTRAINT "SystemConfig_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SystemConfig_id_key" ON "SystemConfig"("id");

-- AddForeignKey
ALTER TABLE "SystemConfig" ADD CONSTRAINT "SystemConfig_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
