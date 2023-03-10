/*
  Warnings:

  - You are about to drop the column `employeId` on the `collecte` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `collecte` DROP FOREIGN KEY `Collecte_employeId_fkey`;

-- AlterTable
ALTER TABLE `collecte` DROP COLUMN `employeId`;
