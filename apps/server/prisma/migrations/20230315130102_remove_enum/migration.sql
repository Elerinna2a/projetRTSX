/*
  Warnings:

  - You are about to alter the column `formeCollecte` on the `collecte` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(0))` to `VarChar(191)`.
  - You are about to alter the column `typeVehicule` on the `tournee` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(2))` to `VarChar(191)`.
  - You are about to alter the column `remorque` on the `tournee` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(3))` to `VarChar(191)`.
  - You are about to alter the column `qualite` on the `traitement` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(1))` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `collecte` MODIFY `formeCollecte` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `tournee` MODIFY `typeVehicule` VARCHAR(191) NOT NULL,
    MODIFY `remorque` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `traitement` MODIFY `qualite` VARCHAR(191) NOT NULL;
