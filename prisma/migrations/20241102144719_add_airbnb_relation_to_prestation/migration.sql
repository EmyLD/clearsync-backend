/*
  Warnings:

  - You are about to drop the column `address` on the `HostInfo` table. All the data in the column will be lost.
  - You are about to drop the column `city` on the `HostInfo` table. All the data in the column will be lost.
  - You are about to drop the column `iban` on the `HostInfo` table. All the data in the column will be lost.
  - You are about to drop the column `postalCode` on the `HostInfo` table. All the data in the column will be lost.
  - You are about to drop the column `city` on the `PartnerInfo` table. All the data in the column will be lost.
  - You are about to drop the column `surface` on the `Prestation` table. All the data in the column will be lost.
  - You are about to drop the `AirbnbLink` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `airbnbId` to the `Prestation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `postalCode` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "AirbnbLink" DROP CONSTRAINT "AirbnbLink_hostInfoId_fkey";

-- AlterTable
ALTER TABLE "HostInfo" DROP COLUMN "address",
DROP COLUMN "city",
DROP COLUMN "iban",
DROP COLUMN "postalCode";

-- AlterTable
ALTER TABLE "PartnerInfo" DROP COLUMN "city";

-- AlterTable
ALTER TABLE "Prestation" DROP COLUMN "surface",
ADD COLUMN     "airbnbId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "postalCode" TEXT NOT NULL;

-- DropTable
DROP TABLE "AirbnbLink";

-- CreateTable
CREATE TABLE "AirbnbInfo" (
    "id" SERIAL NOT NULL,
    "link" TEXT NOT NULL,
    "hostInfoId" INTEGER NOT NULL,
    "adress" TEXT NOT NULL,
    "postalCode" TEXT NOT NULL,
    "surface" INTEGER NOT NULL,
    "nbrOfRoom" INTEGER NOT NULL,
    "city" TEXT NOT NULL,

    CONSTRAINT "AirbnbInfo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AirbnbInfo_link_key" ON "AirbnbInfo"("link");

-- CreateIndex
CREATE INDEX "Prestation_airbnbId_idx" ON "Prestation"("airbnbId");

-- AddForeignKey
ALTER TABLE "AirbnbInfo" ADD CONSTRAINT "AirbnbInfo_hostInfoId_fkey" FOREIGN KEY ("hostInfoId") REFERENCES "HostInfo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Prestation" ADD CONSTRAINT "Prestation_airbnbId_fkey" FOREIGN KEY ("airbnbId") REFERENCES "AirbnbInfo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
