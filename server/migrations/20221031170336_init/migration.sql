/*
  Warnings:

  - You are about to drop the column `fileName` on the `Document` table. All the data in the column will be lost.
  - You are about to drop the column `fileName` on the `DocumentEvent` table. All the data in the column will be lost.
  - Added the required column `name` to the `Document` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `DocumentEvent` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Document" DROP COLUMN "fileName",
ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "DocumentEvent" DROP COLUMN "fileName",
ADD COLUMN     "name" TEXT NOT NULL;
