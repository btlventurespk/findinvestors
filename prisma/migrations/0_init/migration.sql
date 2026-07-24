-- CreateTable
CREATE TABLE `Startup` (
    `id` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `logoUrl` VARCHAR(191) NULL,
    `oneLiner` VARCHAR(160) NOT NULL,
    `sector` VARCHAR(191) NOT NULL,
    `city` VARCHAR(191) NOT NULL,
    `foundedYear` INTEGER NOT NULL,
    `entityType` VARCHAR(191) NOT NULL,
    `website` VARCHAR(191) NULL,
    `problem` TEXT NOT NULL,
    `solution` TEXT NOT NULL,
    `businessModel` TEXT NOT NULL,
    `targetMarket` TEXT NOT NULL,
    `competition` TEXT NULL,
    `revenueBand` VARCHAR(191) NOT NULL,
    `monthsRunning` INTEGER NOT NULL,
    `customers` VARCHAR(191) NOT NULL,
    `growthPct` VARCHAR(191) NULL,
    `milestones` TEXT NULL,
    `raiseMin` INTEGER NOT NULL,
    `raiseMax` INTEGER NOT NULL,
    `equityOffered` VARCHAR(191) NULL,
    `useOfFunds` TEXT NOT NULL,
    `priorFunding` BOOLEAN NOT NULL DEFAULT false,
    `founderName` VARCHAR(191) NOT NULL,
    `founderRole` VARCHAR(191) NOT NULL,
    `founderBio` TEXT NOT NULL,
    `founderPhoto` VARCHAR(191) NULL,
    `linkedin` VARCHAR(191) NULL,
    `teamSize` INTEGER NOT NULL,
    `deckUrl` VARCHAR(191) NULL,
    `videoUrl` VARCHAR(191) NULL,
    `gallery` JSON NULL,
    `featured` BOOLEAN NOT NULL DEFAULT false,
    `published` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Startup_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Application` (
    `id` VARCHAR(191) NOT NULL,
    `payload` JSON NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `whatsapp` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'new',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `IntroRequest` (
    `id` VARCHAR(191) NOT NULL,
    `startupId` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `message` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `IntroRequest` ADD CONSTRAINT `IntroRequest_startupId_fkey` FOREIGN KEY (`startupId`) REFERENCES `Startup`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

