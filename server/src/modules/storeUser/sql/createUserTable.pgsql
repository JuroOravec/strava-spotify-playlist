CREATE TABLE IF NOT EXISTS app_user (
  internal_user_id uuid NOT NULL PRIMARY KEY,
  email varchar UNIQUE,
  name_display varchar,
  name_family varchar,
  name_given varchar,
  photo varchar,
  login_provider varchar NOT NULL
);