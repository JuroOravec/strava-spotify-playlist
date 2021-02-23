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

## Web server cookies (session)

See this _amazing_ guide on what are, why, and how to set up cookies for websites

- [Node.js Server & Authentication Basics: Express, Sessions, Passport, and cURL](https://medium.com/@evangow/server-authentication-basics-express-sessions-passport-and-curl-359b7456003d)

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

## AWS Deployment - CodePipeline

CodePipeline is the pipeline that's triggered periodically or on sourc code change, similar to
Jenkins or Travis.

The pipeline can be triggered on source code change (e.g. S3 or GitHub)
on schedule, or manually.

The pipeline can test, build and deploy the app. To deploy an app onto EC2, CodePipeline can delegate to CodeDeploy.

Currently, CodePipeline is used for auto-deployment on source code change by triggering CodeDeploy.

Following guides cover the setup process:

- [Deploying code from GitHub to AWS EC2 with CodePipeline](https://dev.to/nhadiq97/deploying-code-from-github-to-aws-ec2-with-codepipeline-22h6)

To trigger a pipeline manually, navigate to <https://eu-central-1.console.aws.amazon.com/codesuite/codepipeline/pipelines/StravaSpotifyPlaylist> and click on "Release Change"

---

## AWS Deployment - CodeDeploy

CodeDeploy "deploys" the app, meaning that:

Given source files to your app, CodeDeploy can carry out necessary steps with the source
and the instance environment so that an app can start running based on the source files

Following guides cover the setup process:

- [Continuous deployment from Github to AWS EC2 using AWS CodeDeploy](https://www.fastfwd.com/continuous-deployment-github-aws-ec2-using-aws-codedeploy/)
- [Continuous Deployment with AWS CodeDeploy & Github](https://hackernoon.com/continuous-deployment-with-aws-codedeploy-github-d1eb97550b82)
- [Tutorial: Use CodeDeploy to deploy an application from GitHub](https://docs.aws.amazon.com/codedeploy/latest/userguide/tutorials-github.html)
- [Create an Amazon EC2 instance for CodeDeploy (AWS CLI or Amazon EC2 console)](https://docs.aws.amazon.com/codedeploy/latest/userguide/instances-ec2-create.html)
- [Getting started with CodeDeploy](https://docs.aws.amazon.com/codedeploy/latest/userguide/getting-started-codedeploy.html)

> NOTE: The guides above are outdated and the auto-deployment steps are invalid.
>
> To auto-deploy an app after pushing changes to GitHub repo, use AWS CodePipeline. See following guide:
>
> - [Deploying code from GitHub to AWS EC2 with CodePipeline](https://dev.to/nhadiq97/deploying-code-from-github-to-aws-ec2-with-codepipeline-22h6)

To trigger a deploy of a specific commit manually:

1. navigate to <https://eu-central-1.console.aws.amazon.com/codesuite/codedeploy/applications/>
2. Select the right application (StravaSpotifyPlaylist)
3. Open Deployments tab
4. Click on the last deployment and click on Clone Deployment

   OR

   Click on Create Deployment and fill in details.

5. Copy-paste into the Commit ID field the ID of the latest (or desired) commit that should be deployed.
6. In "Additional deployment behavior settings" > "Content options - optional", select "Overwrite the content".
7. Confirm with "Create Deployment".
8. If there are any deployment errors, then to see them, navigate in current Deployment to "Deployment lifecycle events", and click on "View events" of the entry that failed.

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

## AWS Deployment - Static website with S3, CloudFront and Route 53

Since the website communicates with the server, all we need is to get the static
files out into the world (ideally behind HTTPS, and cached).

Following articles sum it up perfectly:

- [Setting up an HTTPS static site using AWS S3 and Cloudfront (and also Jekyll and s3_website)](https://www.alexejgossmann.com/AWS_S3_and_CloudFront/)
- [UPDATED: Deploying a static site to AWS using GitHub Actions](https://www.timveletta.com/blog/2020-08-14-updated-deploying-a-static-site-to-aws-using-github-actions/)

For next time, it might be useful to give this one a go:

- [Reddit: I built a GitHub Action that deploys static sites to Cloudfront](https://www.reddit.com/r/aws/comments/ja1k9g/i_built_a_github_action_that_deploys_static_sites/)

Redirecting non-root URLs to avoid 404s and 403s and instead handle the invalid path inside Single-Page App:

- [Using AWS CloudFront to serve an SPA hosted on S3](https://johnlouros.com/blog/using-CloudFront-to-serve-an-SPA-from-S3)

### Troubleshooting

- Issue: Access Denied
  - [AWS' troubleshooting page](https://aws.amazon.com/premiumsupport/knowledge-center/s3-website-cloudfront-error-403/)
  - Check that the item you are trying to access are set to be publicly read
  - If this happened after syncing files from GitHub (or elsewhere):
    - Check that you have the correct permissions allowed
      ([example 1](https://github.com/laurilehmijoki/s3_website/blob/master/additional-docs/setting-up-aws-credentials.md),
      [example 2](https://github.com/jakejarvis/s3-sync-action/issues/10))
    - Check that the integration has set the correct ACL (`public-read` is on).
      [See here the reference of available options to the `aws s3 sync` command.](https://docs.aws.amazon.com/cli/latest/reference/s3/sync.html)

Since the website communicates with the server, all we need is to get the static
files out into the world (ideally behind HTTPS, and cached).

Following articles sum it up perfectly:

- [Setting up an HTTPS static site using AWS S3 and Cloudfront (and also Jekyll and s3_website)](https://www.alexejgossmann.com/AWS_S3_and_CloudFront/)

For next time, it might be useful to give this one a go:

- [Reddit: I built a GitHub Action that deploys static sites to Cloudfront](https://www.reddit.com/r/aws/comments/ja1k9g/i_built_a_github_action_that_deploys_static_sites/)

## Donating

Frontend is using [BuyMeACoffee](https://www.buymeacoffee.com) for the option to add donate buttons.

[See the dashboard](https://www.buymeacoffee.com/dashboard).

## Analytics

Frontend and backend use [Mixpanel](https://mixpanel.com/) for usage analytics with `analytics` npm package as an event bus
for analytics-related events.

[See the dashboard](https://eu.mixpanel.com/report/2313715/view/2859695/insights).

## Error monitoring

Frontend and backend use [Sentry](https://sentry.io/) for capturing errors.

[See the dashboard](https://sentry.io/organizations/juro-oravec/issues/?project=5641806).

## Newsletter

Newsletter is provided by MailerLite.

The in-app signup form is based on a form created in MailerLite (e.g. <https://app.mailerlite.com/forms/view/3612901#embed-code>), from which the form HTML was taken and adapted to work in Vue.

Singup process is double opt-in flow.

[See the dashboard](https://app.mailerlite.com/dashboard).

## Receiving emails

To be able to sign up for MailerLite, I had to have an email with the same domain as where the app is (moovingroovin.com).

To avoid paying for a mail server or running one myself on an EC2, a flow using [SES and SNS](https://docs.aws.amazon.com/ses/latest/DeveloperGuide/configure-sns-notifications.html) is used:

Sender -> send to name@mydomain.com -> SES triggers SNS topic with email content -> SNS processes the topic and sends email to subscribers of that topic (personal email) -> Me

1. A [topic in Amazon Simple Notification Service](https://eu-west-1.console.aws.amazon.com/sns/v3/home?region=eu-west-1#/topics) is created. This topic sends UTF-8 encoded emails to its subscribers.
   - I want to receive emails to my personal email, so I've subscribed to this email with it.
   - [How to subscribe to SNS](https://docs.aws.amazon.com/sns/latest/dg/sns-email-notifications.html)
   - [On email options](https://docs.aws.amazon.com/ses/latest/DeveloperGuide/receiving-email-action-sns.html)

2. A [rule set is configured on Amazon Simple Email Service](https://eu-west-1.console.aws.amazon.com/ses/home?region=eu-west-1#receipt-rules:) to receive emails on particular addresses (e.g. no-reply@mydomain.com and juro@mydomain.com). This ruleset triggers SNS topic defined in previous step when an email is received.
   - [How to](https://docs.aws.amazon.com/ses/latest/DeveloperGuide/receiving-email.html?icmpid=docs_ses_console)
   - [Another guide](https://medium.com/responsetap-engineering/easily-create-email-addresses-for-your-route53-custom-domain-589d099dd0f2)

NOTE: SES mail receiving is available only on the Ireland region in EU.
