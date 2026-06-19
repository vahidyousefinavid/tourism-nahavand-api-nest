-- Migration: Convert varchar columns to json (multilingual) format
-- Run this ONCE before restarting the NestJS server
-- =====================================================================

-- ── creative_city_news ──────────────────────────────────────────────

-- Step 1: add new json columns
ALTER TABLE creative_city_news
  ADD COLUMN IF NOT EXISTS title_new    json,
  ADD COLUMN IF NOT EXISTS summary_new  json,
  ADD COLUMN IF NOT EXISTS content_new  json;

-- Step 2: copy existing string data wrapped as { "fa": "..." }
UPDATE creative_city_news SET
  title_new   = json_build_object('fa', title),
  summary_new = json_build_object('fa', summary),
  content_new = CASE WHEN content IS NOT NULL AND content <> '' THEN json_build_object('fa', content) ELSE NULL END;

-- Step 3: drop old varchar columns
ALTER TABLE creative_city_news
  DROP COLUMN IF EXISTS title,
  DROP COLUMN IF EXISTS summary,
  DROP COLUMN IF EXISTS content;

-- Step 4: rename new columns
ALTER TABLE creative_city_news RENAME COLUMN title_new   TO title;
ALTER TABLE creative_city_news RENAME COLUMN summary_new TO summary;
ALTER TABLE creative_city_news RENAME COLUMN content_new TO content;

-- Step 5: add NOT NULL on required columns
ALTER TABLE creative_city_news ALTER COLUMN title   SET NOT NULL;
ALTER TABLE creative_city_news ALTER COLUMN summary SET NOT NULL;


-- ── creative_city_initiatives ────────────────────────────────────────

ALTER TABLE creative_city_initiatives
  ADD COLUMN IF NOT EXISTS title_new       json,
  ADD COLUMN IF NOT EXISTS description_new json;

UPDATE creative_city_initiatives SET
  title_new       = json_build_object('fa', title),
  description_new = CASE WHEN description IS NOT NULL AND description <> '' THEN json_build_object('fa', description) ELSE NULL END;

ALTER TABLE creative_city_initiatives
  DROP COLUMN IF EXISTS title,
  DROP COLUMN IF EXISTS description;

ALTER TABLE creative_city_initiatives RENAME COLUMN title_new       TO title;
ALTER TABLE creative_city_initiatives RENAME COLUMN description_new TO description;

ALTER TABLE creative_city_initiatives ALTER COLUMN title SET NOT NULL;


-- Done. Now restart the NestJS server — TypeORM will find columns already correct.
