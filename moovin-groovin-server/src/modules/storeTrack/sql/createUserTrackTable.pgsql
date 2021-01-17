CREATE TABLE IF NOT EXISTS user_track (
  internal_user_id uuid NOT NULL,
  spotify_track_id varchar NOT NULL,
  spotify_track_uri varchar NOT NULL,
  start_time bigint NOT NULL,
  PRIMARY KEY(internal_user_id, spotify_track_id, start_time),
  CONSTRAINT fk_internal_user_id
    FOREIGN KEY(internal_user_id) 
	    REFERENCES app_user(internal_user_id)
      ON DELETE CASCADE
);