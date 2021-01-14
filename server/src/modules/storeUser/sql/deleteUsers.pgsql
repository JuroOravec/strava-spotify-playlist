DELETE FROM
  app_user
WHERE (
    internal_user_id,
  ) in ( %L )
RETURNING
  internal_user_id;
