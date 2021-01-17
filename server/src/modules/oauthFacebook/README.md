# oauthFacebook

OAuth integration with Facebook

## Setup

To be able to use Facebook login for authentication, you need to:

1. Have an app created at <https://developers.facebook.com/apps>.

2. Update the auth client (passport) to use the app token and secret (set in .env).

3. Have HTTPS configured for the OAuth redirect URL. This is the endpoint that
   Facebook will call after either successful or failed login.

4. Add the callback url to Products > Facebook login > Settings > Valid OAuth
   Redirect URIs
