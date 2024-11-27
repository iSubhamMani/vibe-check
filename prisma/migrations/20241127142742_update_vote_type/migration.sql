/*
  Warnings:

  - The `votes` column on the `Music` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Music" DROP COLUMN "votes",
ADD COLUMN     "votes" INTEGER[];
