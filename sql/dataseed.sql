-- ============================================================
--  Digital Asset Manager (DAM) — Additional Seed Data
--  Chạy SAU khi đã chạy dam_init.sql (không DROP table).
--  Idempotent: DELETE range trước, INSERT sau — safe để chạy lại.
--  Target DB : MariaDB 10.5+ / schema WRM
--  Cách chạy : USE WRM;  SOURCE dataseed.sql;
--
--  Ranges (không conflict với dam_init.sql):
--    DAM_FOLDER      : ID 11 – 20  (thêm 10 folders)
--    DAM_ASSET       : ID 16 – 30  (thêm 15 assets)
--    DAM_VERSION     : ID 10 – 18  (thêm  9 versions)
--    DAM_ACCESS_LOG  : ID 13 – 24  (thêm 12 logs)
-- ============================================================

-- ------------------------------------------------------------
-- CLEANUP  (reverse FK order — safe để chạy lại nhiều lần)
-- ------------------------------------------------------------
DELETE FROM DAM_ACCESS_LOG WHERE LOG_ID     BETWEEN 13 AND 24;
DELETE FROM DAM_VERSION     WHERE VER_ID    BETWEEN 10 AND 18;
DELETE FROM DAM_ASSET       WHERE ASSET_ID  BETWEEN 16 AND 30;
DELETE FROM DAM_FOLDER      WHERE FOLDER_ID BETWEEN 11 AND 20;


-- ------------------------------------------------------------
-- FOLDERS  (10 thư mục mới — 4 nhánh cấp-1, 6 nhánh cấp-2)
--
--   Digital Assets (1)  ← root hiện có
--    ├── 11. Archive
--    │    ├── 12. Old Campaigns
--    │    └── 13. Retired Products
--    ├── 14. Design Assets
--    │    ├── 15. Icons & SVGs
--    │    └── 16. UI Mockups
--    ├── 17. Legal & Compliance
--    └── 18. Events
--         ├── 19. Conferences
--         └── 20. Webinar Archive
-- ------------------------------------------------------------

-- cấp 1 (parent = 1, đã có sẵn)
INSERT INTO DAM_FOLDER (FOLDER_ID, FOLDER_NM, PARENT_FOLDER_ID, PATH_DEPTH) VALUES
  (11, 'Archive',             1, 1),
  (14, 'Design Assets',       1, 1),
  (17, 'Legal & Compliance',  1, 1),
  (18, 'Events',              1, 1);

-- cấp 2 (parent 11, 14, 18 vừa tạo ở trên)
INSERT INTO DAM_FOLDER (FOLDER_ID, FOLDER_NM, PARENT_FOLDER_ID, PATH_DEPTH) VALUES
  (12, 'Old Campaigns',    11, 2),
  (13, 'Retired Products', 11, 2),
  (15, 'Icons & SVGs',     14, 2),
  (16, 'UI Mockups',       14, 2),
  (19, 'Conferences',      18, 2),
  (20, 'Webinar Archive',  18, 2);


