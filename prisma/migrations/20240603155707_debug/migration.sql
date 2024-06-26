/*
  Warnings:

  - Changed the type of `role` on the `users` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "userRole" AS ENUM ('Admin', 'Donor', 'Requester');

-- AlterTable
ALTER TABLE "users" DROP COLUMN "role",
ADD COLUMN     "role" "userRole" NOT NULL;

-- DropEnum
DROP TYPE "useRole";
