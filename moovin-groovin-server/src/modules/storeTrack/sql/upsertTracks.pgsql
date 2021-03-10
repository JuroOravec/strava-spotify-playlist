INSERT INTO 
  track (
    playlist_provider_id,
    track_id,
    title,
    album,
    artist,
    duration
  )
VALUES
  %L
ON CONFLICT (
  playlist_provider_id,
  track_id
)
DO NOTHING
RETURNING
  playlist_provider_id,
  track_id;
