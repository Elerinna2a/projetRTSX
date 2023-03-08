-- DropForeignKey
ALTER TABLE `tiercollecte` DROP FOREIGN KEY `TierCollecte_tourneeId_fkey`;

-- AlterTable
ALTER TABLE `tiercollecte` MODIFY `tourneeId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `TierCollecte` ADD CONSTRAINT `TierCollecte_tourneeId_fkey` FOREIGN KEY (`tourneeId`) REFERENCES `Tournee`(`idTournee`) ON DELETE SET NULL ON UPDATE CASCADE;
