-- CreateEnum
CREATE TYPE "DAYOFF_STATUS" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "WEEKDAY" AS ENUM ('MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY');

-- CreateTable
CREATE TABLE "Dayoff" (
    "id" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "schedule" TEXT NOT NULL,
    "frequency" TEXT NOT NULL,
    "weekday" "WEEKDAY" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "status" "DAYOFF_STATUS" NOT NULL DEFAULT 'PENDING',
    "user_id" TEXT NOT NULL,

    CONSTRAINT "Dayoff_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Dayoff_id_key" ON "Dayoff"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Dayoff_user_id_key" ON "Dayoff"("user_id");

-- AddForeignKey
ALTER TABLE "Dayoff" ADD CONSTRAINT "Dayoff_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