-- ------------------------------------------------------------
-- ASSETS  (15 assets mới — ID 16–30)
--   Distribution : Documents 5 · Images 6 · Videos 2 · Audio 2
--   Status       : Published 9 · Draft 2 · Archived 2 · Review 1 · Inactive 1
--   Today (2026-05-13) : ID 28, 30
--   New owners   : Grace, Henry, Ivan, Judy, Karl
-- ------------------------------------------------------------
INSERT INTO DAM_ASSET (
    ASSET_ID, FILE_NM, FOLDER_ID, FILE_TYPE, FILE_EXT, FILE_SIZE, OWNER_NM,
    STATUS, TAGS, DESCRIPTION, PREVIEW_URL, RESOLUTION, UPLOAD_DT
) VALUES

  -- 16) Archived campaign banner
  (16, 'Summer_Campaign_Banner.png',  12, 'Images',    'png',    3100000, 'Grace',
       'Archived',  'Campaign,Marketing,Legacy',
       'Full-width banner for Summer 2025 promotional campaign.',
       '/cm/dam/images/preview/archive.svg',  '1920 x 600',
       '2025-07-15 10:00:00'),

  -- 17) Icon set — multi-version (v1.0 → v2.0)
  (17, 'Icon_Set_v2.svg',             15, 'Images',    'svg',      92000, 'Henry',
       'Published', 'Branding,Digital,Marketing',
       'Brand icon library v2 — 48 icons in SVG format.',
       '/cm/dam/images/preview/sample6.jpg',  '512 x 512',
       '2026-03-01 11:00:00'),

  -- 18) Q1 launch brief
  (18, 'Q1_Launch_Brief.pdf',          4, 'Documents', 'pdf',    2400000, 'Ivan',
       'Published', 'Marketing,Campaign,Print',
       'Q1 product launch campaign brief and timeline.',
       '/cm/dam/images/preview/document.svg', NULL,
       '2026-01-20 09:30:00'),

  -- 19) Draft dashboard mockup (PSD)
  (19, 'Dashboard_Mockup_v1.psd',     16, 'Images',    'psd',   68000000, 'Judy',
       'Draft',     'Digital,Branding,Print',
       'Hi-fi mockup of the new analytics dashboard.',
       '/cm/dam/images/preview/sample7.jpg',  '1440 x 900',
       '2026-04-18 15:45:00'),

  -- 20) Conference recap video (large)
  (20, 'TechConf_2025_Recap.mp4',     19, 'Videos',   'mp4',  890000000, 'Karl',
       'Published', 'Marketing,SocialMedia',
       'Full recording of TechConf 2025 keynote and breakout sessions.',
       '/cm/dam/images/preview/video.svg',    '1920 x 1080',
       '2025-11-10 17:00:00'),

  -- 21) Legal template
  (21, 'NDA_Template_2026.docx',      17, 'Documents', 'docx',   780000, 'Frank',
       'Published', 'Print,Legacy',
       'Standard non-disclosure agreement template for 2026.',
       '/cm/dam/images/preview/document.svg', NULL,
       '2026-01-08 08:00:00'),

  -- 22) Branded podcast — multi-version (v1.0 → v1.1)
  (22, 'Brand_Podcast_Ep01.mp3',      10, 'Audio',     'mp3',  24500000, 'Grace',
       'Published', 'Marketing,Branding,SocialMedia',
       'Episode 1 of the brand storytelling podcast series.',
       '/cm/dam/images/preview/audio.svg',    NULL,
       '2026-03-25 14:00:00'),

  -- 23) Product image v2 — multi-version (v1.0 → v1.1)
  (23, 'Product_Image_v2.jpg',         9, 'Images',    'jpg',   5200000, 'Carol',
       'Published', 'Marketing,Campaign,Photo',
       'Refreshed hero product shot for Q2 catalogue.',
       '/cm/dam/images/preview/sample8.jpg',  '2000 x 2000',
       '2026-04-05 13:30:00'),

  -- 24) Compliance checklist (under review)
  (24, 'Compliance_Checklist_Q1.pdf', 17, 'Documents', 'pdf',   1100000, 'Frank',
       'Review',    'Print,Legacy',
       'Q1 compliance audit checklist — pending legal sign-off.',
       '/cm/dam/images/preview/document.svg', NULL,
       '2026-04-30 10:00:00'),

  -- 25) Webinar slides
  (25, 'Q2_Webinar_Slides.pdf',       20, 'Documents', 'pdf',   9800000, 'David',
       'Published', 'Marketing,SocialMedia,Digital',
       'Presentation slides for Q2 customer webinar.',
       '/cm/dam/images/preview/document.svg', NULL,
       '2026-05-01 09:00:00'),

  -- 26) Training module 2 — multi-version (v1.0 → v1.1 → v2.0)
  (26, 'Training_Module_02.mp4',       7, 'Videos',   'mp4',  620000000, 'Eve',
       'Published', 'Video,Legacy,Digital',
       'Onboarding training module 2 of 5.',
       '/cm/dam/images/preview/video.svg',    '1280 x 720',
       '2026-03-10 14:00:00'),

  -- 27) Event photo
  (27, 'Team_Event_Photo.jpg',        18, 'Images',    'jpg',   7800000, 'Judy',
       'Published', 'Photo,Branding,SocialMedia',
       'Group photo from company anniversary event.',
       '/cm/dam/images/preview/sample9.jpg',  '4032 x 3024',
       '2026-04-22 18:30:00'),

  -- 28) Today — draft jingle
  (28, 'Summer_Jingle_Draft.mp3',     10, 'Audio',     'mp3',   8900000, 'Eve',
       'Draft',     'Campaign,Marketing,Branding',
       '30-second jingle draft for upcoming summer campaign.',
       '/cm/dam/images/preview/audio.svg',    NULL,
       '2026-05-13 08:45:00'),

  -- 29) Archived legacy manual
  (29, 'Legacy_Product_Manual.pdf',   13, 'Documents', 'pdf',   3600000, 'Bob',
       'Archived',  'Legacy,Print,Digital',
       'Product manual for EOL model (archived 2025-Q4).',
       '/cm/dam/images/preview/archive.svg',  NULL,
       '2025-09-30 11:00:00'),

  -- 30) Today — new hero image (multi-version)
  (30, 'Homepage_Hero_v2.jpg',         3, 'Images',    'jpg',   5700000, 'Alice',
       'Published', 'Campaign,Marketing,Photo',
       'Refreshed homepage hero image for May 2026 redesign.',
       '/cm/dam/images/preview/sample10.jpg', '2560 x 1440',
       '2026-05-13 09:20:00');


