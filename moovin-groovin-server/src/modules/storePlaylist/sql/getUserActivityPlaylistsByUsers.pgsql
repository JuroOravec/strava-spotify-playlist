SELECT
  input.internal_user_id,
  user_activity_playlist.activity_provider_id,
  user_activity_playlist.activity_id,
  user_activity_playlist.activity_name,
  user_activity_playlist.playlist_provider_id,
  user_activity_playlist.playlist_id,
  user_activity_playlist.playlist_name,
  user_activity_playlist.playlist_url,
  user_activity_playlist.date_created,
  user_activity_playlist.tracks_assigned
FROM  
  (values
    %L
  ) as input(
    internal_user_id
  )
  LEFT JOIN user_activity_playlist
    ON
      user_activity_playlist.internal_user_id = CAST(input.internal_user_id as uuid)
ORDER BY user_activity_playlist.date_created DESC;
