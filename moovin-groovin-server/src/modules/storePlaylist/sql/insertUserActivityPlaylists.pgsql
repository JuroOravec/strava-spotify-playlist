INSERT INTO 
  user_activity_playlist (
    internal_user_id,
    strava_activity_id,
    spotify_playlist_id,
    spotify_playlist_uri,
    tracks_assigned
  )
VALUES
  %L
RETURNING
  internal_user_id,
  spotify_playlist_id;
