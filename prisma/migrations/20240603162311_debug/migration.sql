/*
  Warnings:

  - You are about to drop the column `contactNumber` on the `requester` table. All the data in the column will be lost.
  - Added the required column `age` to the `donor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastDonationDate` to the `donor` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "requester_contactNumber_key";

-- AlterTable
ALTER TABLE "donor" ADD COLUMN     "age" INTEGER NOT NULL,
ADD COLUMN     "lastDonationDate" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "requester" DROP COLUMN "contactNumber";
