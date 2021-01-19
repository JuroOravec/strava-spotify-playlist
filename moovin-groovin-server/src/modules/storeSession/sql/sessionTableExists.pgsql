-- TODO: Remove in connect-pg-simple v7
-- Current version doesn't support CREATE TABLE IF NOT EXIST, so we have to check ourselves.

-- Query taken from https://stackoverflow.com/a/24089729/9788634
SELECT to_regclass('user_config') as table_exists;