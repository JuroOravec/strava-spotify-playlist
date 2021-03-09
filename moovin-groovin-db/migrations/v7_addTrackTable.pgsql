CREATE TABLE IF NOT EXISTS track (
  playlist_provider_id varchar NOT NULL,
  track_id varchar NOT NULL,
  title varchar,
  album varchar,
  artist varchar,
  duration bigint,
  CONSTRAINT pk_track
    PRIMARY KEY(playlist_provider_id, track_id)
);
