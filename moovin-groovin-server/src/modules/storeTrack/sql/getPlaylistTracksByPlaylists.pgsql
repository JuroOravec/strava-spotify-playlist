SELECT 
  input.playlist_provider_id,
  input.playlist_id,
  playlist_track.track_id,
  playlist_track.start_time
FROM  
  (values
    %L
  ) as input(
    playlist_provider_id,
    playlist_id
  )
  LEFT JOIN playlist_track
    ON
      playlist_track.playlist_provider_id = input.playlist_provider_id
      AND
      playlist_track.playlist_id = input.playlist_id;
