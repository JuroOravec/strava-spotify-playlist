SELECT
  app_user.internal_user_id,
  app_user.name_display,
  app_user.name_family,
  app_user.name_given,
  app_user.email,
  app_user.photo,
  app_user.login_provider
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
      user_token.provider_id = input.provider_id
  LEFT JOIN app_user
    ON
      app_user.internal_user_id = user_token.internal_user_id;
