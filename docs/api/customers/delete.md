# Delete customer

Permanently delete a customer.

- **URL:** `https://api-v3.sattpv.net/customers/{id}`
- **Method:** `DELETE`

::: danger Irreversible
This action cannot be undone. Make sure no related records (repairs, sales, services, documents) need to be reassigned before deleting the customer.
:::

## Parameters

| Key  | Description                          | Type    | Required |
| ---- | ------------------------------------ | ------- | :------: |
| `id` | Customer identifier (URL path).      | integer |   Yes    |

## Request

::: code-group

```bash [cURL]
curl -X DELETE 'https://api-v3.sattpv.net/customers/2507498' \
  -H 'Authorization: Bearer YOUR_TOKEN' \
  -H 'Accept: application/json'
```

```js [JavaScript]
const id = 2507498;

const response = await fetch(`https://api-v3.sattpv.net/customers/${id}`, {
  method: 'DELETE',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Accept': 'application/json',
  },
});

const json = await response.json();
```

```php [PHP]
<?php
$id = 2507498;

$ch = curl_init('https://api-v3.sattpv.net/customers/' . $id);
curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_CUSTOMREQUEST  => 'DELETE',
    CURLOPT_HTTPHEADER     => [
        'Authorization: Bearer ' . $token,
        'Accept: application/json',
    ],
]);

$response = curl_exec($ch);
curl_close($ch);

$json = json_decode($response, true);
```

```python [Python]
import requests

customer_id = 2507498

response = requests.delete(
    f'https://api-v3.sattpv.net/customers/{customer_id}',
    headers={
        'Authorization': f'Bearer {token}',
        'Accept': 'application/json',
    },
)

data = response.json()
```

:::

## Response

```json
{
    "status": "success",
    "code": 201,
    "message": "Customer deleted successfully"
}
```

| Field     | Type    | Description                              |
| --------- | ------- | ---------------------------------------- |
| `status`  | string  | `success` when the customer was deleted. |
| `code`    | integer | `201` on success.                        |
| `message` | string  | Human-readable confirmation message.     |
