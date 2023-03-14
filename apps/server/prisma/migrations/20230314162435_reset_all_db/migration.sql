/*
  Warnings:

  - You are about to drop the column `traitementId` on the `employe` table. All the data in the column will be lost.
  - You are about to drop the column `factureId` on the `expedition` table. All the data in the column will be lost.
  - You are about to drop the column `traitementId` on the `expedition` table. All the data in the column will be lost.
  - You are about to drop the column `collecteId` on the `tiercollecte` table. All the data in the column will be lost.
  - You are about to drop the column `factureId` on the `tiercollecte` table. All the data in the column will be lost.
  - You are about to drop the `_facturetotierscompacte` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_tiercollectetotournee` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `datePaiementFacture` to the `Facture` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `_facturetotierscompacte` DROP FOREIGN KEY `_FactureToTiersCompacte_A_fkey`;

-- DropForeignKey
ALTER TABLE `_facturetotierscompacte` DROP FOREIGN KEY `_FactureToTiersCompacte_B_fkey`;

-- DropForeignKey
ALTER TABLE `_tiercollectetotournee` DROP FOREIGN KEY `_TierCollecteToTournee_A_fkey`;

-- DropForeignKey
ALTER TABLE `_tiercollectetotournee` DROP FOREIGN KEY `_TierCollecteToTournee_B_fkey`;

-- DropForeignKey
ALTER TABLE `employe` DROP FOREIGN KEY `Employe_traitementId_fkey`;

-- DropForeignKey
ALTER TABLE `expedition` DROP FOREIGN KEY `Expedition_factureId_fkey`;

-- DropForeignKey
ALTER TABLE `expedition` DROP FOREIGN KEY `Expedition_traitementId_fkey`;

-- DropForeignKey
ALTER TABLE `tiercollecte` DROP FOREIGN KEY `TierCollecte_collecteId_fkey`;

-- DropForeignKey
ALTER TABLE `tiercollecte` DROP FOREIGN KEY `TierCollecte_factureId_fkey`;

-- DropForeignKey
ALTER TABLE `tournee` DROP FOREIGN KEY `Tournee_chauffeurId_fkey`;

-- DropIndex
DROP INDEX `TierCollecte_nom_key` ON `tiercollecte`;

-- AlterTable
ALTER TABLE `collecte` ADD COLUMN `tiercollecteId` INTEGER NULL;

-- AlterTable
ALTER TABLE `employe` DROP COLUMN `traitementId`;

-- AlterTable
ALTER TABLE `expedition` DROP COLUMN `factureId`,
    DROP COLUMN `traitementId`;

-- AlterTable
ALTER TABLE `facture` ADD COLUMN `datePaiementFacture` VARCHAR(191) NOT NULL,
    ADD COLUMN `tierCompacteId` INTEGER NULL,
    ADD COLUMN `tiersCollecteId` INTEGER NULL;

-- AlterTable
ALTER TABLE `tiercollecte` DROP COLUMN `collecteId`,
    DROP COLUMN `factureId`;

-- AlterTable
ALTER TABLE `tournee` ADD COLUMN `tierCollecteId` INTEGER NULL,
    MODIFY `chauffeurId` INTEGER NULL;

-- AlterTable
ALTER TABLE `traitement` ADD COLUMN `expeditionId` INTEGER NULL,
    ADD COLUMN `operateurId` INTEGER NULL;

-- DropTable
DROP TABLE `_facturetotierscompacte`;

-- DropTable
DROP TABLE `_tiercollectetotournee`;

-- AddForeignKey
ALTER TABLE `Tournee` ADD CONSTRAINT `Tournee_chauffeurId_fkey` FOREIGN KEY (`chauffeurId`) REFERENCES `Employe`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Tournee` ADD CONSTRAINT `Tournee_tierCollecteId_fkey` FOREIGN KEY (`tierCollecteId`) REFERENCES `TierCollecte`(`idTierCollecte`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Collecte` ADD CONSTRAINT `Collecte_tiercollecteId_fkey` FOREIGN KEY (`tiercollecteId`) REFERENCES `TierCollecte`(`idTierCollecte`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Traitement` ADD CONSTRAINT `Traitement_operateurId_fkey` FOREIGN KEY (`operateurId`) REFERENCES `Employe`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Traitement` ADD CONSTRAINT `Traitement_expeditionId_fkey` FOREIGN KEY (`expeditionId`) REFERENCES `Expedition`(`idNumBl`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Facture` ADD CONSTRAINT `Facture_tiersCollecteId_fkey` FOREIGN KEY (`tiersCollecteId`) REFERENCES `TierCollecte`(`idTierCollecte`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Facture` ADD CONSTRAINT `Facture_tierCompacteId_fkey` FOREIGN KEY (`tierCompacteId`) REFERENCES `TiersCompacte`(`idTiersCompacte`) ON DELETE SET NULL ON UPDATE CASCADE;
