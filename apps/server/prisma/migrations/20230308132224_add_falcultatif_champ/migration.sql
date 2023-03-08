/*
  Warnings:

  - You are about to drop the column `expeditionId` on the `collecte` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `collecte` DROP FOREIGN KEY `Collecte_expeditionId_fkey`;

-- DropForeignKey
ALTER TABLE `collecte` DROP FOREIGN KEY `Collecte_traitementId_fkey`;

-- DropForeignKey
ALTER TABLE `facture` DROP FOREIGN KEY `Facture_nomTcId_fkey`;

-- DropForeignKey
ALTER TABLE `facture` DROP FOREIGN KEY `Facture_nomTcomId_fkey`;

-- AlterTable
ALTER TABLE `collecte` DROP COLUMN `expeditionId`,
    MODIFY `traitementId` INTEGER NULL;

-- AlterTable
ALTER TABLE `facture` MODIFY `nomTcId` INTEGER NULL,
    MODIFY `nomTcomId` INTEGER NULL;

-- AlterTable
ALTER TABLE `traitement` ADD COLUMN `expeditionID` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Collecte` ADD CONSTRAINT `Collecte_traitementId_fkey` FOREIGN KEY (`traitementId`) REFERENCES `Traitement`(`idTraitement`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Traitement` ADD CONSTRAINT `Traitement_expeditionID_fkey` FOREIGN KEY (`expeditionID`) REFERENCES `Expedition`(`idNumBl`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Facture` ADD CONSTRAINT `Facture_nomTcId_fkey` FOREIGN KEY (`nomTcId`) REFERENCES `TierCollecte`(`idTierCollecte`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Facture` ADD CONSTRAINT `Facture_nomTcomId_fkey` FOREIGN KEY (`nomTcomId`) REFERENCES `TiersCompacte`(`idTiersCompacte`) ON DELETE SET NULL ON UPDATE CASCADE;
