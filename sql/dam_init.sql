-- ============================================================
--  Digital Asset Manager (DAM) — Schema + Seed
--  Target DB : MariaDB 10.5+ (default schema = WRM, theo jdbc.properties)
--  Cách chạy : `USE WRM;` rồi `SOURCE dam_init.sql;`
--              hoặc paste vào HeidiSQL/Workbench / DBeaver.
--  Idempotent: Drop trước, Create sau (safe để chạy lại).
-- ============================================================

-- 0. DROP (reverse FK order)
DROP TABLE IF EXISTS DAM_ACCESS_LOG;
DROP TABLE IF EXISTS DAM_VERSION;
DROP TABLE IF EXISTS DAM_ASSET;
DROP TABLE IF EXISTS DAM_FOLDER;

-- ============================================================
-- 1. DAM_FOLDER  — cây thư mục, self-referential
-- ============================================================
CREATE TABLE DAM_FOLDER (
    FOLDER_ID         INT NOT NULL AUTO_INCREMENT,
    FOLDER_NM         VARCHAR(100) NOT NULL,
    PARENT_FOLDER_ID  INT NULL,
    PATH_DEPTH        INT NOT NULL DEFAULT 0,
    CREATE_DT         DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (FOLDER_ID),
    KEY IDX_FOLDER_PARENT (PARENT_FOLDER_ID),
    CONSTRAINT FK_FOLDER_PARENT FOREIGN KEY (PARENT_FOLDER_ID)
        REFERENCES DAM_FOLDER (FOLDER_ID) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- 2. DAM_ASSET
--    FILE_TYPE  : Documents | Images | Videos | Audio
--    STATUS     : Draft | Published | Archived
--    TAGS       : CSV để hiển thị CheckComboBox bên FE
--    FILE_SIZE  : bytes
-- ============================================================
CREATE TABLE DAM_ASSET (
    ASSET_ID     INT NOT NULL AUTO_INCREMENT,
    FILE_NM      VARCHAR(200) NOT NULL,
    FOLDER_ID    INT          NOT NULL,
    FILE_TYPE    VARCHAR(20)  NOT NULL,
    FILE_EXT     VARCHAR(10),
    FILE_SIZE    BIGINT       NOT NULL DEFAULT 0,
    OWNER_NM     VARCHAR(50),
    STATUS       VARCHAR(20)  NOT NULL DEFAULT 'Draft',
    TAGS         VARCHAR(500),
    DESCRIPTION  TEXT,
    PREVIEW_URL  VARCHAR(500),
    RESOLUTION   VARCHAR(50),
    UPLOAD_DT    DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (ASSET_ID),
    KEY IDX_ASSET_FOLDER (FOLDER_ID),
    KEY IDX_ASSET_TYPE   (FILE_TYPE),
    KEY IDX_ASSET_STATUS (STATUS),
    KEY IDX_ASSET_UPLOAD (UPLOAD_DT),
    CONSTRAINT FK_ASSET_FOLDER FOREIGN KEY (FOLDER_ID)
        REFERENCES DAM_FOLDER (FOLDER_ID)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- 3. DAM_VERSION  — lịch sử version cho 1 asset
-- ============================================================
CREATE TABLE DAM_VERSION (
    VER_ID       INT NOT NULL AUTO_INCREMENT,
    ASSET_ID     INT NOT NULL,
    VER_NO       VARCHAR(20)  NOT NULL,
    FILE_URL     VARCHAR(500),
    PREVIEW_URL  VARCHAR(500),
    CHANGE_LOG   TEXT,
    OWNER_NM     VARCHAR(50),
    UPLOAD_DT    DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (VER_ID),
    KEY IDX_VERSION_ASSET (ASSET_ID),
    CONSTRAINT FK_VERSION_ASSET FOREIGN KEY (ASSET_ID)
        REFERENCES DAM_ASSET (ASSET_ID) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- 4. DAM_ACCESS_LOG
--    ACTION_TP : VIEW | DOWNLOAD | EDIT | RESTORE
-- ============================================================
CREATE TABLE DAM_ACCESS_LOG (
    LOG_ID     INT NOT NULL AUTO_INCREMENT,
    ASSET_ID   INT NOT NULL,
    USER_NM    VARCHAR(50)  NOT NULL,
    ACTION_TP  VARCHAR(20)  NOT NULL,
    ACTION_DT  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    REMARK     VARCHAR(500),
    PRIMARY KEY (LOG_ID),
    KEY IDX_LOG_ASSET (ASSET_ID),
    KEY IDX_LOG_DT    (ACTION_DT),
    CONSTRAINT FK_LOG_ASSET FOREIGN KEY (ASSET_ID)
        REFERENCES DAM_ASSET (ASSET_ID) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- ============================================================
--  SEED DATA
-- ============================================================

-- ------------------------------------------------------------
-- FOLDERS  (10 folders, hierarchy 3 cấp)
--   1. Digital Assets (root)
--    ├── 2. Marketing Documents
--    │    ├── 3. Campaign Banners
--    │    ├── 4. PDF Brochures
--    │    └── 5. Social Media Assets
--    ├── 6. Video Assets
--    │    └── 7. Training Videos
--    ├── 8. Internal Manuals
--    ├── 9. Product Images
--    └── 10. Audio Library
-- ------------------------------------------------------------
INSERT INTO DAM_FOLDER (FOLDER_ID, FOLDER_NM, PARENT_FOLDER_ID, PATH_DEPTH) VALUES
  (1,  'Digital Assets',        NULL, 0),
  (2,  'Marketing Documents',   1,    1),
  (3,  'Campaign Banners',      2,    2),
  (4,  'PDF Brochures',         2,    2),
  (5,  'Social Media Assets',   2,    2),
  (6,  'Video Assets',          1,    1),
  (7,  'Training Videos',       6,    2),
  (8,  'Internal Manuals',      1,    1),
  (9,  'Product Images',        1,    1),
  (10, 'Audio Library',         1,    1);

-- ------------------------------------------------------------
-- ASSETS  (15 assets — đa dạng FILE_TYPE / STATUS / OWNER / size / month)
--   Distribution :  Documents 5 · Images 5 · Videos 3 · Audio 2
--   Status       :  Published 10 · Draft 4 · Archived 1
--   Today        :  3 (id 2, 13, 15)  → "New Uploads Today"
--   Hero (multi-version) : id 1 (Product_Image.jpg) — 5 version trong DAM_VERSION
-- ------------------------------------------------------------
INSERT INTO DAM_ASSET (
    ASSET_ID, FILE_NM, FOLDER_ID, FILE_TYPE, FILE_EXT, FILE_SIZE, OWNER_NM,
    STATUS, TAGS, DESCRIPTION, PREVIEW_URL, RESOLUTION, UPLOAD_DT
) VALUES
  -- 1) Hero asset — 5 versions
  (1,  'Product_Image.jpg',          9, 'Images',    'jpg',  3000000000, 'Carol',
       'Published', 'Marketing,External,Web',
       'Main hero product image for landing page (current v3.0).',
       '/cm/dam/images/preview/sample1.jpg', '1950 x 1080',
       '2026-03-20 14:30:00'),

  -- 2) Today
  (2,  'Annual_Report_2024.pdf',     4, 'Documents', 'pdf',     8500000, 'David',
       'Published', 'Internal,Confidential,Finance',
       'Annual fiscal report for FY 2024.',
       '/cm/dam/images/preview/document.svg', NULL,
       '2026-05-05 09:15:00'),

  -- 3)
  (3,  'Brand_Guidelines.pdf',       4, 'Documents', 'pdf',    12000000, 'Alice',
       'Published', 'Marketing,Brand',
       'Official corporate brand guidelines.',
       '/cm/dam/images/preview/document.svg', NULL,
       '2026-04-12 10:20:00'),

  -- 4) Draft image
  (4,  'Q4_Campaign_Banner.png',     3, 'Images',    'png',     2300000, 'Bob',
       'Draft',     'Marketing,Campaign,Q4',
       'Banner art for Q4 promotional campaign.',
       '/cm/dam/images/preview/sample2.jpg', '1920 x 1080',
       '2026-04-25 16:45:00'),

  -- 5) Draft template (PSD)
  (5,  'Social_Post_Template.psd',   5, 'Images',    'psd',    45000000, 'Bob',
       'Draft',     'Marketing,Social,Template',
       'Photoshop template for Instagram square posts.',
       '/cm/dam/images/preview/sample3.jpg', '1080 x 1080',
       '2026-03-08 11:00:00'),

  -- 6) Video published
  (6,  'Product_Demo.mp4',           6, 'Videos',    'mp4',   245000000, 'Carol',
       'Published', 'Product,External,Demo',
       'Product demonstration video, 3 minutes.',
       '/cm/dam/images/preview/video.svg', '1920 x 1080',
       '2026-05-02 13:00:00'),

  -- 7) Audio internal
  (7,  'CEO_Welcome_Speech.mp3',    10, 'Audio',     'mp3',    18000000, 'David',
       'Published', 'Internal,HR',
       'CEO welcome speech for new employee onboarding.',
       '/cm/dam/images/preview/audio.svg', NULL,
       '2026-01-22 09:00:00'),

  -- 8) Training video (large)
  (8,  'Training_Module_01.mp4',     7, 'Videos',    'mp4',   580000000, 'Eve',
       'Published', 'Internal,Training',
       'Onboarding training module 1 of 5.',
       '/cm/dam/images/preview/video.svg', '1280 x 720',
       '2026-02-14 15:20:00'),

  -- 9) Archived (old logo)
  (9,  'Old_Logo_v1.png',            9, 'Images',    'png',      850000, 'Alice',
       'Archived',  'Marketing,Legacy',
       'Original company logo (replaced 2025).',
       '/cm/dam/images/preview/sample4.jpg', '512 x 512',
       '2025-12-05 08:00:00'),

  -- 10) Internal manual
  (10, 'Employee_Handbook.docx',     8, 'Documents', 'docx',    4200000, 'David',
       'Published', 'Internal,HR,Policy',
       'Employee handbook 2026 edition.',
       '/cm/dam/images/preview/document.svg', NULL,
       '2026-02-28 11:30:00'),

  -- 11) Legal doc
  (11, 'Privacy_Policy.pdf',         8, 'Documents', 'pdf',     1500000, 'Frank',
       'Published', 'Internal,Confidential,Legal',
       'Updated privacy policy compliant with GDPR.',
       '/cm/dam/images/preview/document.svg', NULL,
       '2026-01-30 14:00:00'),

  -- 12) Draft jingle
  (12, 'Promo_Jingle.mp3',          10, 'Audio',     'mp3',     6800000, 'Eve',
       'Draft',     'Marketing,Audio,Jingle',
       '15-second jingle for radio ads.',
       '/cm/dam/images/preview/audio.svg', NULL,
       '2025-12-18 10:30:00'),

  -- 13) Today — webinar (large)
  (13, 'Webinar_Recording.mp4',      6, 'Videos',    'mp4',  1200000000, 'Carol',
       'Published', 'External,Webinar',
       'Recording of customer webinar held 2026-05-05.',
       '/cm/dam/images/preview/video.svg', '1920 x 1080',
       '2026-05-05 11:30:00'),

  -- 14) Draft spec
  (14, 'Product_Spec.docx',          8, 'Documents', 'docx',     980000, 'Bob',
       'Draft',     'Internal,Product,Spec',
       'Technical specification for upcoming release.',
       '/cm/dam/images/preview/document.svg', NULL,
       '2025-12-28 16:10:00'),

  -- 15) Today — hero background
  (15, 'Hero_Background.jpg',        3, 'Images',    'jpg',     4500000, 'Alice',
       'Published', 'Marketing,Web,Background',
       'Hero background for refreshed homepage.',
       '/cm/dam/images/preview/sample5.jpg', '2560 x 1440',
       '2026-05-05 08:20:00');

