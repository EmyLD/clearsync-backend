-- DropForeignKey
ALTER TABLE "Prestation" DROP CONSTRAINT "Prestation_partnerId_fkey";

-- AlterTable
ALTER TABLE "Prestation" ALTER COLUMN "partnerId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Prestation" ADD CONSTRAINT "Prestation_partnerId_fkey" FOREIGN KEY ("partnerId") REFERENCES "PartnerInfo"("id") ON DELETE SET NULL ON UPDATE CASCADE;
