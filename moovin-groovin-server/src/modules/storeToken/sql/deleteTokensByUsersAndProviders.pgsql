DELETE FROM
  user_token
WHERE (
    internal_user_id,
    provider_id
  ) in ( %L )
RETURNING
  internal_user_id,
  provider_user_id,
  provider_id;
