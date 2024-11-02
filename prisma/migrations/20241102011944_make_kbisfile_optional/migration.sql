/*
  Warnings:

  - You are about to drop the column `calendarLink` on the `HostInfo` table. All the data in the column will be lost.
  - Added the required column `iban` to the `PartnerInfo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "HostInfo" DROP COLUMN "calendarLink",
ADD COLUMN     "iban" TEXT;

-- AlterTable
ALTER TABLE "PartnerInfo" ADD COLUMN     "iban" TEXT NOT NULL,
ALTER COLUMN "kbisFile" DROP NOT NULL;
