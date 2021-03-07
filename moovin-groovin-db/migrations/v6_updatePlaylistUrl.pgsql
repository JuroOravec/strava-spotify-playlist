-- Change spotify_playlist_uri to spotify URLs
-- ex: 7uZTf1Ryng1wAxadri77OM -> https://open.spotify.com/playlist/7uZTf1Ryng1wAxadri77OM
-- https://stackoverflow.com/a/15293873/9788634
-- https://stackoverflow.com/a/4791095/9788634
UPDATE user_activity_playlist
  SET playlist_url = regexp_replace(playlist_url, '^.*:', 'https://open.spotify.com/playlist/');
