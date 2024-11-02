/*
  Warnings:

  - A unique constraint covering the columns `[link]` on the table `AirbnbLink` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[link]` on the table `CalendarLink` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[siret]` on the table `PartnerInfo` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[iban]` on the table `PartnerInfo` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[phone]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "AirbnbLink_link_key" ON "AirbnbLink"("link");

-- CreateIndex
CREATE UNIQUE INDEX "CalendarLink_link_key" ON "CalendarLink"("link");

-- CreateIndex
CREATE UNIQUE INDEX "PartnerInfo_siret_key" ON "PartnerInfo"("siret");

-- CreateIndex
CREATE UNIQUE INDEX "PartnerInfo_iban_key" ON "PartnerInfo"("iban");

-- CreateIndex
CREATE UNIQUE INDEX "User_phone_key" ON "User"("phone");
