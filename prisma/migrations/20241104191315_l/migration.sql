-- AlterTable
ALTER TABLE "PartnerInfo" ADD COLUMN     "isAvailaible" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "Prestation" ADD COLUMN     "hasBeenDone" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isAvailable" BOOLEAN NOT NULL DEFAULT true;
