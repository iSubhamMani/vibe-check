-- DropForeignKey
ALTER TABLE "Music" DROP CONSTRAINT "Music_roomCode_fkey";

-- AlterTable
ALTER TABLE "Room" ADD COLUMN     "musicQueue" TEXT[];
