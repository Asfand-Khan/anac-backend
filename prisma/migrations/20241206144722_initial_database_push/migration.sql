-- CreateTable
CREATE TABLE `Company` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Company_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Car` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `companyId` INTEGER NOT NULL,
    `buildYear` INTEGER NOT NULL,
    `tone` VARCHAR(191) NOT NULL,
    `mileageTravelled` DOUBLE NOT NULL,
    `fuelType` VARCHAR(191) NOT NULL,
    `transmission` VARCHAR(191) NOT NULL,
    `price` DECIMAL(65, 30) NOT NULL,
    `complianceYear` INTEGER NOT NULL,
    `seats` INTEGER NOT NULL,
    `keys` INTEGER NOT NULL,
    `exteriorColor` VARCHAR(191) NOT NULL,
    `driveTrain` VARCHAR(191) NOT NULL,
    `engineSize` DOUBLE NOT NULL,
    `enginePower` DOUBLE NOT NULL,
    `vin` VARCHAR(191) NOT NULL,
    `bodyType` VARCHAR(191) NOT NULL,
    `odometer` DOUBLE NOT NULL,
    `fuelTankCapacity` DOUBLE NOT NULL,
    `fuelConsumption` DOUBLE NOT NULL,
    `emissions` DOUBLE NOT NULL,
    `ancapSafetyRating` INTEGER NOT NULL,
    `cylinders` INTEGER NOT NULL,
    `gearbox` VARCHAR(191) NOT NULL,
    `towingCapacityBraked` INTEGER NOT NULL,
    `weight` INTEGER NOT NULL,
    `length` INTEGER NOT NULL,

    UNIQUE INDEX `Car_vin_key`(`vin`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CarModel` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `companyId` INTEGER NOT NULL,
    `modelName` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CarImage` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `image` VARCHAR(191) NOT NULL,
    `carId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PopularFeature` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `image` VARCHAR(191) NOT NULL,
    `label` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CarPopularFeature` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `popularFeatureId` INTEGER NOT NULL,
    `carId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `InstalledOption` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `label` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CarInstalledOption` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `installedOptionId` INTEGER NOT NULL,
    `carId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AftermarketAccessory` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `label` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CarAftermarketAccessory` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `aftermarketAccessoryId` INTEGER NOT NULL,
    `carId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `StandardFeature` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `label` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CarStandardFeature` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `standardFeatureId` INTEGER NOT NULL,
    `carId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ServiceHistory` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `date` DATETIME(3) NOT NULL,
    `mileageTravelled` DOUBLE NOT NULL,
    `carId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Car` ADD CONSTRAINT `Car_companyId_fkey` FOREIGN KEY (`companyId`) REFERENCES `Company`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CarModel` ADD CONSTRAINT `CarModel_companyId_fkey` FOREIGN KEY (`companyId`) REFERENCES `Company`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CarImage` ADD CONSTRAINT `CarImage_carId_fkey` FOREIGN KEY (`carId`) REFERENCES `Car`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CarPopularFeature` ADD CONSTRAINT `CarPopularFeature_carId_fkey` FOREIGN KEY (`carId`) REFERENCES `Car`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CarPopularFeature` ADD CONSTRAINT `CarPopularFeature_popularFeatureId_fkey` FOREIGN KEY (`popularFeatureId`) REFERENCES `PopularFeature`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CarInstalledOption` ADD CONSTRAINT `CarInstalledOption_carId_fkey` FOREIGN KEY (`carId`) REFERENCES `Car`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CarInstalledOption` ADD CONSTRAINT `CarInstalledOption_installedOptionId_fkey` FOREIGN KEY (`installedOptionId`) REFERENCES `InstalledOption`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CarAftermarketAccessory` ADD CONSTRAINT `CarAftermarketAccessory_carId_fkey` FOREIGN KEY (`carId`) REFERENCES `Car`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CarAftermarketAccessory` ADD CONSTRAINT `CarAftermarketAccessory_aftermarketAccessoryId_fkey` FOREIGN KEY (`aftermarketAccessoryId`) REFERENCES `AftermarketAccessory`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CarStandardFeature` ADD CONSTRAINT `CarStandardFeature_carId_fkey` FOREIGN KEY (`carId`) REFERENCES `Car`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CarStandardFeature` ADD CONSTRAINT `CarStandardFeature_standardFeatureId_fkey` FOREIGN KEY (`standardFeatureId`) REFERENCES `StandardFeature`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ServiceHistory` ADD CONSTRAINT `ServiceHistory_carId_fkey` FOREIGN KEY (`carId`) REFERENCES `Car`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
