-- -- OLD SCHEMA
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
--   CONSTRAINT pk_playlist
--     PRIMARY KEY (playlist_provider_id, playlist_id),
--   CONSTRAINT unique_user_playlist_activity
--     UNIQUE(
--       internal_user_id,
--       activity_provider_id,
--       activity_id,
--       playlist_provider_id,
--       playlist_id
--     ),
--   CONSTRAINT fk_internal_user_id
--     FOREIGN KEY(internal_user_id) 
-- 	    REFERENCES app_user(internal_user_id)
--       ON DELETE CASCADE
-- );

ALTER TABLE user_activity_playlist
  ADD CONSTRAINT pk_playlist
    PRIMARY KEY (playlist_provider_id, playlist_id),
  ADD CONSTRAINT unique_user_playlist_activity
    UNIQUE(
      internal_user_id,
      activity_provider_id,
      activity_id,
      playlist_provider_id,
      playlist_id
    );
