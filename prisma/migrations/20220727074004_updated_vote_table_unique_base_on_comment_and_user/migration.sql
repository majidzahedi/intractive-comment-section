/*
  Warnings:

  - A unique constraint covering the columns `[userId,commentId]` on the table `Vote` will be added. If there are existing duplicate values, this will fail.
  - Made the column `commentId` on table `Vote` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "Vote_userId_key";

-- AlterTable
ALTER TABLE "Vote" ALTER COLUMN "commentId" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Vote_userId_commentId_key" ON "Vote"("userId", "commentId");
