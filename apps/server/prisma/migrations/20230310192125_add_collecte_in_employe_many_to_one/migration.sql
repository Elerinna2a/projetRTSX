-- AlterTable
ALTER TABLE `collecte` ADD COLUMN `employeId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Collecte` ADD CONSTRAINT `Collecte_employeId_fkey` FOREIGN KEY (`employeId`) REFERENCES `Employe`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
