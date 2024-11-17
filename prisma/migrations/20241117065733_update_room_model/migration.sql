/*
  Warnings:

  - You are about to drop the column `owner` on the `Room` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[owner_id]` on the table `Room` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `owner_id` to the `Room` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Room" DROP CONSTRAINT "Room_owner_fkey";

-- DropIndex
DROP INDEX "Room_owner_key";

-- AlterTable
ALTER TABLE "Room" DROP COLUMN "owner",
ADD COLUMN     "owner_id" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Room_owner_id_key" ON "Room"("owner_id");

-- AddForeignKey
ALTER TABLE "Room" ADD CONSTRAINT "Room_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
