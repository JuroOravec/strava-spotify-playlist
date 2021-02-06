CREATE TABLE IF NOT EXISTS user_config (
  internal_user_id uuid NOT NULL PRIMARY KEY,
  playlist_collaborative bool NOT NULL,
  playlist_public bool NOT NULL,
  playlist_auto_create bool NOT NULL,
  playlist_description_template varchar,
  playlist_title_template varchar,
  activity_description_template varchar,
  CONSTRAINT fk_internal_user_id
    FOREIGN KEY(internal_user_id) 
	    REFERENCES app_user(internal_user_id)
      ON DELETE CASCADE
);