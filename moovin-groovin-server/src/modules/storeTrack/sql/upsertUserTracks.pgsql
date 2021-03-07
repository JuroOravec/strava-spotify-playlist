INSERT INTO 
  user_track (
    internal_user_id,
    playlist_provider_id,
    track_id,
    start_time
  )
VALUES
  %L
ON CONFLICT (
  internal_user_id,
  playlist_provider_id,
  track_id,
  start_time
)
DO NOTHING
RETURNING
  internal_user_id,
  playlist_provider_id,
  track_id,
  start_time;
