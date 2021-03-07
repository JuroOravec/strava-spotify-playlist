CREATE TABLE IF NOT EXISTS app_user (
  internal_user_id uuid NOT NULL PRIMARY KEY,
  email varchar UNIQUE,
  name_display varchar,
  name_family varchar,
  name_given varchar,
  photo varchar,
  login_provider varchar NOT NULL
);

CREATE TABLE IF NOT EXISTS user_token (
  internal_user_id uuid NOT NULL,
  provider_user_id varchar NOT NULL,
  provider_id varchar NOT NULL,
  expires_at int NOT NULL,
  access_token varchar NOT NULL,
  refresh_token varchar,
  scope varchar,
  PRIMARY KEY (provider_user_id, provider_id),
  UNIQUE (internal_user_id, provider_id),
  CONSTRAINT fk_internal_user_id
    FOREIGN KEY(internal_user_id) 
	    REFERENCES app_user(internal_user_id)
      ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS user_config (
  internal_user_id uuid NOT NULL PRIMARY KEY,
  playlist_collaborative bool NOT NULL,
  playlist_public bool NOT NULL,
  playlist_auto_create bool NOT NULL,
  playlist_description_template varchar,
  playlist_title_template varchar,
  activity_description_enabled bool NOT NULL,
  activity_description_template varchar,
  CONSTRAINT fk_internal_user_id
    FOREIGN KEY(internal_user_id) 
	    REFERENCES app_user(internal_user_id)
      ON DELETE CASCADE
);

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
