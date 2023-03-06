-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nom` VARCHAR(191) NOT NULL,
    `prenom` VARCHAR(191) NOT NULL,
    `tel` VARCHAR(10) NOT NULL,
    `adress` VARCHAR(191) NOT NULL,
    `role` ENUM('ADMIN', 'OPERATOR', 'DRIVER', 'CLIENT') NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Collecte` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `quantite_kg` DOUBLE NOT NULL,
    `forme_collecte` VARCHAR(191) NOT NULL,
    `date_collecte` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `chauffeur` VARCHAR(191) NOT NULL,
    `forme_vehicule` VARCHAR(191) NOT NULL,
    `operator_name` VARCHAR(191) NOT NULL,
    `quality` VARCHAR(191) NOT NULL,
    `quantity_strange_corps` DOUBLE NOT NULL,
    `num_lot` VARCHAR(191) NOT NULL,
    `score` VARCHAR(191) NOT NULL,
    `facturation` DOUBLE NOT NULL,
    `expeditionId` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Expedition` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `date_expedition` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `destinataire` VARCHAR(191) NOT NULL,
    `num_bl` VARCHAR(191) NOT NULL,
    `num_facture` VARCHAR(191) NOT NULL,
    `nb_palette` VARCHAR(191) NOT NULL,
    `poids_net_total` DOUBLE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TiersCompacte` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nom` VARCHAR(191) NOT NULL,
    `adresse` VARCHAR(191) NOT NULL,
    `type_tiers` VARCHAR(191) NOT NULL,
    `contact_nom` VARCHAR(191) NOT NULL,
    `contact_email` VARCHAR(191) NOT NULL,
    `contact_num` VARCHAR(191) NOT NULL,
    `expeditionId` INTEGER NOT NULL,

    UNIQUE INDEX `TiersCompacte_expeditionId_key`(`expeditionId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TierCollecte` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nom` VARCHAR(191) NOT NULL,
    `adresse` VARCHAR(191) NOT NULL,
    `type_tiers` VARCHAR(191) NOT NULL,
    `score_facilite_acces` ENUM('UN', 'DEUX', 'TROIS') NOT NULL,
    `contact_nom` VARCHAR(191) NOT NULL,
    `contact_email` VARCHAR(191) NOT NULL,
    `contact_num` VARCHAR(10) NOT NULL,
    `role` ENUM('ADMIN', 'OPERATOR', 'DRIVER', 'CLIENT') NOT NULL DEFAULT 'CLIENT',
    `collecteId` INTEGER NOT NULL,

    UNIQUE INDEX `TierCollecte_contact_email_key`(`contact_email`),
    UNIQUE INDEX `TierCollecte_collecteId_key`(`collecteId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Session` (
    `id` VARCHAR(191) NOT NULL,
    `userId` INTEGER NOT NULL,

    UNIQUE INDEX `Session_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Collecte` ADD CONSTRAINT `Collecte_expeditionId_fkey` FOREIGN KEY (`expeditionId`) REFERENCES `Expedition`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Collecte` ADD CONSTRAINT `Collecte_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TiersCompacte` ADD CONSTRAINT `TiersCompacte_expeditionId_fkey` FOREIGN KEY (`expeditionId`) REFERENCES `Expedition`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TierCollecte` ADD CONSTRAINT `TierCollecte_collecteId_fkey` FOREIGN KEY (`collecteId`) REFERENCES `Collecte`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Session` ADD CONSTRAINT `Session_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
