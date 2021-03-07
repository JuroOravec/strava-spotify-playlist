INSERT INTO 
  user_activity_playlist (
    internal_user_id,
    activity_provider_id,
    activity_id,
    activity_name,
    playlist_provider_id,
    playlist_id,
    playlist_name,
    playlist_url,
    date_created,
    tracks_assigned
  )
VALUES
  %L
RETURNING
  internal_user_id,
  playlist_provider_id,
  playlist_id;
