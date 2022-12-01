/*
  Warnings:

  - You are about to drop the column `Score` on the `Result` table. All the data in the column will be lost.
  - You are about to drop the column `TotalCount` on the `Result` table. All the data in the column will be lost.
  - Added the required column `score` to the `Result` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalCount` to the `Result` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Result` DROP COLUMN `Score`,
    DROP COLUMN `TotalCount`,
    ADD COLUMN `score` INTEGER NOT NULL,
    ADD COLUMN `totalCount` INTEGER NOT NULL;
