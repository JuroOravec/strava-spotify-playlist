SELECT
  input.internal_user_id,
  user_config.playlist_collaborative,
  user_config.playlist_public,
  user_config.playlist_description_template,
  user_config.playlist_title_template,
  user_config.activity_description_template
FROM  
  (values
    %L
  ) as input(internal_user_id)
  LEFT JOIN user_config
    ON user_config.internal_user_id = CAST(input.internal_user_id as uuid);
