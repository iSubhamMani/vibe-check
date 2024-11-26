/*
  Warnings:

  - You are about to drop the column `musicQueue` on the `Room` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Room" DROP COLUMN "musicQueue";

-- CreateTable
CREATE TABLE "Music" (
    "id" SERIAL NOT NULL,
    "musicId" TEXT NOT NULL,
    "votes" INTEGER NOT NULL DEFAULT 0,
    "roomId" TEXT NOT NULL,

    CONSTRAINT "Music_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Music" ADD CONSTRAINT "Music_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("roomCode") ON DELETE RESTRICT ON UPDATE CASCADE;
