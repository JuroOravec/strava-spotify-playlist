# stravaWebhook

## Testing Strava webhooks

Locally:

```bash
curl -X POST http://localhost:3000/api/v1/strava/webhook/callback -H 'Content-Type: application/json'  -d '{    "aspect_type": "create",      "event_time": 1615056309,      "object_id": 4635311305,     "object_type": "activity",     "owner_id": 48675283,     "subscription_id": 179134 }'
```

On prod:

```bash
curl -X POST https://api.moovingroovin.com/api/v1/strava/webhook/callback -H 'Content-Type: application/json'  -d '{    "aspect_type": "create",      "event_time": 1549560669,      "object_id": 4635311305,     "object_type": "activity",     "owner_id": 48675283,     "subscription_id": 179134 }'
```
