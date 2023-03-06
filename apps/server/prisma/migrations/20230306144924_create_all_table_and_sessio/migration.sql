/*
  Warnings:

  - You are about to drop the column `collecteId` on the `tiercollecte` table. All the data in the column will be lost.
  - Added the required column `tierCollecteId` to the `Collecte` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `tiercollecte` DROP FOREIGN KEY `TierCollecte_collecteId_fkey`;

-- AlterTable
ALTER TABLE `collecte` ADD COLUMN `tierCollecteId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `tiercollecte` DROP COLUMN `collecteId`;

-- AddForeignKey
ALTER TABLE `Collecte` ADD CONSTRAINT `Collecte_tierCollecteId_fkey` FOREIGN KEY (`tierCollecteId`) REFERENCES `TierCollecte`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