-- ------------------------------------------------------------
-- VERSIONS  (9 versions = 5 + 2 + 2)
--   Asset 1  Product_Image.jpg     : v1.0 → v1.1 → v2.0 → v2.1 → v3.0 (current)
--   Asset 2  Annual_Report_2024    : v1.0 → v1.1 (current, today)
--   Asset 3  Brand_Guidelines      : v1.0 → v2.0 (current)
-- ------------------------------------------------------------
INSERT INTO DAM_VERSION (
    VER_ID, ASSET_ID, VER_NO, FILE_URL, PREVIEW_URL, CHANGE_LOG, OWNER_NM, UPLOAD_DT
) VALUES
  -- Product_Image.jpg
  (1, 1, 'v1.0', '/files/product_image_v1.0.jpg', '/cm/dam/images/preview/product.svg',
        'Initial creative direction.',                'Carol', '2026-01-15 10:00:00'),
  (2, 1, 'v1.1', '/files/product_image_v1.1.jpg', '/cm/dam/images/preview/product.svg',
        'Color tone tweak per stakeholder feedback.', 'Carol', '2026-02-10 14:30:00'),
  (3, 1, 'v2.0', '/files/product_image_v2.0.jpg', '/cm/dam/images/preview/product.svg',
        'New layout with product close-up.',          'Carol', '2026-02-28 09:45:00'),
  (4, 1, 'v2.1', '/files/product_image_v2.1.jpg', '/cm/dam/images/preview/product.svg',
        'Text overlay updated for Q1 promo.',         'Alice', '2026-03-15 11:20:00'),
  (5, 1, 'v3.0', '/files/product_image_v3.0.jpg', '/cm/dam/images/preview/product.svg',
        'Final approved hero image.',                 'Carol', '2026-03-20 14:30:00'),

  -- Annual_Report_2024.pdf
  (6, 2, 'v1.0', '/files/annual_report_2024_v1.0.pdf',  '/cm/dam/images/preview/document.svg',
        'Initial draft for review.',                   'David', '2026-04-30 16:00:00'),
  (7, 2, 'v1.1', '/files/annual_report_2024_v1.1.pdf',  '/cm/dam/images/preview/document.svg',
        'Final after CFO sign-off.',                   'David', '2026-05-05 09:15:00'),

  -- Brand_Guidelines.pdf
  (8, 3, 'v1.0', '/files/brand_guidelines_v1.0.pdf',    '/cm/dam/images/preview/document.svg',
        'First public release.',                       'Alice', '2026-03-01 10:00:00'),
  (9, 3, 'v2.0', '/files/brand_guidelines_v2.0.pdf',    '/cm/dam/images/preview/document.svg',
        'Updated logo usage rules.',                   'Alice', '2026-04-12 10:20:00');

