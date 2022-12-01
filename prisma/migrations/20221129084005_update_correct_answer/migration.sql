/*
  Warnings:

  - You are about to drop the column `correctAnswer` on the `Question` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Answer` ADD COLUMN `correctAnswer` BOOLEAN NULL;

-- AlterTable
ALTER TABLE `Question` DROP COLUMN `correctAnswer`;

-- CreateTable
CREATE TABLE `Result` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userName` VARCHAR(191) NOT NULL,
    `quizName` VARCHAR(191) NOT NULL,
    `Score` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
