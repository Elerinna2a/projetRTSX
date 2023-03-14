-- CreateTable
CREATE TABLE `Employe` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nom` VARCHAR(191) NOT NULL,
    `prenom` VARCHAR(191) NOT NULL,
    `adresse` VARCHAR(191) NOT NULL,
    `tel` VARCHAR(191) NOT NULL,
    `role` ENUM('CLIENT', 'ADMIN', 'OPERATEUR', 'CHAUFFEUR') NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `dateCreation` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `traitementId` INTEGER NULL,

    UNIQUE INDEX `Employe_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tournee` (
    `idTournee` INTEGER NOT NULL AUTO_INCREMENT,
    `dateTournee` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `employeId` INTEGER NOT NULL,
    `typeVehicule` ENUM('FOURGON', 'NONARTICULE', 'SEMIREMORQUE') NOT NULL,
    `remorque` ENUM('OUI', 'NON') NOT NULL,

    UNIQUE INDEX `Tournee_employeId_key`(`employeId`),
    PRIMARY KEY (`idTournee`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TierCollecte` (
    `idTierCollecte` INTEGER NOT NULL AUTO_INCREMENT,
    `nom` VARCHAR(191) NOT NULL,
    `adresse` VARCHAR(191) NOT NULL,
    `typeEntreprise` VARCHAR(191) NOT NULL,
    `scoringFacilite` ENUM('UN', 'DEUX', 'TROIS') NOT NULL,
    `nomContact` VARCHAR(191) NOT NULL,
    `tel` VARCHAR(191) NOT NULL,
    `role` ENUM('CLIENT', 'ADMIN', 'OPERATEUR', 'CHAUFFEUR') NOT NULL DEFAULT 'CLIENT',
    `mail` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `dateCreation` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `collecteId` INTEGER NULL,
    `factureId` INTEGER NULL,

    UNIQUE INDEX `TierCollecte_nom_key`(`nom`),
    UNIQUE INDEX `TierCollecte_mail_key`(`mail`),
    PRIMARY KEY (`idTierCollecte`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Collecte` (
    `idNumLot` INTEGER NOT NULL AUTO_INCREMENT,
    `quantite` INTEGER NOT NULL,
    `formeCollecte` ENUM('SAC', 'VRAC', 'PALETTE') NOT NULL,
    `dateCollecte` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `nomTierCollecte` VARCHAR(191) NOT NULL,
    `employeId` INTEGER NULL,
    `traitementId` INTEGER NULL,

    PRIMARY KEY (`idNumLot`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Traitement` (
    `idTraitement` INTEGER NOT NULL AUTO_INCREMENT,
    `dateTraitement` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `qualite` ENUM('PURE', 'POLLUEE', 'NONRECYCLABLE') NOT NULL,
    `quantiteCorpsEtranger` INTEGER NOT NULL,
    `scoringBonusMalus` INTEGER NOT NULL,

    PRIMARY KEY (`idTraitement`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Expedition` (
    `idNumBl` INTEGER NOT NULL AUTO_INCREMENT,
    `dateExpedition` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `destinataire` VARCHAR(191) NOT NULL,
    `nbPalette` INTEGER NOT NULL,
    `poidNetTotal` DOUBLE NOT NULL,
    `traitementId` INTEGER NOT NULL,
    `tiersCompacteId` INTEGER NOT NULL,
    `factureId` INTEGER NULL,

    UNIQUE INDEX `Expedition_tiersCompacteId_key`(`tiersCompacteId`),
    PRIMARY KEY (`idNumBl`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TiersCompacte` (
    `idTiersCompacte` INTEGER NOT NULL AUTO_INCREMENT,
    `nom` VARCHAR(191) NOT NULL,
    `adresse` VARCHAR(191) NOT NULL,
    `typeTiers` VARCHAR(191) NOT NULL,
    `contactNom` VARCHAR(191) NOT NULL,
    `tel` VARCHAR(191) NOT NULL,
    `mail` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`idTiersCompacte`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Facture` (
    `idFacture` INTEGER NOT NULL AUTO_INCREMENT,
    `dateFacture` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `montant` DOUBLE NOT NULL,

    PRIMARY KEY (`idFacture`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Session` (
    `id` VARCHAR(191) NOT NULL,
    `employeId` INTEGER NOT NULL,

    UNIQUE INDEX `Session_employeId_key`(`employeId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

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
ALTER TABLE `Employe` ADD CONSTRAINT `Employe_traitementId_fkey` FOREIGN KEY (`traitementId`) REFERENCES `Traitement`(`idTraitement`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Tournee` ADD CONSTRAINT `Tournee_employeId_fkey` FOREIGN KEY (`employeId`) REFERENCES `Employe`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TierCollecte` ADD CONSTRAINT `TierCollecte_collecteId_fkey` FOREIGN KEY (`collecteId`) REFERENCES `Collecte`(`idNumLot`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TierCollecte` ADD CONSTRAINT `TierCollecte_factureId_fkey` FOREIGN KEY (`factureId`) REFERENCES `Facture`(`idFacture`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Collecte` ADD CONSTRAINT `Collecte_employeId_fkey` FOREIGN KEY (`employeId`) REFERENCES `Employe`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Collecte` ADD CONSTRAINT `Collecte_traitementId_fkey` FOREIGN KEY (`traitementId`) REFERENCES `Traitement`(`idTraitement`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Expedition` ADD CONSTRAINT `Expedition_traitementId_fkey` FOREIGN KEY (`traitementId`) REFERENCES `Traitement`(`idTraitement`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Expedition` ADD CONSTRAINT `Expedition_tiersCompacteId_fkey` FOREIGN KEY (`tiersCompacteId`) REFERENCES `TiersCompacte`(`idTiersCompacte`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Expedition` ADD CONSTRAINT `Expedition_factureId_fkey` FOREIGN KEY (`factureId`) REFERENCES `Facture`(`idFacture`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Session` ADD CONSTRAINT `Session_employeId_fkey` FOREIGN KEY (`employeId`) REFERENCES `Employe`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_TierCollecteToTournee` ADD CONSTRAINT `_TierCollecteToTournee_A_fkey` FOREIGN KEY (`A`) REFERENCES `TierCollecte`(`idTierCollecte`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_TierCollecteToTournee` ADD CONSTRAINT `_TierCollecteToTournee_B_fkey` FOREIGN KEY (`B`) REFERENCES `Tournee`(`idTournee`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_FactureToTiersCompacte` ADD CONSTRAINT `_FactureToTiersCompacte_A_fkey` FOREIGN KEY (`A`) REFERENCES `Facture`(`idFacture`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_FactureToTiersCompacte` ADD CONSTRAINT `_FactureToTiersCompacte_B_fkey` FOREIGN KEY (`B`) REFERENCES `TiersCompacte`(`idTiersCompacte`) ON DELETE CASCADE ON UPDATE CASCADE;
