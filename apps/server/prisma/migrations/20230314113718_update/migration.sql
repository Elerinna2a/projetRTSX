/*
  Warnings:

  - You are about to drop the column `employeId` on the `tournee` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[chauffeurId]` on the table `Tournee` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `chauffeurId` to the `Tournee` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `tournee` DROP FOREIGN KEY `Tournee_employeId_fkey`;

-- AlterTable
ALTER TABLE `collecte` MODIFY `dateCollecte` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `expedition` MODIFY `dateExpedition` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `facture` MODIFY `dateFacture` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `tiercollecte` MODIFY `dateCreation` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `tournee` DROP COLUMN `employeId`,
    ADD COLUMN `chauffeurId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `traitement` MODIFY `dateTraitement` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Tournee_chauffeurId_key` ON `Tournee`(`chauffeurId`);

-- AddForeignKey
ALTER TABLE `Tournee` ADD CONSTRAINT `Tournee_chauffeurId_fkey` FOREIGN KEY (`chauffeurId`) REFERENCES `Employe`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
