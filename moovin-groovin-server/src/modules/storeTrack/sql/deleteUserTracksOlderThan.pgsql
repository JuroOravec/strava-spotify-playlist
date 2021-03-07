-- //TODO Add support for array of inputs (using GREATEST?)
DELETE FROM
  user_track
WHERE
  start_time < %L
RETURNING
  internal_user_id,
  playlist_provider_id,
  track_id,
  start_time;
