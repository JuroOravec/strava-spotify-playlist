# moovin-groovin

## Strava

Strava dev docs at [developers.strava.com](https://developers.strava.com/docs/reference).

## Spotify

Spotify dev docs at [developer.spotify.com](https://developer.spotify.com/documentation/web-api/reference-beta).

---

## Postgress

[PostgresTutorial](https://www.postgresqltutorial.com/) is perfect resource.

Prefer to write queries that can fetch many results.

Prefer to set the client wrappers to return results in the same order as the input, or `null` if none found.

Prefer to format postgres queries using `pg-format` before passing them to postgres client.

---

## AWS Deployment - Basic concepts

Abbreviations:

- EC2 - Server
- RDS - Relational database service

To allow services (EC2, RDS) to communicate with other services or the world (outbound)
or receive requests (inbound), you need to set up correct
[Security Group](https://eu-central-1.console.aws.amazon.com/ec2/v2/home?region=eu-central-1#SecurityGroups)
-- [example](https://eu-central-1.console.aws.amazon.com/ec2/v2/home?region=eu-central-1#SecurityGroup:group-id=sg-0cd600ca0cbbc907f).

To allow certain services / tools to interact with AWS API,
you need to grant them the right Roles (user group). Each Role has certain Policies (permissions)
associated with it. E.g. to allow EC2 to get files from S3, we need to create (or use existing) Role
that has read S3 Policy ([example](https://console.aws.amazon.com/iam/home?region=eu-central-1#/roles/EC2S3Role)).

To integrate deployment with source control manager, we can use CodeDeploy.

To have a service to sit behind a domain, we use Route 53.

---

## AWS Deployment - EC2

### Connecting

[Connect to EC2 instance using SSH](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/AccessingInstances.html?icmpid=docs_ec2_console)
([this one for Linux specifically](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/AccessingInstancesLinux.html)).

#### Troubleshooting

- `WARNING: UNPROTECTED PRIVATE KEY FILE! when trying to SSH into Amazon EC2 Instance`
  - **Solution:** [Set stricter permissions for the .pem file](https://stackoverflow.com/questions/201893/warning-unprotected-private-key-file-when-trying-to-ssh-into-amazon-ec2-instan).
- `EC2 ssh Permission denied (publickey,gssapi-keyex,gssapi-with-mic)`
  - **Solution:** [Set the .pem file permissions and check that you are trying to connect using a correct username](https://stackoverflow.com/questions/33991816/ec2-ssh-permission-denied-publickey-gssapi-keyex-gssapi-with-mic)

### Setting up EC2 env

Guides:

- [Node app with Nginx on Amazon EC2](https://regbrain.com/article/node-nginx-ec2)
- [How to Set up and Deploy a Node.js/Express Application for Production](https://deploybot.com/blog/guest-post-how-to-set-up-and-deploy-nodejs-express-application-for-production)

### Process manager

To manage app processes, use `pm2` (see [docs](https://pm2.keymetrics.io/docs/usage/pm2-doc-single-page/)).

See example in [Node app with Nginx on Amazon EC2](https://regbrain.com/article/node-nginx-ec2)
or [How to Set up and Deploy a Node.js/Express Application for Production](https://deploybot.com/blog/guest-post-how-to-set-up-and-deploy-nodejs-express-application-for-production).

Find [guides like this](https://futurestud.io/tutorials/pm2-cluster-mode-and-zero-downtime-restarts) at [https://futurestud.io/tutorials/](https://futurestud.io/tutorials/)

Start node app with `pm2`

```sh
# Run on all available cores
pm2 start dist/index.js -i 0 --name="moovin-groovin"
```

Stop node app with `pm2`:

```sh
pm2 del moovin-groovin
```

Stream logs of running processes:

```sh
pm2 log
```

---

## AWS Deployment - CodeDeploy

### Setting up `appspec.yml`

[Spec example](https://stackoverflow.com/questions/34032751/npm-issue-deploying-a-nodejs-instance-using-aws-codedeploy).

### Hooks

[All available hooks](https://docs.aws.amazon.com/codedeploy/latest/userguide/reference-appspec-file-structure-hooks.html).

Important hooks:

- `BeforeInstall` - OS setup before git files are downloaded -- prepare env
- `AfterInstall` - OS setup after git files are downloaded -- prepare env with info from git files
- `ApplicationStart` - Commands to start the application.
- `ApplicationStop` - Commands to gracefully stop the application.

### Troubleshooting

- Unexpected errors - [Ensure the appspec.yml hooks always `cd` to the app dir](https://stackoverflow.com/questions/34032751/npm-issue-deploying-a-nodejs-instance-using-aws-codedeploy).

---

## AWS Deployment - EC2 Routing

When you run a server on EC2, it will be publicly available through a url like ec2-18-197-19-192.eu-central-1.compute.amazonaws.com:3000

### Internal reverse proxy

Enable server to be accessible via default ports (:80, :443) instead of :3000 by [setting up nginx in EC2](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/routing-to-ec2-instance.html).

Thus, the server can be accessed via ec2-18-197-19-192.eu-central-1.compute.amazonaws.com (without the port).

### Set up IP domain

1. Get a domain via AWS's Routee 53 or NameCheap.

2. Follow this guide to [Routing traffic to an Amazon EC2 instance](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/routing-to-ec2-instance.html).

Thus, the server can be accessed via e.g. api.yourfavedomain.com
