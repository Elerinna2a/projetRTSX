/*
  Warnings:

  - You are about to drop the column `TierCollecteId` on the `collecte` table. All the data in the column will be lost.
  - You are about to drop the column `nomTcId` on the `facture` table. All the data in the column will be lost.
  - You are about to drop the column `nomTcomId` on the `facture` table. All the data in the column will be lost.
  - You are about to drop the column `numExpId` on the `facture` table. All the data in the column will be lost.
  - You are about to drop the column `tourneeId` on the `tiercollecte` table. All the data in the column will be lost.
  - You are about to drop the column `expeditionID` on the `traitement` table. All the data in the column will be lost.
  - You are about to drop the column `operateurId` on the `traitement` table. All the data in the column will be lost.
  - Added the required column `nomTierCollecte` to the `Collecte` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tourneeId` to the `Employe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `traitementId` to the `Employe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `traitementId` to the `Expedition` table without a default value. This is not possible if the table is not empty.
  - Added the required column `collecteId` to the `TierCollecte` table without a default value. This is not possible if the table is not empty.
  - Added the required column `factureId` to the `TierCollecte` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `collecte` DROP FOREIGN KEY `Collecte_TierCollecteId_fkey`;

-- DropForeignKey
ALTER TABLE `collecte` DROP FOREIGN KEY `Collecte_employeId_fkey`;

-- DropForeignKey
ALTER TABLE `facture` DROP FOREIGN KEY `Facture_nomTcId_fkey`;

-- DropForeignKey
ALTER TABLE `facture` DROP FOREIGN KEY `Facture_nomTcomId_fkey`;

-- DropForeignKey
ALTER TABLE `facture` DROP FOREIGN KEY `Facture_numExpId_fkey`;

-- DropForeignKey
ALTER TABLE `tiercollecte` DROP FOREIGN KEY `TierCollecte_tourneeId_fkey`;

-- DropForeignKey
ALTER TABLE `tournee` DROP FOREIGN KEY `Tournee_chauffeurId_fkey`;

-- DropForeignKey
ALTER TABLE `traitement` DROP FOREIGN KEY `Traitement_expeditionID_fkey`;

-- DropForeignKey
ALTER TABLE `traitement` DROP FOREIGN KEY `Traitement_operateurId_fkey`;

-- AlterTable
ALTER TABLE `collecte` DROP COLUMN `TierCollecteId`,
    ADD COLUMN `nomTierCollecte` VARCHAR(191) NOT NULL,
    MODIFY `employeId` INTEGER NULL;

-- AlterTable
ALTER TABLE `employe` ADD COLUMN `tourneeId` INTEGER NOT NULL,
    ADD COLUMN `traitementId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `expedition` ADD COLUMN `factureId` INTEGER NULL,
    ADD COLUMN `traitementId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `facture` DROP COLUMN `nomTcId`,
    DROP COLUMN `nomTcomId`,
    DROP COLUMN `numExpId`;

-- AlterTable
ALTER TABLE `tiercollecte` DROP COLUMN `tourneeId`,
    ADD COLUMN `collecteId` INTEGER NOT NULL,
    ADD COLUMN `factureId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `traitement` DROP COLUMN `expeditionID`,
    DROP COLUMN `operateurId`;

-- CreateTable
CREATE TABLE `_TierCollecteToTournee` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_TierCollecteToTournee_AB_unique`(`A`, `B`),
    INDEX `_TierCollecteToTournee_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_FactureToTiersCompacte` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_FactureToTiersCompacte_AB_unique`(`A`, `B`),
    INDEX `_FactureToTiersCompacte_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Employe` ADD CONSTRAINT `Employe_tourneeId_fkey` FOREIGN KEY (`tourneeId`) REFERENCES `Tournee`(`idTournee`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Employe` ADD CONSTRAINT `Employe_traitementId_fkey` FOREIGN KEY (`traitementId`) REFERENCES `Traitement`(`idTraitement`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TierCollecte` ADD CONSTRAINT `TierCollecte_collecteId_fkey` FOREIGN KEY (`collecteId`) REFERENCES `Collecte`(`idNumLot`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TierCollecte` ADD CONSTRAINT `TierCollecte_factureId_fkey` FOREIGN KEY (`factureId`) REFERENCES `Facture`(`idFacture`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Collecte` ADD CONSTRAINT `Collecte_employeId_fkey` FOREIGN KEY (`employeId`) REFERENCES `Employe`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Expedition` ADD CONSTRAINT `Expedition_traitementId_fkey` FOREIGN KEY (`traitementId`) REFERENCES `Traitement`(`idTraitement`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Expedition` ADD CONSTRAINT `Expedition_factureId_fkey` FOREIGN KEY (`factureId`) REFERENCES `Facture`(`idFacture`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_TierCollecteToTournee` ADD CONSTRAINT `_TierCollecteToTournee_A_fkey` FOREIGN KEY (`A`) REFERENCES `TierCollecte`(`idTierCollecte`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_TierCollecteToTournee` ADD CONSTRAINT `_TierCollecteToTournee_B_fkey` FOREIGN KEY (`B`) REFERENCES `Tournee`(`idTournee`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_FactureToTiersCompacte` ADD CONSTRAINT `_FactureToTiersCompacte_A_fkey` FOREIGN KEY (`A`) REFERENCES `Facture`(`idFacture`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_FactureToTiersCompacte` ADD CONSTRAINT `_FactureToTiersCompacte_B_fkey` FOREIGN KEY (`B`) REFERENCES `TiersCompacte`(`idTiersCompacte`) ON DELETE CASCADE ON UPDATE CASCADE;
