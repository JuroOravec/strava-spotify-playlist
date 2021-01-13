DELETE FROM
  user_activity_playlist
WHERE (
  internal_user_id,
  strava_activity_id
) in ( %L )
RETURNING
  internal_user_id,
  spotify_playlist_id;