-- DropForeignKey
ALTER TABLE `employe` DROP FOREIGN KEY `Employe_tourneeId_fkey`;

-- DropForeignKey
ALTER TABLE `employe` DROP FOREIGN KEY `Employe_traitementId_fkey`;

-- DropIndex
DROP INDEX `Tournee_chauffeurId_fkey` ON `tournee`;

-- AlterTable
ALTER TABLE `employe` MODIFY `tourneeId` INTEGER NULL,
    MODIFY `traitementId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Employe` ADD CONSTRAINT `Employe_tourneeId_fkey` FOREIGN KEY (`tourneeId`) REFERENCES `Tournee`(`idTournee`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Employe` ADD CONSTRAINT `Employe_traitementId_fkey` FOREIGN KEY (`traitementId`) REFERENCES `Traitement`(`idTraitement`) ON DELETE SET NULL ON UPDATE CASCADE;
