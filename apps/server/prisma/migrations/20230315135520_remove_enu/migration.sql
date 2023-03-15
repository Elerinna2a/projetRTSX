/*
  Warnings:

  - You are about to alter the column `scoringFacilite` on the `tiercollecte` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(0))` to `Int`.
  - You are about to alter the column `dateTournee` on the `tournee` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `DateTime(3)`.

*/
-- AlterTable
ALTER TABLE `tiercollecte` MODIFY `scoringFacilite` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `tournee` MODIFY `dateTournee` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
