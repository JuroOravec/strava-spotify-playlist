DELETE FROM
  user_activity_playlist
WHERE (
  internal_user_id,
  activity_provider_id,
  activity_id
) in ( %L )
RETURNING
  internal_user_id,
  playlist_provider_id,
  playlist_id;
