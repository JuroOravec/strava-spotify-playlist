UPDATE
  user_config
SET
  -- Update field or reassign current value
  playlist_collaborative = COALESCE(
    input.playlist_collaborative,
    user_config.playlist_collaborative
  ),
  playlist_public = COALESCE(
    input.playlist_public,
    user_config.playlist_public
  ),
  playlist_description_template = COALESCE(
    input.playlist_description_template,
    user_config.playlist_description_template
  ),
  playlist_title_template = COALESCE(
    input.playlist_title_template,
    user_config.playlist_title_template
  ),
  activity_description_template = COALESCE(
    input.activity_description_template,
    user_config.activity_description_template
  )
FROM
  (values
    %L
  ) as input(
    internal_user_id,
    playlist_collaborative,
    playlist_public,
    playlist_description_template,
    playlist_title_template,
    activity_description_template
  )
WHERE
  user_config.internal_user_id = CAST(input.internal_user_id as uuid)
  AND
  -- Do the update only if we actually have something to update.
  -- See https://stackoverflow.com/a/13943827/9788634
  (
    (input.playlist_collaborative IS NOT NULL AND input.playlist_collaborative IS DISTINCT FROM user_config.playlist_collaborative) OR
    (input.playlist_public IS NOT NULL AND input.playlist_public IS DISTINCT FROM user_config.playlist_public) OR
    (input.playlist_description_template IS NOT NULL AND input.playlist_description_template IS DISTINCT FROM user_config.playlist_description_template) OR
    (input.playlist_title_template IS NOT NULL AND input.playlist_title_template IS DISTINCT FROM user_config.playlist_title_template) OR
    (input.activity_description_template IS NOT NULL AND input.activity_description_template IS DISTINCT FROM user_config.activity_description_template)
  )
RETURNING
  user_config.internal_user_id;