-- ------------------------------------------------------------
-- VERSIONS  (9 version mới — ID 10–18)
--   Asset 17 Icon_Set_v2.svg        : v1.0 → v2.0 (current)
--   Asset 22 Brand_Podcast_Ep01.mp3 : v1.0 → v1.1 (current)
--   Asset 26 Training_Module_02.mp4 : v1.0 → v1.1 → v2.0 (current)
--   Asset 30 Homepage_Hero_v2.jpg   : v1.0 → v2.0 (current)
-- ------------------------------------------------------------
INSERT INTO DAM_VERSION (
    VER_ID, ASSET_ID, VER_NO, FILE_URL, PREVIEW_URL, CHANGE_LOG, OWNER_NM, UPLOAD_DT
) VALUES

  -- Icon_Set_v2.svg
  (10, 17, 'v1.0', '/files/icon_set_v1.0.svg', '/cm/dam/images/preview/image.svg',
       'Initial 24-icon release.',                       'Henry', '2026-02-01 10:00:00'),
  (11, 17, 'v2.0', '/files/icon_set_v2.0.svg', '/cm/dam/images/preview/image.svg',
       'Doubled to 48 icons; stroke weight standardised.','Henry', '2026-03-01 11:00:00'),

  -- Brand_Podcast_Ep01.mp3
  (12, 22, 'v1.0', '/files/brand_podcast_ep01_v1.0.mp3', '/cm/dam/images/preview/audio.svg',
       'Raw recorded episode.',                          'Grace', '2026-03-01 09:00:00'),
  (13, 22, 'v1.1', '/files/brand_podcast_ep01_v1.1.mp3', '/cm/dam/images/preview/audio.svg',
       'Noise reduction + intro jingle added.',          'Grace', '2026-03-25 14:00:00'),

  -- Training_Module_02.mp4
  (14, 26, 'v1.0', '/files/training_module02_v1.0.mp4', '/cm/dam/images/preview/video.svg',
       'Initial cut submitted to HR.',                   'Eve',   '2026-02-20 10:00:00'),
  (15, 26, 'v1.1', '/files/training_module02_v1.1.mp4', '/cm/dam/images/preview/video.svg',
       'Closed captions added.',                         'Eve',   '2026-03-01 14:30:00'),
  (16, 26, 'v2.0', '/files/training_module02_v2.0.mp4', '/cm/dam/images/preview/video.svg',
       'Reshot section 3; updated branding overlay.',    'Eve',   '2026-03-10 14:00:00'),

  -- Homepage_Hero_v2.jpg
  (17, 30, 'v1.0', '/files/homepage_hero_v1.0.jpg', '/cm/dam/images/preview/image.svg',
       'Initial composition.',                           'Alice', '2026-04-30 16:00:00'),
  (18, 30, 'v2.0', '/files/homepage_hero_v2.0.jpg', '/cm/dam/images/preview/image.svg',
       'Colour grade + CTA text reposition approved.',   'Alice', '2026-05-13 09:20:00');


