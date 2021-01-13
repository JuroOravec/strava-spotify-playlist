INSERT INTO 
  app_user (
    internal_user_id,
    email,
    photo,
    login_provider,
    name_display,
    name_family,
    name_given
  )
VALUES
  %L
ON CONFLICT
  DO NOTHING
RETURNING
  internal_user_id;