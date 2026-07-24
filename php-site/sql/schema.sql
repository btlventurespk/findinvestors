-- findinvestors.pk — database schema + seed data
-- Run once via setup.php, or import through phpMyAdmin.

CREATE TABLE IF NOT EXISTS startups (
  id             INT AUTO_INCREMENT PRIMARY KEY,
  slug           VARCHAR(80) NOT NULL UNIQUE,
  name           VARCHAR(150) NOT NULL,
  logo_url       VARCHAR(255) NULL,
  one_liner      VARCHAR(200) NOT NULL,
  sector         VARCHAR(60) NOT NULL,
  city           VARCHAR(60) NOT NULL,
  founded_year   INT NOT NULL DEFAULT 2024,
  entity_type    VARCHAR(80) NOT NULL DEFAULT '',
  website        VARCHAR(255) NULL,
  problem        TEXT NULL,
  solution       TEXT NULL,
  business_model TEXT NULL,
  target_market  TEXT NULL,
  competition    TEXT NULL,
  revenue_band   VARCHAR(80) NOT NULL DEFAULT '',
  months_running INT NOT NULL DEFAULT 0,
  customers      VARCHAR(200) NOT NULL DEFAULT '',
  growth_pct     VARCHAR(80) NULL,
  milestones     TEXT NULL,
  raise_min      BIGINT NOT NULL DEFAULT 0,
  raise_max      BIGINT NOT NULL DEFAULT 0,
  equity_offered VARCHAR(80) NULL,
  use_of_funds   TEXT NULL,
  prior_funding  TINYINT(1) NOT NULL DEFAULT 0,
  founder_name   VARCHAR(150) NOT NULL DEFAULT '',
  founder_role   VARCHAR(120) NOT NULL DEFAULT '',
  founder_bio    TEXT NULL,
  founder_photo  VARCHAR(255) NULL,
  linkedin       VARCHAR(255) NULL,
  team_size      INT NOT NULL DEFAULT 1,
  deck_url       VARCHAR(255) NULL,
  video_url      VARCHAR(255) NULL,
  featured       TINYINT(1) NOT NULL DEFAULT 0,
  published      TINYINT(1) NOT NULL DEFAULT 0,
  created_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS applications (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  payload    TEXT NOT NULL,
  email      VARCHAR(191) NOT NULL,
  whatsapp   VARCHAR(60) NOT NULL,
  status     VARCHAR(30) NOT NULL DEFAULT 'new',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS intro_requests (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  startup_id  INT NULL,
  startup_name VARCHAR(150) NOT NULL DEFAULT '',
  name        VARCHAR(150) NOT NULL,
  email       VARCHAR(191) NOT NULL,
  phone       VARCHAR(60) NOT NULL,
  message     TEXT NULL,
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
