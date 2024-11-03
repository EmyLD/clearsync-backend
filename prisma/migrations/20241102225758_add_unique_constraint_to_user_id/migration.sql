/*
  Warnings:

  - You are about to drop the `CalendarLink` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `HostInfo` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "AirbnbInfo" DROP CONSTRAINT "AirbnbInfo_hostInfoId_fkey";

-- DropForeignKey
ALTER TABLE "CalendarLink" DROP CONSTRAINT "CalendarLink_hostInfoId_fkey";

-- DropForeignKey
ALTER TABLE "HostInfo" DROP CONSTRAINT "HostInfo_userId_fkey";

-- DropForeignKey
ALTER TABLE "PartnerInfo" DROP CONSTRAINT "PartnerInfo_userId_fkey";

-- DropForeignKey
ALTER TABLE "Prestation" DROP CONSTRAINT "Prestation_hostId_fkey";

-- AlterTable
ALTER TABLE "AirbnbInfo" ADD COLUMN     "calendarlink" TEXT[],
ADD COLUMN     "userId" INTEGER;

-- DropTable
DROP TABLE "CalendarLink";

-- DropTable
DROP TABLE "HostInfo";

-- AddForeignKey
ALTER TABLE "PartnerInfo" ADD CONSTRAINT "PartnerInfo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AirbnbInfo" ADD CONSTRAINT "AirbnbInfo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
