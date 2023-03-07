/*
  Warnings:

  - You are about to alter the column `remorque` on the `tournee` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(2))`.

*/
-- AlterTable
ALTER TABLE `tournee` MODIFY `remorque` ENUM('OUI', 'NON') NOT NULL;
