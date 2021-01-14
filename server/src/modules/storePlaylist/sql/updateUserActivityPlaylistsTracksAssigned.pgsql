UPDATE
  user_activity_playlist
SET
  -- Update field or reassign current value
  tracks_assigned = COALESCE(
    CAST(input.tracks_assigned AS BOOLEAN),
    user_activity_playlist.tracks_assigned
  )
FROM
  (values
    %L
  ) as input(
    spotify_playlist_id,
    tracks_assigned
  )
WHERE
  user_activity_playlist.spotify_playlist_id = input.spotify_playlist_id
  AND
  -- Do the update only if we actually have something to update.
  -- See https://stackoverflow.com/a/13943827/9788634
  (input.tracks_assigned IS NOT NULL AND CAST(input.tracks_assigned AS BOOLEAN) IS DISTINCT FROM user_activity_playlist.tracks_assigned)
RETURNING
  user_activity_playlist.internal_user_id,
  user_activity_playlist.spotify_playlist_id;