/*
  Warnings:

  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `passwordHash` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `passwordSalt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `resetToken` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `resetTokenExpiresAt` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[secretKey]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `identifierId` to the `Contract` table without a default value. This is not possible if the table is not empty.
  - Made the column `userId` on table `Contract` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `secretSeed` to the `Identifier` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Contract" DROP CONSTRAINT "Contract_userId_fkey";

-- AlterTable
ALTER TABLE "Contract" ADD COLUMN     "identifierId" TEXT NOT NULL,
ALTER COLUMN "userId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Identifier" ADD COLUMN     "contractId" TEXT,
ADD COLUMN     "secretSeed" TEXT NOT NULL,
ADD COLUMN     "sisaId" TEXT;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "name",
DROP COLUMN "passwordHash",
DROP COLUMN "passwordSalt",
DROP COLUMN "resetToken",
DROP COLUMN "resetTokenExpiresAt",
ADD COLUMN     "secretKey" TEXT,
ALTER COLUMN "email" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Sisa" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,
    "identifierId" TEXT NOT NULL,

    CONSTRAINT "Sisa_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_secretKey_key" ON "User"("secretKey");

-- AddForeignKey
ALTER TABLE "Identifier" ADD CONSTRAINT "Identifier_contractId_fkey" FOREIGN KEY ("contractId") REFERENCES "Contract"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Identifier" ADD CONSTRAINT "Identifier_sisaId_fkey" FOREIGN KEY ("sisaId") REFERENCES "Sisa"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contract" ADD CONSTRAINT "Contract_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sisa" ADD CONSTRAINT "Sisa_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
