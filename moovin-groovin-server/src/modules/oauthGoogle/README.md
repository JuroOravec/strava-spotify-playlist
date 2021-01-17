# oauthGoogle

OAuth integration with Google

## Setup

To be able to use Google login for authentication, you need to:

1. Have an app created at <https://console.developers.google.com/apis/dashboard>.

2. Update the auth client (passport) to use the app token and secret (set in .env).

3. (Maybe) Have HTTPS configured for the OAuth redirect URL. This is the endpoint that
   Google will call after either successful or failed login.

   > Note: This is true about Facebook, but haven't been tested on Google

4. Add the callback url to APIs & Services > Credentials > Authorised redirect URIs

  > To allow to access Google login page from a browser directly (not via server redirect),
    also set up APIs & Services > Credentials > Authorised JavaScript origins
