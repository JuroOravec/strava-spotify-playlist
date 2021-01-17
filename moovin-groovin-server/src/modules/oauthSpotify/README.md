# oauthSpotify

OAuth integration with Spotify

## Setup

To be able to use Spotify login for authentication, you need to:

1. Have an app created at <https://developer.spotify.com/dashboard/applications>.

2. Update the auth client (passport) to use the app token and secret (set in .env).

3. (Maybe) Have HTTPS configured for the OAuth redirect URL. This is the endpoint that
   Spotify will call after either successful or failed login.

   > Note: This is true about Facebook, but haven't been tested on Spotify

4. Add the callback url to ${YourFaveApp} > Edit Settings > Redirect URIs