-- ------------------------------------------------------------
-- ACCESS LOGS  (12 logs mới — ID 13–24)
--   Đủ 4 ACTION_TP, trải đều các asset mới, 4 tháng
-- ------------------------------------------------------------
INSERT INTO DAM_ACCESS_LOG (
    LOG_ID, ASSET_ID, USER_NM, ACTION_TP, ACTION_DT, REMARK
) VALUES
  (13, 17, 'Henry',  'VIEW',     '2026-03-01 11:30:00', 'Verified icon set before publish'),
  (14, 18, 'Ivan',   'DOWNLOAD', '2026-01-21 09:00:00', 'Shared with sales and channel team'),
  (15, 20, 'Karl',   'VIEW',     '2025-11-11 14:00:00', 'Post-event quality check'),
  (16, 22, 'Grace',  'EDIT',     '2026-03-26 09:30:00', 'Updated episode title and tags'),
  (17, 23, 'Carol',  'DOWNLOAD', '2026-04-06 11:00:00', 'Sent to agency for catalogue layout'),
  (18, 24, 'Frank',  'VIEW',     '2026-05-01 09:00:00', 'Compliance pre-audit review'),
  (19, 25, 'David',  'DOWNLOAD', '2026-05-02 15:30:00', 'Distributed to registered attendees'),
  (20, 26, 'Eve',    'VIEW',     '2026-03-11 08:30:00', 'Final QA before publishing'),
  (21, 26, 'Henry',  'DOWNLOAD', '2026-03-12 10:00:00', 'Offline HR training package'),
  (22, 27, 'Judy',   'EDIT',     '2026-04-23 14:00:00', 'Cropped to 16:9 for social header'),
  (23, 29, 'Bob',    'RESTORE',  '2025-10-05 13:00:00', 'Recovered after accidental archive'),
  (24, 30, 'Alice',  'VIEW',     '2026-05-13 09:30:00', 'Final hero approval review');


-- ============================================================
--  VERIFY  (chạy thủ công nếu muốn kiểm tra)
-- ============================================================
-- SELECT COUNT(*) AS folders     FROM DAM_FOLDER;        -- 20  (10+10)
-- SELECT COUNT(*) AS assets      FROM DAM_ASSET;         -- 30  (15+15)
-- SELECT COUNT(*) AS versions    FROM DAM_VERSION;       -- 18  ( 9+ 9)
-- SELECT COUNT(*) AS access_logs FROM DAM_ACCESS_LOG;    -- 24  (12+12)
--
-- -- New uploads today (CURDATE = 2026-05-13) → 2 (ID 28, 30)
-- SELECT FILE_NM, UPLOAD_DT FROM DAM_ASSET WHERE DATE(UPLOAD_DT) = CURDATE();
--
-- -- Distribution by FILE_TYPE (after seed)
-- SELECT FILE_TYPE, COUNT(*) FROM DAM_ASSET GROUP BY FILE_TYPE;
-- -- Documents:10  Images:11  Videos: 5  Audio: 4
--
-- -- Status spread
-- SELECT STATUS, COUNT(*) FROM DAM_ASSET GROUP BY STATUS;
-- -- Published:19  Draft:6  Archived:3  Review:1  Inactive:1
