SELECT 
  user_token.internal_user_id,
  input.provider_user_id,
  input.provider_id,
  user_token.expires_at,
  user_token.access_token,
  user_token.refresh_token,
  user_token.scope
FROM  
  (values
    %L
  ) as input(
    provider_user_id,
    provider_id
  )
  LEFT JOIN user_token
    ON
      user_token.provider_user_id = input.provider_user_id
      AND
      user_token.provider_id = input.provider_id;
