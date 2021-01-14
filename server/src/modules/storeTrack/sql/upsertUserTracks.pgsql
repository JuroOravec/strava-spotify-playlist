INSERT INTO 
  user_track (
    internal_user_id,
    spotify_track_id,
    spotify_track_uri,
    start_time
  )
VALUES
  %L
ON CONFLICT (
  internal_user_id,
  spotify_track_id,
  start_time
)
DO NOTHING
RETURNING
  internal_user_id,
  spotify_track_uri,
  start_time;
