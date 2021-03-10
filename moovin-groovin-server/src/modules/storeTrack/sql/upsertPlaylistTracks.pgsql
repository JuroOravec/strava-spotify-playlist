INSERT INTO 
  playlist_track (
    playlist_provider_id,
    playlist_id,
    track_id,
    start_time
  )
VALUES
  %L
ON CONFLICT (
  playlist_provider_id,
  playlist_id,
  track_id,
  start_time
)
DO NOTHING
RETURNING
  playlist_provider_id,
  playlist_id,
  track_id,
  start_time;
