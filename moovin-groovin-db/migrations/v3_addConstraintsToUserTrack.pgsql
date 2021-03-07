-- -- OLD SCHEMA
-- user_track (
--   internal_user_id uuid NOT NULL,
--   playlist_provider_id varchar NOT NULL,
--   track_id varchar NOT NULL,
--   start_time bigint NOT NULL,
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
--   PRIMARY KEY(internal_user_id, playlist_provider_id, track_id, start_time),
--   CONSTRAINT fk_internal_user_id
--     FOREIGN KEY(internal_user_id) 
-- 	    REFERENCES app_user(internal_user_id)
--       ON DELETE CASCADE
-- );

ALTER TABLE user_track
  ADD CONSTRAINT pk_user_track PRIMARY KEY(
    internal_user_id,
    playlist_provider_id,
    track_id,
    start_time
  );
