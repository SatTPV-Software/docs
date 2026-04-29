# Delete product

Permanently delete a product from your catalog.

- **URL:** `https://api-v3.sattpv.net/products/{id}`
- **Method:** `DELETE`

::: danger Irreversible
This action cannot be undone. Make sure no related records (sales, repairs, defective items, stock movements) need to be reassigned before deleting the product.
:::

## Parameters

| Key  | Description                          | Type    | Required |
| ---- | ------------------------------------ | ------- | :------: |
| `id` | Product identifier (URL path).       | integer |   Yes    |

## Request

::: code-group

```bash [cURL]
curl -X DELETE 'https://api-v3.sattpv.net/products/2857023' \
  -H 'Authorization: Bearer YOUR_TOKEN' \
  -H 'Accept: application/json'
```

```js [JavaScript]
const id = 2857023;

const response = await fetch(`https://api-v3.sattpv.net/products/${id}`, {
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
$id = 2857023;

$ch = curl_init('https://api-v3.sattpv.net/products/' . $id);
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

product_id = 2857023

response = requests.delete(
    f'https://api-v3.sattpv.net/products/{product_id}',
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
    "code": 200,
    "data": {
        "product_id": 2857023
    }
}
```

| Field             | Type    | Description                            |
| ----------------- | ------- | -------------------------------------- |
| `data.product_id` | integer | Identifier of the deleted product.     |
