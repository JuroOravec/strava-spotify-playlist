SELECT 
  input.playlist_provider_id,
  input.track_id,
  track.title,
  track.album,
  track.artist,
  track.duration
FROM  
  (values
    %L
  ) as input(
    playlist_provider_id,
    track_id
  )
  LEFT JOIN track
    ON
      track.playlist_provider_id = input.playlist_provider_id
      AND
      track.track_id = input.track_id;
