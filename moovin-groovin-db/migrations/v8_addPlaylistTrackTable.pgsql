CREATE TABLE IF NOT EXISTS playlist_track (
  playlist_provider_id varchar NOT NULL,
  playlist_id varchar NOT NULL,
  track_id varchar,
  start_time bigint NOT NULL,
  -- Particular track inside a particular playlist at a particulat time
  -- There may be a same track in single playlist multiple times at different start_time
  CONSTRAINT pk_playlist_track
    PRIMARY KEY(playlist_provider_id, playlist_id, track_id, start_time),
  CONSTRAINT fk_playlist
    FOREIGN KEY(playlist_provider_id, playlist_id) 
	    REFERENCES user_activity_playlist(playlist_provider_id, playlist_id)
      ON DELETE CASCADE,
  CONSTRAINT fk_track
    FOREIGN KEY(playlist_provider_id, track_id) 
	    REFERENCES track(playlist_provider_id, track_id)
      ON DELETE NO ACTION
);
