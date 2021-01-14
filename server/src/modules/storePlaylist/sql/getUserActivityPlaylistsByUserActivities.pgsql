SELECT
  input.internal_user_id,
  input.strava_activity_id,
  user_activity_playlist.spotify_playlist_id,
  user_activity_playlist.spotify_playlist_uri,
  user_activity_playlist.tracks_assigned
FROM  
  (values
    %L
  ) as input(
    internal_user_id,
    strava_activity_id
  )
  LEFT JOIN user_activity_playlist
    ON
      user_activity_playlist.internal_user_id = CAST(input.internal_user_id as uuid)
      AND
      user_activity_playlist.strava_activity_id = input.strava_activity_id;