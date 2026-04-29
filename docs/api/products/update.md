# Update product

Update an existing product. Send only the fields you want to change.

- **URL:** `https://api-v3.sattpv.net/products/{id}`
- **Method:** `PUT`

::: tip Field naming
The body uses **short field names** (without the `product_` prefix) — for example, `name` instead of `product_name` or `sale_price` instead of `product_sale_price`.
:::

## Parameters

The product identifier is sent in the URL. Send the fields to update as a **JSON body** — every body field is optional.

| Key            | Description                                                                              | Type             | Required |
| -------------- | ---------------------------------------------------------------------------------------- | ---------------- | :------: |
| `id`           | Product identifier (URL path).                                                           | integer          |   Yes    |
| `name`         | Product name.                                                                            | string           |    No    |
| `category`     | Category slug (e.g. `productos`, `fundas-con-tapa`).                                     | string           |    No    |
| `provider`     | Default supplier identifier, or `undefined` for none.                                    | integer \| string|    No    |
| `brand`        | Brand name.                                                                              | string           |    No    |
| `model`        | Model name or reference.                                                                 | string           |    No    |
| `barcode`      | Main barcode.                                                                            | string           |    No    |
| `barcodes`     | Additional barcodes, comma-separated.                                                    | string           |    No    |
| `ref_num`      | Internal reference number.                                                               | string           |    No    |
| `units`        | New stock units. The previous value must be sent in `old_stock`.                         | integer \| string|    No    |
| `old_stock`    | Previous stock units, used to detect concurrent changes.                                 | integer          |    No    |
| `min_stock`    | Minimum stock threshold for low-stock alerts.                                            | integer \| string|    No    |
| `bought_price` | Purchase price (cost), with two decimals.                                                | string           |    No    |
| `sale_price`   | Public sale price (PVP), with two decimals.                                              | string           |    No    |
| `b2b_price`    | Wholesale / B2B price, with two decimals.                                                | string           |    No    |
| `rebu`         | REBU (used-goods regime) flag. `1` if the product is sold under REBU, `0` otherwise.     | integer \| string|    No    |
| `color`        | Color variant.                                                                           | string           |    No    |
| `storage`      | Storage / capacity variant (e.g. `64GB`).                                                | string           |    No    |
| `details`      | Free-text notes about the product.                                                       | string           |    No    |
| `location`     | Storage location identifier, or `null` for none.                                         | integer \| null  |    No    |

## Request

::: code-group

```bash [cURL]
curl -X PUT 'https://api-v3.sattpv.net/products/2857023' \
  -H 'Authorization: Bearer YOUR_TOKEN' \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -d '{
    "name": "Newborn baby romper",
    "category": "fundas-con-tapa",
    "provider": "undefined",
    "brand": "",
    "model": "",
    "barcode": "B07F5V8G8R",
    "ref_num": "",
    "barcodes": "",
    "units": "-1",
    "min_stock": "0",
    "bought_price": "0.00",
    "sale_price": "20.99",
    "b2b_price": "0.00",
    "rebu": "0",
    "color": "",
    "storage": "",
    "details": "",
    "location": null,
    "old_stock": -1
  }'
```

```js [JavaScript]
const id = 2857023;

const response = await fetch(`https://api-v3.sattpv.net/products/${id}`, {
  method: 'PUT',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  body: JSON.stringify({
    name: 'Newborn baby romper',
    category: 'fundas-con-tapa',
    provider: 'undefined',
    brand: '',
    model: '',
    barcode: 'B07F5V8G8R',
    ref_num: '',
    barcodes: '',
    units: '-1',
    min_stock: '0',
    bought_price: '0.00',
    sale_price: '20.99',
    b2b_price: '0.00',
    rebu: '0',
    color: '',
    storage: '',
    details: '',
    location: null,
    old_stock: -1,
  }),
});

const json = await response.json();
```

```php [PHP]
<?php
$id      = 2857023;
$payload = json_encode([
    'name'         => 'Newborn baby romper',
    'category'     => 'fundas-con-tapa',
    'provider'     => 'undefined',
    'brand'        => '',
    'model'        => '',
    'barcode'      => 'B07F5V8G8R',
    'ref_num'      => '',
    'barcodes'     => '',
    'units'        => '-1',
    'min_stock'    => '0',
    'bought_price' => '0.00',
    'sale_price'   => '20.99',
    'b2b_price'    => '0.00',
    'rebu'         => '0',
    'color'        => '',
    'storage'      => '',
    'details'      => '',
    'location'     => null,
    'old_stock'    => -1,
]);

$ch = curl_init('https://api-v3.sattpv.net/products/' . $id);
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

product_id = 2857023

response = requests.put(
    f'https://api-v3.sattpv.net/products/{product_id}',
    headers={
        'Authorization': f'Bearer {token}',
        'Accept': 'application/json',
    },
    json={
        'name': 'Newborn baby romper',
        'category': 'fundas-con-tapa',
        'provider': 'undefined',
        'brand': '',
        'model': '',
        'barcode': 'B07F5V8G8R',
        'ref_num': '',
        'barcodes': '',
        'units': '-1',
        'min_stock': '0',
        'bought_price': '0.00',
        'sale_price': '20.99',
        'b2b_price': '0.00',
        'rebu': '0',
        'color': '',
        'storage': '',
        'details': '',
        'location': None,
        'old_stock': -1,
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
| `data.product_id` | integer | Identifier of the updated product.     |
