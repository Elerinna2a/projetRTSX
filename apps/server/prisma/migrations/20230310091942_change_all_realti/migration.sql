-- DropForeignKey
ALTER TABLE `tiercollecte` DROP FOREIGN KEY `TierCollecte_collecteId_fkey`;

-- DropForeignKey
ALTER TABLE `tiercollecte` DROP FOREIGN KEY `TierCollecte_factureId_fkey`;

-- AlterTable
ALTER TABLE `tiercollecte` MODIFY `collecteId` INTEGER NULL,
    MODIFY `factureId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `TierCollecte` ADD CONSTRAINT `TierCollecte_collecteId_fkey` FOREIGN KEY (`collecteId`) REFERENCES `Collecte`(`idNumLot`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TierCollecte` ADD CONSTRAINT `TierCollecte_factureId_fkey` FOREIGN KEY (`factureId`) REFERENCES `Facture`(`idFacture`) ON DELETE SET NULL ON UPDATE CASCADE;
