-- DropForeignKey
ALTER TABLE `expedition` DROP FOREIGN KEY `Expedition_tiersCompacteId_fkey`;

-- AlterTable
ALTER TABLE `expedition` MODIFY `tiersCompacteId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Expedition` ADD CONSTRAINT `Expedition_tiersCompacteId_fkey` FOREIGN KEY (`tiersCompacteId`) REFERENCES `TiersCompacte`(`idTiersCompacte`) ON DELETE SET NULL ON UPDATE CASCADE;
