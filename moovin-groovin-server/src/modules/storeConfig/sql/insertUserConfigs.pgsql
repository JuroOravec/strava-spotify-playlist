INSERT INTO 
  user_config (
    internal_user_id,
    playlist_collaborative,
    playlist_public,
    playlist_auto_create,
    playlist_description_template,
    playlist_title_template,
    activity_description_template
  )
VALUES
  %L
ON CONFLICT (internal_user_id)
  DO NOTHING
RETURNING
  internal_user_id;