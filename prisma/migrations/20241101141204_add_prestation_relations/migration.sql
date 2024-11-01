-- CreateTable
CREATE TABLE "Prestation" (
    "id" SERIAL NOT NULL,
    "hostId" INTEGER NOT NULL,
    "partnerId" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "surface" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Prestation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Prestation" ADD CONSTRAINT "Prestation_hostId_fkey" FOREIGN KEY ("hostId") REFERENCES "HostInfo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Prestation" ADD CONSTRAINT "Prestation_partnerId_fkey" FOREIGN KEY ("partnerId") REFERENCES "PartnerInfo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
