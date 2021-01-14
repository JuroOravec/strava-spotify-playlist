SELECT
  input.internal_user_id,
  user_track.spotify_track_id,
  user_track.spotify_track_uri,
  user_track.start_time
FROM  
  (values
  	%L
  ) as input(
    internal_user_id,
    start_time_lower_bound,
    start_time_upper_bound
  )
  LEFT JOIN user_track
    ON
      user_track.internal_user_id = CAST(input.internal_user_id as uuid)
      AND
      start_time > CAST(input.start_time_lower_bound as bigint)
      AND
      start_time < CAST(input.start_time_upper_bound as bigint)
ORDER BY
  start_time ASC;
