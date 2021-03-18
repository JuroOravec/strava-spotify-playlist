SELECT
  user_token.internal_user_id,
  user_token.provider_user_id,
  user_token.provider_id,
  user_token.expires_at,
  user_token.access_token,
  user_token.refresh_token,
  user_token.scope,
  user_token.extra
FROM
  user_token
WHERE
  (internal_user_id) in ( %L );
