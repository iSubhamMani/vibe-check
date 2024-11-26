/*
  Warnings:

  - You are about to drop the column `roomId` on the `Music` table. All the data in the column will be lost.
  - Added the required column `roomCode` to the `Music` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Music" DROP CONSTRAINT "Music_roomId_fkey";

-- AlterTable
ALTER TABLE "Music" DROP COLUMN "roomId",
ADD COLUMN     "roomCode" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Music" ADD CONSTRAINT "Music_roomCode_fkey" FOREIGN KEY ("roomCode") REFERENCES "Room"("roomCode") ON DELETE RESTRICT ON UPDATE CASCADE;
