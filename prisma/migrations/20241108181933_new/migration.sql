/*
  Warnings:

  - You are about to drop the column `membershipId` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "membershipId",
ALTER COLUMN "phone" DROP NOT NULL,
ALTER COLUMN "qrCode" DROP NOT NULL;
