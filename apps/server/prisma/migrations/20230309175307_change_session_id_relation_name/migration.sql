/*
  Warnings:

  - You are about to drop the column `userId` on the `session` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[employeId]` on the table `Session` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `employeId` to the `Session` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `session` DROP FOREIGN KEY `Session_userId_fkey`;

-- AlterTable
ALTER TABLE `session` DROP COLUMN `userId`,
    ADD COLUMN `employeId` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Session_employeId_key` ON `Session`(`employeId`);

-- AddForeignKey
ALTER TABLE `Session` ADD CONSTRAINT `Session_employeId_fkey` FOREIGN KEY (`employeId`) REFERENCES `Employe`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
