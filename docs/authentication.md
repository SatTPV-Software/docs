---
title: Authentication
description: How to authenticate against the SatTPV API using Bearer tokens — login endpoint, token lifetime and request headers.
---

# Authentication

The SatTPV API uses **Bearer tokens** for authentication. You exchange your SatTPV username and password for a token, and you then attach that token to every subsequent request.

::: info One token, many requests
A token is valid for at least **8 hours**. Do **not** call the login endpoint before every request — cache the token and reuse it. Re-authenticate only when the token expires (you receive an HTTP `401`).
:::

## Login

Send your credentials to the authentication endpoint to receive a token.

- **URL:** `https://api-v3.sattpv.net/auth/login`
- **Method:** `POST`

### Parameters

Send the parameters in the request body (`application/json` or `application/x-www-form-urlencoded`).

| Key        | Description                                | Type   | Required |
| ---------- | ------------------------------------------ | ------ | :------: |
| `username` | Your SatTPV account username or email.     | string |   Yes    |
| `pass`     | The password associated with the account.  | string |   Yes    |

### Request

::: code-group

```bash [cURL]
curl -X POST 'https://api-v3.sattpv.net/auth/login' \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -d '{
    "username": "YOUR_USERNAME",
    "pass": "YOUR_PASSWORD"
  }'
```

```js [JavaScript]
const response = await fetch('https://api-v3.sattpv.net/auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  body: JSON.stringify({
    username: 'YOUR_USERNAME',
    pass: 'YOUR_PASSWORD',
  }),
});

const json = await response.json();
const token = json.data.token; // "Bearer ..."
```

```php [PHP]
<?php
$payload = json_encode([
    'username' => 'YOUR_USERNAME',
    'pass'     => 'YOUR_PASSWORD',
]);

$ch = curl_init('https://api-v3.sattpv.net/auth/login');
curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST           => true,
    CURLOPT_POSTFIELDS     => $payload,
    CURLOPT_HTTPHEADER     => [
        'Content-Type: application/json',
        'Accept: application/json',
    ],
]);

$response = curl_exec($ch);
curl_close($ch);

$json  = json_decode($response, true);
$token = $json['data']['token']; // "Bearer ..."
```

```python [Python]
import requests

response = requests.post(
    'https://api-v3.sattpv.net/auth/login',
    json={
        'username': 'YOUR_USERNAME',
        'pass': 'YOUR_PASSWORD',
    },
    headers={'Accept': 'application/json'},
)

token = response.json()['data']['token']  # "Bearer ..."
```

:::

### Response

```json
{
    "status": "success",
    "code": 200,
    "data": {
        "token": "............................"
    }
}
```

The `token` field contains the raw token only — it does **not** include the `Bearer ` prefix. Prepend `Bearer ` yourself when building the `Authorization` header (see [Using the token](#using-the-token)).

## Using the token

Attach the token to the `Authorization` header of every request to `https://api-v3.sattpv.net`:

```http
Authorization: Bearer <your-token>
Content-Type: application/json
Accept: application/json
```

::: code-group

```bash [cURL]
curl 'https://api-v3.sattpv.net/customers' \
  -H 'Authorization: Bearer YOUR_TOKEN' \
  -H 'Accept: application/json'
```

```js [JavaScript]
const response = await fetch('https://api-v3.sattpv.net/customers', {
  headers: {
    'Authorization': `Bearer ${token}`,
    'Accept': 'application/json',
  },
});
```

```php [PHP]
<?php
$ch = curl_init('https://api-v3.sattpv.net/customers');
curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_HTTPHEADER     => [
        'Authorization: Bearer ' . $token,
        'Accept: application/json',
    ],
]);
$response = curl_exec($ch);
curl_close($ch);
```

```python [Python]
import requests

response = requests.get(
    'https://api-v3.sattpv.net/customers',
    headers={
        'Authorization': f'Bearer {token}',
        'Accept': 'application/json',
    },
)
```

:::

## Caching the token

Your token is valid for **at least 8 hours**. Hitting `/auth/login` for every API call is unnecessary, slow and may trigger rate limits. Store the token somewhere persistent (database, Redis, file with TTL, environment variable refreshed by a cron job…) and reuse it.

The general pattern looks like this:

```text
function getToken():
    if cached_token exists AND cached_token.expires_at > now:
        return cached_token.value

    response = POST /auth/login (username, pass)
    cached_token.value      = response.data.token
    cached_token.expires_at = now + 8 hours
    return cached_token.value
```

### Example: caching in a file (PHP)

```php
<?php
function sattpvToken(): string
{
    $cacheFile = __DIR__ . '/sattpv_token.json';
    $ttl       = 8 * 60 * 60; // 8 hours

    if (is_file($cacheFile)) {
        $cache = json_decode(file_get_contents($cacheFile), true);
        if (($cache['expires_at'] ?? 0) > time()) {
            return $cache['token'];
        }
    }

    $payload = json_encode([
        'username' => getenv('SATTPV_USERNAME'),
        'pass'     => getenv('SATTPV_PASSWORD'),
    ]);

    $ch = curl_init('https://api-v3.sattpv.net/auth/login');
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POST           => true,
        CURLOPT_POSTFIELDS     => $payload,
        CURLOPT_HTTPHEADER     => ['Content-Type: application/json'],
    ]);
    $json  = json_decode(curl_exec($ch), true);
    curl_close($ch);

    $token = $json['data']['token'];

    file_put_contents($cacheFile, json_encode([
        'token'      => $token,
        'expires_at' => time() + $ttl,
    ]));

    return $token;
}
```

## Token expiration

When a request returns:

```json
{
    "status": "error",
    "code": 401,
    "message": "Invalid or expired token"
}
```

the token is no longer usable. Discard the cached token, request a new one and retry the original request once.
