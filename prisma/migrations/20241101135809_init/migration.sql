-- CreateEnum
CREATE TYPE "Role" AS ENUM ('PARTNER', 'HOST');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "Role" "Role" NOT NULL,
    "phone" TEXT NOT NULL,
    "idCardFile" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PartnerInfo" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "siret" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "kbisFile" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PartnerInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HostInfo" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "address" TEXT NOT NULL,
    "postalCode" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "calendarLink" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "HostInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AirbnbLink" (
    "id" SERIAL NOT NULL,
    "link" TEXT NOT NULL,
    "hostInfoId" INTEGER NOT NULL,

    CONSTRAINT "AirbnbLink_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CalendarLink" (
    "id" SERIAL NOT NULL,
    "link" TEXT NOT NULL,
    "hostInfoId" INTEGER NOT NULL,

    CONSTRAINT "CalendarLink_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "PartnerInfo" ADD CONSTRAINT "PartnerInfo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HostInfo" ADD CONSTRAINT "HostInfo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AirbnbLink" ADD CONSTRAINT "AirbnbLink_hostInfoId_fkey" FOREIGN KEY ("hostInfoId") REFERENCES "HostInfo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CalendarLink" ADD CONSTRAINT "CalendarLink_hostInfoId_fkey" FOREIGN KEY ("hostInfoId") REFERENCES "HostInfo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
