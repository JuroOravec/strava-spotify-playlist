UPDATE
  user_activity_playlist
SET
  -- Update field or reassign current value
  activity_name = COALESCE(
    input.activity_name,
    user_activity_playlist.activity_name
  ),
  playlist_name = COALESCE(
    input.playlist_name,
    user_activity_playlist.playlist_name
  ),
  playlist_url = COALESCE(
    input.playlist_url,
    user_activity_playlist.playlist_url
  ),
  date_created = COALESCE(
    CAST(input.date_created AS BIGINT),
    user_activity_playlist.date_created
  ),
  tracks_assigned = COALESCE(
    CAST(input.tracks_assigned AS BOOLEAN),
    user_activity_playlist.tracks_assigned
  )
FROM
  (values
    %L
  ) as input(
    playlist_provider_id,
    playlist_id,
    activity_name,
    playlist_name,
    playlist_url,
    date_created,
    tracks_assigned
  )
WHERE
  user_activity_playlist.playlist_id = input.playlist_id
  AND
  -- Do the update only if we actually have something to update.
  -- See https://stackoverflow.com/a/13943827/9788634
  (
    (input.activity_name IS NOT NULL AND input.activity_name IS DISTINCT FROM user_activity_playlist.activity_name) OR
    (input.playlist_name IS NOT NULL AND input.playlist_name IS DISTINCT FROM user_activity_playlist.playlist_name) OR
    (input.playlist_url IS NOT NULL AND input.playlist_url IS DISTINCT FROM user_activity_playlist.playlist_url) OR
    (input.date_created IS NOT NULL AND CAST(input.date_created AS BIGINT) IS DISTINCT FROM user_activity_playlist.date_created) OR
    (input.tracks_assigned IS NOT NULL AND CAST(input.tracks_assigned AS BOOLEAN) IS DISTINCT FROM user_activity_playlist.tracks_assigned)
  )
RETURNING
  user_activity_playlist.internal_user_id,
  user_activity_playlist.playlist_provider_id,
  user_activity_playlist.playlist_id;
