/*
  Warnings:

  - You are about to alter the column `formeCollecte` on the `collecte` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(5))`.
  - You are about to drop the column `dateCreation` on the `employe` table. All the data in the column will be lost.
  - You are about to alter the column `scoringFacilite` on the `tiercollecte` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(3))`.
  - You are about to alter the column `dateCreation` on the `tiercollecte` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `DateTime(3)`.
  - You are about to alter the column `typeVehicule` on the `tournee` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(1))`.
  - You are about to alter the column `remorque` on the `tournee` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(2))`.
  - You are about to alter the column `qualite` on the `traitement` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(6))`.

*/
-- AlterTable
ALTER TABLE `collecte` MODIFY `formeCollecte` ENUM('SAC', 'VRAC', 'PALETTE') NOT NULL;

-- AlterTable
ALTER TABLE `employe` DROP COLUMN `dateCreation`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `tiercollecte` MODIFY `scoringFacilite` ENUM('UN', 'DEUX', 'TROIS') NOT NULL,
    MODIFY `dateCreation` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `tournee` MODIFY `typeVehicule` ENUM('FOURGON', 'NONARTICULE', 'SEMIREMORQUE') NOT NULL,
    MODIFY `remorque` ENUM('OUI', 'NON') NOT NULL;

-- AlterTable
ALTER TABLE `traitement` MODIFY `qualite` ENUM('PURE', 'POLLUEE', 'NONRECYCLABLE') NOT NULL;
