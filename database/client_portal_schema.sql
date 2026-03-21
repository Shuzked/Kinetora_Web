-- Kinetora Client Portal - Database Schema
-- Optimized for MySQL (Hostinger Business Hosting)

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Table `users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `users` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(100) NOT NULL,
  `email` VARCHAR(150) NOT NULL,
  `password` VARCHAR(255) NOT NULL COMMENT 'Hashed password (Bcrypt/Argon2 recommended)',
  `avatar_url` TEXT NULL,
  `fecha_inicio_suscripcion` DATE NULL,
  `plan_id` VARCHAR(50) NULL COMMENT 'Reference to subscription tier',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;

-- -----------------------------------------------------
-- Table `tasks`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tasks` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` INT UNSIGNED NOT NULL,
  `titulo` VARCHAR(200) NOT NULL,
  `descripcion` TEXT NULL,
  `estado` ENUM('pendiente', 'sprint', 'hecho') NOT NULL DEFAULT 'pendiente',
  `fecha_creacion` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `fk_tasks_users_idx` (`user_id` ASC),
  CONSTRAINT `fk_tasks_users`
    FOREIGN KEY (`user_id`)
    REFERENCES `users` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;

-- -----------------------------------------------------
-- Table `comments`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `comments` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `task_id` INT UNSIGNED NOT NULL,
  `user_id` INT UNSIGNED NOT NULL,
  `mensaje` TEXT NOT NULL,
  `fecha` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `fk_comments_tasks_idx` (`task_id` ASC),
  INDEX `fk_comments_users_idx` (`user_id` ASC),
  CONSTRAINT `fk_comments_tasks`
    FOREIGN KEY (`task_id`)
    REFERENCES `tasks` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_comments_users`
    FOREIGN KEY (`user_id`)
    REFERENCES `users` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;

-- -----------------------------------------------------
-- Table `invoices`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `invoices` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` INT UNSIGNED NOT NULL,
  `numero_factura` VARCHAR(50) NOT NULL,
  `url_pdf` TEXT NOT NULL,
  `estado_pago` ENUM('pagado', 'pendiente') NOT NULL DEFAULT 'pendiente',
  `fecha_emision` DATE NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `numero_factura_UNIQUE` (`numero_factura` ASC),
  INDEX `fk_invoices_users_idx` (`user_id` ASC),
  CONSTRAINT `fk_invoices_users`
    FOREIGN KEY (`user_id`)
    REFERENCES `users` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
