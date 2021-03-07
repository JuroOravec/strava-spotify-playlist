-- -- OLD SCHEMA
-- user_track (
--   internal_user_id uuid NOT NULL,
--   spotify_track_id varchar NOT NULL,
--   spotify_track_uri varchar NOT NULL,
--   start_time bigint NOT NULL,
--   PRIMARY KEY(internal_user_id, spotify_track_id, start_time),
--   CONSTRAINT fk_internal_user_id
--     FOREIGN KEY(internal_user_id) 
-- 	    REFERENCES app_user(internal_user_id)
--       ON DELETE CASCADE
-- );

-- -- NEW SCHEMA
-- user_track (
--   internal_user_id uuid NOT NULL,
--   playlist_provider_id varchar NOT NULL,
--   track_id varchar NOT NULL,
--   start_time bigint NOT NULL,
--   PRIMARY KEY(internal_user_id, playlist_provider_id, track_id, start_time)
-- );

ALTER TABLE user_track
  RENAME spotify_track_id TO track_id;

ALTER TABLE user_track
  ADD COLUMN playlist_provider_id varchar NOT NULL DEFAULT 'spotify',
  DROP COLUMN spotify_track_uri,
  DROP CONSTRAINT user_track_pkey;
