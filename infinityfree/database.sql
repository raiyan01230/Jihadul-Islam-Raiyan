-- ====================================================================
-- THE LITTLE FLOWER SCHOOL & JIHADUL ISLAM RAIYAN PORTFOLIO
-- MySQL Database Schema for InfinityFree Hosting (sql301.ezyro.com)
-- Encoding: UTF-8 (utf8mb4)
-- Engine: InnoDB
-- ====================================================================

SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS `ai_chat_logs`;
DROP TABLE IF EXISTS `orders`;
DROP TABLE IF EXISTS `contacts`;
DROP TABLE IF EXISTS `certificates`;
DROP TABLE IF EXISTS `projects`;
DROP TABLE IF EXISTS `users`;
SET FOREIGN_KEY_CHECKS = 1;

-- --------------------------------------------------------------------
-- Table: users (Admin & System Users)
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `users` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `username` VARCHAR(50) NOT NULL UNIQUE,
  `email` VARCHAR(100) NOT NULL UNIQUE,
  `password_hash` VARCHAR(255) NOT NULL,
  `role` ENUM('super_admin', 'admin', 'teacher', 'student', 'parent') NOT NULL DEFAULT 'admin',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_username` (`username`),
  INDEX `idx_email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------------------
-- Table: contacts (Direct Messages & Consultation Requests)
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `contacts` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(100) NOT NULL,
  `email` VARCHAR(150) NOT NULL,
  `subject` VARCHAR(200) NOT NULL,
  `message` TEXT NOT NULL,
  `ip_address` VARCHAR(45) DEFAULT NULL,
  `auto_reply_sent` TINYINT(1) DEFAULT 1,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX `idx_email` (`email`),
  INDEX `idx_created_at` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------------------
-- Table: orders (Service Package Purchases & Invoices)
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `orders` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `order_id` VARCHAR(50) NOT NULL UNIQUE,
  `client_name` VARCHAR(100) NOT NULL,
  `client_email` VARCHAR(150) NOT NULL,
  `client_phone` VARCHAR(30) NOT NULL,
  `category_title` VARCHAR(100) NOT NULL,
  `plan_name` VARCHAR(100) NOT NULL,
  `price` VARCHAR(20) NOT NULL,
  `requirements` TEXT DEFAULT NULL,
  `status` ENUM('pending', 'contacted', 'in_progress', 'completed', 'cancelled') DEFAULT 'pending',
  `ip_address` VARCHAR(45) DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX `idx_order_id` (`order_id`),
  INDEX `idx_client_email` (`client_email`),
  INDEX `idx_status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------------------
-- Table: projects (Featured Software Directory)
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `projects` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `project_key` VARCHAR(50) NOT NULL UNIQUE,
  `title` VARCHAR(150) NOT NULL,
  `category` ENUM('web', 'islamic', 'ai') NOT NULL DEFAULT 'web',
  `description` TEXT NOT NULL,
  `image_url` TEXT NOT NULL,
  `live_url` TEXT NOT NULL,
  `tech_stack` JSON NOT NULL,
  `stars` INT UNSIGNED DEFAULT 0,
  `forks` INT UNSIGNED DEFAULT 0,
  `active_users` INT UNSIGNED DEFAULT 0,
  `is_featured` TINYINT(1) DEFAULT 1,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------------------
-- Table: certificates (Verified Professional Credentials)
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `certificates` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(150) NOT NULL,
  `issuer` VARCHAR(100) NOT NULL,
  `issue_date` VARCHAR(50) NOT NULL,
  `image_url` TEXT NOT NULL,
  `credential_url` TEXT NOT NULL,
  `skills_acquired` TEXT NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------------------
-- Table: ai_chat_logs (Gemini & Rule-Based Copilot Interactions)
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `ai_chat_logs` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `user_message` TEXT NOT NULL,
  `ai_response` TEXT NOT NULL,
  `model_used` VARCHAR(50) DEFAULT 'gemini-3.5-flash',
  `ip_address` VARCHAR(45) DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX `idx_created_at` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ====================================================================
-- SEED DATA INSERTS
-- ====================================================================

-- Default Admin Account (Username: admin, Password: ChangeMe2026!)
INSERT INTO `users` (`username`, `email`, `password_hash`, `role`) 
VALUES ('admin', 'thelittleflower1122@gmail.com', '$2y$10$e8Tj4k8Z1.N9d3Zf4O7Muu9E1vN2L8eK3oR7M8w9P0Q1R2S3T4U5V', 'super_admin')
ON DUPLICATE KEY UPDATE `id`=`id`;

-- Seed Featured Projects
INSERT INTO `projects` (`project_key`, `title`, `category`, `description`, `image_url`, `live_url`, `tech_stack`, `stars`, `forks`, `active_users`, `is_featured`) VALUES
('umrah-savings', 'Umrah Savings Planner', 'islamic', 'Specialized budgeting tracker with emerald-gold themes and offline synchronization patterns for tracking pilgrimage funds.', 'https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&q=80&w=800', 'https://raiyan01230.github.io/Umrah-Savings/', '["React 18", "Tailwind CSS", "Local Storage", "Chart.js"]', 48, 12, 1200, 1),
('lower-your-gaze', 'Lower Your Gaze Reminder', 'islamic', 'An interactive spiritual eye exercise companion featuring screen-time wellness trackers, eye stretch timers, and motivational quotes.', 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=800', 'https://raiyan01230.github.io/loweryouregaze/', '["TypeScript", "Motion", "Audio Synth", "Tailwind"]', 62, 18, 2500, 1),
('way-of-jannah', 'The Way of Jannah Portal', 'ai', 'AI-guided spiritual companion portal incorporating daily prayer logs, Quran milestone trackers, and Jannah progress roadmaps.', 'https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&q=80&w=800', 'https://the-way-of-jannah.ai.studio', '["React", "Gemini 2.5 AI", "Firebase Firestore", "Tailwind"]', 95, 27, 4800, 1)
ON DUPLICATE KEY UPDATE `id`=`id`;

-- Seed Verified Credentials
INSERT INTO `certificates` (`title`, `issuer`, `issue_date`, `image_url`, `credential_url`, `skills_acquired`) VALUES
('C Programming Certificate of Achievement', 'SoloLearn', 'October 2024', 'https://uploads.onecompiler.io/44rq7cdfs/1780938941967/C%20Programming%20Certificate_page-0001.jpg', 'https://uploads.onecompiler.io/44rq7cdfs/1780938941967/C%20Programming%20Certificate_page-0001.jpg', 'Memory Management, Pointers, Low-Level Data Structures, Sorting Algorithms'),
('Responsive Web Design Certificate', 'freeCodeCamp', 'January 2025', 'https://uploads.onecompiler.io/44rq7cdfs/1780938746782/freecodecamp.PDF_page-0001.jpg', 'https://uploads.onecompiler.io/44rq7cdfs/1780938746782/freecodecamp.PDF_page-0001.jpg', 'HTML5 Semantic Layout, CSS Grid, Flexbox, Fluid Typography, Accessibility'),
('Full-Stack Software Development Specialization', 'The Little Flower School Tech Hub', 'February 2025', 'https://uploads.onecompiler.io/44rq7cdfs/1780938538039/certificate_page-0001.jpg', 'https://uploads.onecompiler.io/44rq7cdfs/1780938538039/certificate_page-0001.jpg', 'React 18, Node.js, PHP, Firebase Cloud Firestore, Security Hardening')
ON DUPLICATE KEY UPDATE `id`=`id`;
