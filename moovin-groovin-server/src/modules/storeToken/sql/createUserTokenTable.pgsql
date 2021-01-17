CREATE TABLE IF NOT EXISTS user_token (
  internal_user_id uuid NOT NULL,
  provider_user_id varchar NOT NULL,
  provider_id varchar NOT NULL,
  expires_at int NOT NULL,
  access_token varchar NOT NULL,
  refresh_token varchar,
  scope varchar,
  PRIMARY KEY (provider_user_id, provider_id),
  UNIQUE (internal_user_id, provider_id),
  CONSTRAINT fk_internal_user_id
    FOREIGN KEY(internal_user_id) 
	    REFERENCES app_user(internal_user_id)
      ON DELETE CASCADE
);