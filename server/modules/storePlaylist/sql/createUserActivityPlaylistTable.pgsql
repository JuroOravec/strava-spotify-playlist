CREATE TABLE IF NOT EXISTS user_activity_playlist (
  internal_user_id uuid NOT NULL,
  strava_activity_id varchar NOT NULL UNIQUE,
  spotify_playlist_id varchar NOT NULL PRIMARY KEY,
  spotify_playlist_uri varchar NOT NULL,
  tracks_assigned boolean NOT NULL DEFAULT FALSE,
  UNIQUE(internal_user_id, strava_activity_id),
  CONSTRAINT fk_internal_user_id
    FOREIGN KEY(internal_user_id) 
	    REFERENCES app_user(internal_user_id)
      ON DELETE CASCADE
);