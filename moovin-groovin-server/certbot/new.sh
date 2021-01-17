# Follow this guide to add SSL certificates by Let's encrypt for nginx
# inside EC2 instance running on amazonlinux2.
#
# This guide needs to be followed only once when a new instance is provisioned.
# New deployments via CodeDeploy do not affect this.
#
# Generally, this guide follows the one from here:
# https://comtechies.com/nginx-letsencrypt-setup-guide-certbot.html
# Except that we use `yum` to install packages instead of `apt-get`.

# Let's Encrypt SSL Cert
sudo yum install -y python-certbot-nginx
sudo certbot --nginx

# Certbot will issue the certificate and print out info on where the secret keys are stored, e.g.
# /etc/letsencrypt/live/example.com/fullchain.pem
# /etc/letsencrypt/live/example.com/privkey.pem
#
# Update your nginx.conf to use the Certbot's values (make sure the domain is right)

# If you've run the above manually, don't forget to copy the updated nginx conf:
# sudo cp ~/app/moovin-groovin-server/nginx/nginx.conf /etc/nginx/nginx.conf

# After all above is done, reload nginx
# service nginx reload

# To have the cert auto-renew, add open crontab with:
# sudo crontab -e
#
# And add the following scheduled task:
# 30 2 * * Sun /usr/bin/certbot renew
# 
# The above will run certbot once a week on Sunday at 2:30 am to check if it
# needs to renew or not.
#
# For more info, see:
# - https://www.nginx.com/blog/using-free-ssltls-certificates-from-lets-encrypt-with-nginx/
# - https://medium.com/@mohan08p/install-and-renew-lets-encrypt-ssl-on-amazon-ami-6d3e0a61693

# Troubleshooting:
# - https://stackoverflow.com/questions/59525274/lets-encrypt-certbot-on-aws-linux
# - https://stackoverflow.com/questions/62617424/amazon-ec2-linux-ssl-certbot-auto-account-creation-on-acmev1-is-disabled-acmev2
# - ACM cannot be used for setting up certs from inside EC2 (https://stackoverflow.com/questions/61502474/adding-aws-public-certificate-with-nginx)
# - Common nginx commands (https://medium.com/datadriveninvestor/nginx-server-ssl-setup-on-aws-ec2-linux-b6bb454e2ef2)

# Best practices:
# - https://community.letsencrypt.org/t/certbot-auto-deployment-best-practices/91979