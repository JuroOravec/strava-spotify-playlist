-- -- OLD SCHEMA
-- CREATE TABLE IF NOT EXISTS user_activity_playlist (
--   internal_user_id uuid NOT NULL,
--   strava_activity_id varchar NOT NULL UNIQUE,
--   spotify_playlist_id varchar NOT NULL PRIMARY KEY,
--   spotify_playlist_uri varchar NOT NULL,
--   tracks_assigned boolean NOT NULL DEFAULT FALSE,
--   UNIQUE(internal_user_id, strava_activity_id),
--   CONSTRAINT fk_internal_user_id
--     FOREIGN KEY(internal_user_id) 
-- 	    REFERENCES app_user(internal_user_id)
--       ON DELETE CASCADE
-- );

-- -- NEW SCHEMA
-- CREATE TABLE IF NOT EXISTS user_activity_playlist (
--   internal_user_id uuid NOT NULL,
--   activity_provider_id varchar NOT NULL,
--   activity_id varchar NOT NULL,
--   activity_name varchar,
--   playlist_provider_id varchar NOT NULL,
--   playlist_id varchar NOT NULL,
--   playlist_name varchar,
--   playlist_url varchar,
--   date_created bigint,
--   tracks_assigned boolean NOT NULL DEFAULT FALSE,
--   CONSTRAINT fk_internal_user_id
--     FOREIGN KEY(internal_user_id) 
-- 	    REFERENCES app_user(internal_user_id)
--       ON DELETE CASCADE
-- );

-- Change spotify_playlist_uri to spotify URLs
-- ex: 7uZTf1Ryng1wAxadri77OM -> https://open.spotify.com/playlist/7uZTf1Ryng1wAxadri77OM
-- https://stackoverflow.com/a/15293873/9788634
-- https://stackoverflow.com/a/4791095/9788634
UPDATE user_activity_playlist
  SET playlist_url = regexp_replace(playlist_url, '^.*:', 'https://open.spotify.com/playlist/');

ALTER TABLE user_activity_playlist
  RENAME COLUMN spotify_playlist_uri TO playlist_url;
ALTER TABLE user_activity_playlist
  RENAME COLUMN strava_activity_id TO activity_id;
ALTER TABLE user_activity_playlist
  RENAME COLUMN spotify_playlist_id TO playlist_id;

ALTER TABLE user_activity_playlist
  ADD COLUMN activity_provider_id varchar NOT NULL DEFAULT 'strava',
  ADD COLUMN activity_name varchar,
  ADD COLUMN playlist_provider_id varchar NOT NULL DEFAULT 'spotify',
  ADD COLUMN playlist_name varchar,
  ADD COLUMN date_created bigint,
  DROP CONSTRAINT user_activity_playlist_internal_user_id_strava_activity_id_key,
  DROP CONSTRAINT user_activity_playlist_strava_activity_id_key,
  DROP CONSTRAINT user_activity_playlist_pkey;
