-- CreateTable
CREATE TABLE `Customer` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `customer_code` VARCHAR(191) NOT NULL,
    `customer_name` VARCHAR(191) NOT NULL,
    `contact_no` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `contact_person` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Unit` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `unit_code` VARCHAR(191) NOT NULL,
    `unit_name` VARCHAR(191) NOT NULL,
    `unit_contact` VARCHAR(191) NOT NULL,
    `unit_address` VARCHAR(191) NULL,
    `unit_contact_person` VARCHAR(191) NULL,
    `customer_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Machine` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `machine_kind` VARCHAR(191) NOT NULL,
    `machine_make` VARCHAR(191) NOT NULL,
    `machine_type` VARCHAR(191) NOT NULL,
    `other_machine_make` VARCHAR(191) NULL,
    `other_machine_type` VARCHAR(191) NULL,
    `machine_info1` VARCHAR(191) NULL,
    `machine_info2` VARCHAR(191) NULL,
    `machine_id` VARCHAR(191) NULL,
    `unit_id` INTEGER NOT NULL,
    `customer_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Part` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `analysis_type` VARCHAR(191) NOT NULL,
    `part_kind` VARCHAR(191) NOT NULL,
    `part_make` VARCHAR(191) NOT NULL,
    `part_type` VARCHAR(191) NOT NULL,
    `bi_carbunation` BOOLEAN NOT NULL DEFAULT false,
    `other_part_make` VARCHAR(191) NULL,
    `other_part_type` VARCHAR(191) NULL,
    `part_info` VARCHAR(191) NULL,
    `part_id` VARCHAR(191) NULL,
    `capacity_in_ltrs` DOUBLE NULL,
    `machine_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Unit` ADD CONSTRAINT `Unit_customer_id_fkey` FOREIGN KEY (`customer_id`) REFERENCES `Customer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Machine` ADD CONSTRAINT `Machine_unit_id_fkey` FOREIGN KEY (`unit_id`) REFERENCES `Unit`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Machine` ADD CONSTRAINT `Machine_customer_id_fkey` FOREIGN KEY (`customer_id`) REFERENCES `Customer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Part` ADD CONSTRAINT `Part_machine_id_fkey` FOREIGN KEY (`machine_id`) REFERENCES `Machine`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
