/*
  Warnings:

  - You are about to drop the column `musicStack` on the `Room` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Room" DROP COLUMN "musicStack",
ADD COLUMN     "musicQueue" TEXT[];
