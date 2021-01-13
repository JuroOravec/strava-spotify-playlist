INSERT INTO 
  user_token (
    internal_user_id,
    provider_user_id,
    provider_id,
    expires_at,
    access_token,
    refresh_token,
    scope
  )
VALUES
  %L
ON CONFLICT (provider_user_id, provider_id)
  DO UPDATE
    SET
      -- Update field or reassign current value
      expires_at = COALESCE(EXCLUDED.expires_at, user_token.expires_at),
      access_token = COALESCE(EXCLUDED.access_token, user_token.access_token),
      refresh_token = COALESCE(EXCLUDED.refresh_token, user_token.refresh_token),
      scope = COALESCE(EXCLUDED.scope, user_token.scope)
RETURNING
  internal_user_id,
  provider_user_id,
  provider_id;
