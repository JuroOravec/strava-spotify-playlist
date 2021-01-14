SELECT 
  input.internal_user_id,
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
    internal_user_id
  )
  LEFT JOIN app_user
    ON
      app_user.internal_user_id = CAST(input.internal_user_id as uuid);