-- ------------------------------------------------------------
-- ACCESS LOGS  (12 logs — đủ 4 ACTION_TP, nhiều user, span 5 tháng)
-- ------------------------------------------------------------
INSERT INTO DAM_ACCESS_LOG (
    LOG_ID, ASSET_ID, USER_NM, ACTION_TP, ACTION_DT, REMARK
) VALUES
  ( 1,  1, 'Carol', 'VIEW',     '2026-03-20 15:00:00', 'Reviewed final hero image'),
  ( 2,  1, 'Alice', 'DOWNLOAD', '2026-03-21 09:30:00', 'For homepage rollout'),
  ( 3,  1, 'Carol', 'EDIT',     '2026-03-22 11:15:00', 'Updated TAGS to include Web'),
  ( 4,  1, 'Alice', 'RESTORE',  '2026-04-05 14:00:00', 'Reverted to v2.1 then back to v3.0'),
  ( 5,  2, 'David', 'VIEW',     '2026-05-05 09:20:00', 'Final review before release'),
  ( 6,  2, 'Frank', 'DOWNLOAD', '2026-05-05 10:00:00', 'Distribute to investors'),
  ( 7,  4, 'Bob',   'EDIT',     '2026-04-26 09:00:00', 'Reposition headline'),
  ( 8,  8, 'Eve',   'VIEW',     '2026-02-15 10:00:00', 'Pre-launch QA review'),
  ( 9, 10, 'David', 'EDIT',     '2026-03-02 13:30:00', 'Updated leave policy section'),
  (10, 11, 'Frank', 'DOWNLOAD', '2026-02-01 11:00:00', 'Counsel archive'),
  (11, 13, 'Carol', 'DOWNLOAD', '2026-05-05 12:00:00', 'Send to attendees'),
  (12, 12, 'Eve',   'VIEW',     '2025-12-19 09:00:00', 'Initial review');


-- ============================================================
--  VERIFY  (chạy thủ công nếu muốn)
-- ============================================================
-- SELECT COUNT(*) AS folders     FROM DAM_FOLDER;        -- 10
-- SELECT COUNT(*) AS assets      FROM DAM_ASSET;         -- 15
-- SELECT COUNT(*) AS versions    FROM DAM_VERSION;       --  9
-- SELECT COUNT(*) AS access_logs FROM DAM_ACCESS_LOG;    -- 12
--
-- -- Distribution by FILE_TYPE
-- SELECT FILE_TYPE, COUNT(*) FROM DAM_ASSET GROUP BY FILE_TYPE;
--
-- -- Storage by month
-- SELECT DATE_FORMAT(UPLOAD_DT,'%Y-%m') AS MONTH_LABEL,
--        ROUND(SUM(FILE_SIZE)/1073741824, 4) AS STORAGE_GB
--   FROM DAM_ASSET
--  GROUP BY DATE_FORMAT(UPLOAD_DT,'%Y-%m')
--  ORDER BY 1;
--
-- -- New uploads today
-- SELECT COUNT(*) FROM DAM_ASSET WHERE DATE(UPLOAD_DT) = CURDATE();
