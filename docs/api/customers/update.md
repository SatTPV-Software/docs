---
title: Update customer
description: PUT /customers/{id} — update an existing customer. Only the fields sent in the request body are modified.
---

# Update customer

Update an existing customer. Send only the fields you want to change.

- **URL:** `https://api-v3.sattpv.net/customers/{id}`
- **Method:** `PUT`

## Parameters

The customer identifier is sent in the URL. Send the fields to update as a **JSON body** — every body field is optional.

| Key  | Description                          | Type    | Required |
| ---- | ------------------------------------ | ------- | :------: |
| `id` | Customer identifier (URL path).      | integer |   Yes    |

The accepted body fields are the same as in [Create customer](/api/customers/create#parameters). Any field that is not sent keeps its current value.

## Request

::: code-group

```bash [cURL]
curl -X PUT 'https://api-v3.sattpv.net/customers/2474762' \
  -H 'Authorization: Bearer YOUR_TOKEN' \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -d '{
    "phone": "699111222",
    "details": "Updated via API"
  }'
```

```js [JavaScript]
const id = 2474762;

const response = await fetch(`https://api-v3.sattpv.net/customers/${id}`, {
  method: 'PUT',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  body: JSON.stringify({
    phone: '699111222',
    details: 'Updated via API',
  }),
});

const json = await response.json();
```

```php [PHP]
<?php
$id      = 2474762;
$payload = json_encode([
    'phone'   => '699111222',
    'details' => 'Updated via API',
]);

$ch = curl_init('https://api-v3.sattpv.net/customers/' . $id);
curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_CUSTOMREQUEST  => 'PUT',
    CURLOPT_POSTFIELDS     => $payload,
    CURLOPT_HTTPHEADER     => [
        'Authorization: Bearer ' . $token,
        'Content-Type: application/json',
        'Accept: application/json',
    ],
]);

$response = curl_exec($ch);
curl_close($ch);

$json = json_decode($response, true);
```

```python [Python]
import requests

customer_id = 2474762

response = requests.put(
    f'https://api-v3.sattpv.net/customers/{customer_id}',
    headers={
        'Authorization': f'Bearer {token}',
        'Accept': 'application/json',
    },
    json={
        'phone': '699111222',
        'details': 'Updated via API',
    },
)

data = response.json()
```

:::

## Response

```json
{
    "status": "success",
    "code": 200,
    "data": {
        "customer_id": 2474762
    }
}
```

| Field              | Type    | Description                            |
| ------------------ | ------- | -------------------------------------- |
| `data.customer_id` | integer | Identifier of the updated customer.    |
