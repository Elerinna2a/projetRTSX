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

    UNIQUE INDEX `Employe_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tournee` (
    `idTournee` INTEGER NOT NULL AUTO_INCREMENT,
    `dateTournee` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `chauffeurId` INTEGER NOT NULL,
    `typeVehicule` ENUM('FOURGON', 'NONARTICULE', 'SEMIREMORQUE') NOT NULL,
    `remorque` VARCHAR(191) NOT NULL DEFAULT 'oui | non',

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
    `mail` VARCHAR(191) NOT NULL,
    `role` ENUM('CLIENT', 'ADMIN', 'OPERATEUR', 'CHAUFFEUR') NOT NULL DEFAULT 'CLIENT',
    `password` VARCHAR(191) NOT NULL,
    `dateCreation` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `tourneeId` INTEGER NOT NULL,

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
    `numFacture` INTEGER NOT NULL,
    `TierCollecteId` INTEGER NOT NULL,
    `employeId` INTEGER NOT NULL,
    `expeditionId` INTEGER NOT NULL,
    `traitementId` INTEGER NOT NULL,

    PRIMARY KEY (`idNumLot`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Traitement` (
    `idTraitement` INTEGER NOT NULL AUTO_INCREMENT,
    `dateTraitement` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `qualite` ENUM('PURE', 'POLLUEE', 'NONRECYCLABLE') NOT NULL,
    `quantiteCorpsEtranger` INTEGER NOT NULL,
    `scoringBonusMalus` INTEGER NOT NULL,
    `operateurId` INTEGER NOT NULL,

    PRIMARY KEY (`idTraitement`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Expedition` (
    `idNumBl` INTEGER NOT NULL AUTO_INCREMENT,
    `dateExpedition` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `destinataire` VARCHAR(191) NOT NULL,
    `nbPalette` INTEGER NOT NULL,
    `poidNetTotal` DOUBLE NOT NULL,
    `tiersCompacteId` INTEGER NOT NULL,

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
    `nomTcId` INTEGER NOT NULL,
    `nomTcomId` INTEGER NOT NULL,
    `numExpId` INTEGER NOT NULL,

    UNIQUE INDEX `Facture_numExpId_key`(`numExpId`),
    PRIMARY KEY (`idFacture`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Session` (
    `id` VARCHAR(191) NOT NULL,
    `userId` INTEGER NOT NULL,

    UNIQUE INDEX `Session_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Tournee` ADD CONSTRAINT `Tournee_chauffeurId_fkey` FOREIGN KEY (`chauffeurId`) REFERENCES `Employe`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TierCollecte` ADD CONSTRAINT `TierCollecte_tourneeId_fkey` FOREIGN KEY (`tourneeId`) REFERENCES `Tournee`(`idTournee`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Collecte` ADD CONSTRAINT `Collecte_employeId_fkey` FOREIGN KEY (`employeId`) REFERENCES `Employe`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Collecte` ADD CONSTRAINT `Collecte_TierCollecteId_fkey` FOREIGN KEY (`TierCollecteId`) REFERENCES `TierCollecte`(`idTierCollecte`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Collecte` ADD CONSTRAINT `Collecte_expeditionId_fkey` FOREIGN KEY (`expeditionId`) REFERENCES `Expedition`(`idNumBl`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Collecte` ADD CONSTRAINT `Collecte_traitementId_fkey` FOREIGN KEY (`traitementId`) REFERENCES `Traitement`(`idTraitement`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Traitement` ADD CONSTRAINT `Traitement_operateurId_fkey` FOREIGN KEY (`operateurId`) REFERENCES `Employe`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Expedition` ADD CONSTRAINT `Expedition_tiersCompacteId_fkey` FOREIGN KEY (`tiersCompacteId`) REFERENCES `TiersCompacte`(`idTiersCompacte`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Facture` ADD CONSTRAINT `Facture_nomTcId_fkey` FOREIGN KEY (`nomTcId`) REFERENCES `TierCollecte`(`idTierCollecte`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Facture` ADD CONSTRAINT `Facture_nomTcomId_fkey` FOREIGN KEY (`nomTcomId`) REFERENCES `TiersCompacte`(`idTiersCompacte`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Facture` ADD CONSTRAINT `Facture_numExpId_fkey` FOREIGN KEY (`numExpId`) REFERENCES `Expedition`(`idNumBl`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Session` ADD CONSTRAINT `Session_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Employe`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
