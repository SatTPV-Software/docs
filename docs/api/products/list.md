---
title: List products
description: GET /products — retrieve a paginated list of products with filters by name, brand, model, barcode, reference, serial, category and stock status.
---

# List products

Retrieve a paginated list of the products in your catalog. All filters are optional and can be combined.

- **URL:** `https://api-v3.sattpv.net/products`
- **Method:** `GET`

## Parameters

Send the parameters as **query string** values.

| Key                | Description                                                                              | Type    | Required |
| ------------------ | ---------------------------------------------------------------------------------------- | ------- | :------: |
| `product_name`     | Filter by product name (partial match).                                                  | string  |    No    |
| `product_brand`    | Filter by brand (partial match).                                                         | string  |    No    |
| `product_model`    | Filter by model (partial match).                                                         | string  |    No    |
| `product_barcode`  | Filter by main barcode (partial match).                                                  | string  |    No    |
| `product_ref_num`  | Filter by internal reference number (partial match).                                     | string  |    No    |
| `product_serial`   | Filter by serial number (partial match).                                                 | string  |    No    |
| `product_category` | Filter by category slug (exact match).                                                   | string  |    No    |
| `product_stock`    | Stock filter: `all`, `in_stock`, `low_stock`, `out_of_stock`. Defaults to `all`.         | string  |    No    |
| `order_by`         | Result ordering. E.g. `date_desc`, `date_asc`, `name_asc`, `name_desc`, `stock_desc`.    | string  |    No    |
| `show`             | Records per page. Defaults to `10`.                                                      | integer |    No    |
| `page`             | Page number, starting at `1`. Defaults to `1`.                                           | integer |    No    |
| `export`           | Set to a non-empty value to export the result instead of paginating.                     | string  |    No    |

## Request

::: code-group

```bash [cURL]
curl -G 'https://api-v3.sattpv.net/products' \
  -H 'Authorization: Bearer YOUR_TOKEN' \
  -H 'Accept: application/json' \
  --data-urlencode 'product_name=' \
  --data-urlencode 'product_brand=' \
  --data-urlencode 'product_model=' \
  --data-urlencode 'product_barcode=' \
  --data-urlencode 'product_ref_num=' \
  --data-urlencode 'product_serial=' \
  --data-urlencode 'product_category=' \
  --data-urlencode 'product_stock=all' \
  --data-urlencode 'order_by=date_desc' \
  --data-urlencode 'export=' \
  --data-urlencode 'show=10' \
  --data-urlencode 'page=1'
```

```js [JavaScript]
const params = new URLSearchParams({
  product_name: '',
  product_brand: '',
  product_model: '',
  product_barcode: '',
  product_ref_num: '',
  product_serial: '',
  product_category: '',
  product_stock: 'all',
  order_by: 'date_desc',
  export: '',
  show: '10',
  page: '1',
});

const response = await fetch(`https://api-v3.sattpv.net/products?${params}`, {
  headers: {
    'Authorization': `Bearer ${token}`,
    'Accept': 'application/json',
  },
});

const json = await response.json();
```

```php [PHP]
<?php
$query = http_build_query([
    'product_name'     => '',
    'product_brand'    => '',
    'product_model'    => '',
    'product_barcode'  => '',
    'product_ref_num'  => '',
    'product_serial'   => '',
    'product_category' => '',
    'product_stock'    => 'all',
    'order_by'         => 'date_desc',
    'export'           => '',
    'show'             => 10,
    'page'             => 1,
]);

$ch = curl_init('https://api-v3.sattpv.net/products?' . $query);
curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
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

response = requests.get(
    'https://api-v3.sattpv.net/products',
    headers={
        'Authorization': f'Bearer {token}',
        'Accept': 'application/json',
    },
    params={
        'product_name': '',
        'product_brand': '',
        'product_model': '',
        'product_barcode': '',
        'product_ref_num': '',
        'product_serial': '',
        'product_category': '',
        'product_stock': 'all',
        'order_by': 'date_desc',
        'export': '',
        'show': 10,
        'page': 1,
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
        "products": [
            {
                "product_id": 3091601,
                "product_name": "Test product",
                "product_category": "productos",
                "product_brand": "Acme",
                "product_model": "Nokia 3210",
                "product_barcode": "32434893457896",
                "ref_num": "892384796",
                "product_units": 4,
                "product_min_stock": 0,
                "product_bought_price": "123.30",
                "product_sale_price": "222.20",
                "product_b2b_price": "200.10",
                "rebu": 1,
                "barcodes": "",
                "product_details": "Demo notes",
                "updated_at": 1777036725,
                "created_at": 1777036714
            },
            {
                "product_id": 3007143,
                "product_name": "New SAT",
                "product_category": "botones-sat-tpv",
                "product_brand": "",
                "product_model": "",
                "product_barcode": "PPP682543617809782",
                "ref_num": "",
                "product_units": 3,
                "product_min_stock": 1,
                "product_bought_price": "100.00",
                "product_sale_price": "200.00",
                "product_b2b_price": "0.00",
                "rebu": 1,
                "barcodes": "",
                "product_details": "",
                "updated_at": 1776761156,
                "created_at": 1768254361
            }
        ],
        "total": 128,
        "page": 1,
        "last_page": 13,
        "rows_from": 0,
        "rows_to": 10
    }
}
```

### Response fields

| Field             | Type    | Description                                                                                |
| ----------------- | ------- | ------------------------------------------------------------------------------------------ |
| `data.products`   | array   | Products in the current page. See the [product object](/api/products/#product-object).     |
| `data.total`      | integer | Total number of products that match the query.                                             |
| `data.page`       | integer | Current page number.                                                                       |
| `data.last_page`  | integer | Index of the last available page.                                                          |
| `data.rows_from`  | integer | First row index (0-based) of the current page.                                             |
| `data.rows_to`    | integer | Last row index of the current page.                                                        |
