# We assume the `new.sh` has been run before this one, and hence:
# - The instance has certbot installed
# - The instance has a cert issued for your domain

# Certbot will issue the certificate and print out info on where the secret keys are stored, e.g.
# /etc/letsencrypt/live/example.com/fullchain.pem
# /etc/letsencrypt/live/example.com/privkey.pem
#
# Update your nginx.conf to use the Certbot's values (make sure the domain is right)

# If you've run the above manually, don't forget to copy the updated nginx conf:
# sudo cp ~/app/server/nginx/nginx.conf /etc/nginx/nginx.conf