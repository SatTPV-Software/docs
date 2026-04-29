# Get product

Retrieve a single product by its identifier, together with its serials, defective items, units movement log and per-shop stock.

- **URL:** `https://api-v3.sattpv.net/products/{id}`
- **Method:** `GET`

## Parameters

| Key  | Description                          | Type    | Required |
| ---- | ------------------------------------ | ------- | :------: |
| `id` | Product identifier (URL path).       | integer |   Yes    |

## Request

::: code-group

```bash [cURL]
curl 'https://api-v3.sattpv.net/products/2857023' \
  -H 'Authorization: Bearer YOUR_TOKEN' \
  -H 'Accept: application/json'
```

```js [JavaScript]
const id = 2857023;

const response = await fetch(`https://api-v3.sattpv.net/products/${id}`, {
  headers: {
    'Authorization': `Bearer ${token}`,
    'Accept': 'application/json',
  },
});

const product = (await response.json()).data;
```

```php [PHP]
<?php
$id = 2857023;

$ch = curl_init('https://api-v3.sattpv.net/products/' . $id);
curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_HTTPHEADER     => [
        'Authorization: Bearer ' . $token,
        'Accept: application/json',
    ],
]);

$response = curl_exec($ch);
curl_close($ch);

$product = json_decode($response, true)['data'];
```

```python [Python]
import requests

product_id = 2857023

response = requests.get(
    f'https://api-v3.sattpv.net/products/{product_id}',
    headers={
        'Authorization': f'Bearer {token}',
        'Accept': 'application/json',
    },
)

product = response.json()['data']
```

:::

## Response

```json
{
    "status": "success",
    "code": 200,
    "data": {
        "product_id": 2857023,
        "product_name": "Newborn baby romper",
        "location_id": 0,
        "product_category": "fundas-con-tapa",
        "provider_id": null,
        "product_brand": "",
        "product_model": "",
        "product_barcode": "B07F5V8G8R",
        "ref_num": "",
        "barcodes": "",
        "product_units": -1,
        "product_min_stock": 0,
        "product_bought_price": "0.00",
        "product_sale_price": "20.99",
        "product_b2b_price": "0.00",
        "product_rebu": 0,
        "product_details": "",
        "product_color": "",
        "product_storage": "",
        "updated_at": 1763565465,
        "created_at": 1763358827,
        "product_serials": [],
        "serials": null,
        "product_image": null,
        "defectives": [
            {
                "id": 79,
                "user_id": 12,
                "product_id": 2857023,
                "sale_id": 985820,
                "sale_product_id": 1375630,
                "product_name": "Newborn baby romper",
                "product_units": 1,
                "provider_id": null,
                "provider_name": null,
                "defective_reason": null,
                "product_status": "pending",
                "created_at": 1776247499
            }
        ],
        "units_log": [
            {
                "id": 1418296,
                "user_id": 12,
                "type": "product_units_change",
                "type_id": 2857023,
                "description": "Sale return of (1) units sent to defective stock (no stock restock).",
                "created_at": 1776247499
            },
            {
                "id": 1418289,
                "user_id": 12,
                "type": "product_units_change",
                "type_id": 2857023,
                "description": "Sale of (1) units. Update from (0 -> -1) units.",
                "created_at": 1776247428
            },
            {
                "id": 1133183,
                "user_id": 12,
                "type": "product_units_change",
                "type_id": 2857023,
                "description": "Inventory check: 4 unit(s).",
                "created_at": 1765892084
            }
        ],
        "multishop_stock": {
            "12": {
                "id": 12,
                "shop_name": "Acme Inc.",
                "stock": -1
            }
        }
    }
}
```

### Related collections

| Field             | Type             | Description                                                                                  |
| ----------------- | ---------------- | -------------------------------------------------------------------------------------------- |
| `product_serials` | array            | Serial numbers currently in stock for this product.                                          |
| `serials`         | string \| null   | Raw serials string (legacy field), `null` when not used.                                     |
| `product_image`   | string \| null   | URL of the main product image, `null` when no image is set.                                  |
| `defectives`      | array            | Items returned as defective. Each entry includes the originating sale and the current `product_status` (e.g. `pending`, `processed`). |
| `units_log`       | array            | Stock movement history. Each entry includes a human-readable `description` and `created_at` (Unix timestamp). |
| `multishop_stock` | object           | Per-shop stock keyed by shop `id`. Each entry contains `id`, `shop_name` and `stock`.        |

If the product does not exist the API responds with HTTP `404`:

```json
{
    "status": "error",
    "code": 404,
    "message": "Product not found"
}
```
