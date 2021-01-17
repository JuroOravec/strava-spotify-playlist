-- Given a start token known by "provider_user_id" and "provider_id",
-- find a target token of a particular "provider_id" that is associated
-- with the same user as the start token.

SELECT
  target_token.internal_user_id,
  target_token.provider_user_id,
  target_token.provider_id,
  target_token.expires_at,
  target_token.access_token,
  target_token.refresh_token,
  target_token.scope
FROM  
  (values
    %L
  ) as input(
    start_token_provider_user_id,
    start_token_provider_id,
    target_token_provider_id
  )
  LEFT JOIN user_token start_token
    ON
      start_token.provider_user_id = input.start_token_provider_user_id
      AND
      start_token.provider_id = input.start_token_provider_id
  LEFT JOIN user_token target_token
    ON
      target_token.internal_user_id = start_token.internal_user_id
      AND
      target_token.provider_id = target_token_provider_id;
