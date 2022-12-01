/*
  Warnings:

  - You are about to drop the column `quizName` on the `Result` table. All the data in the column will be lost.
  - Added the required column `quizId` to the `Result` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Result` DROP COLUMN `quizName`,
    ADD COLUMN `quizId` INTEGER NOT NULL;
