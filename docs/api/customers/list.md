---
title: List customers
description: GET /customers — retrieve a paginated list of customers with optional filters by name, phone, NIF and creation date range.
---

# List customers

Retrieve a paginated list of the customers in your account. All filters are optional and can be combined.

- **URL:** `https://api-v3.sattpv.net/customers`
- **Method:** `GET`

## Parameters

Send the parameters as **query string** values.

| Key              | Description                                                          | Type    | Required |
| ---------------- | -------------------------------------------------------------------- | ------- | :------: |
| `customer_name`  | Filter by full name (partial match).                                 | string  |    No    |
| `customer_phone` | Filter by phone number (partial match).                              | string  |    No    |
| `customer_nif`   | Filter by tax ID (partial match).                                    | string  |    No    |
| `customer_from`  | Lower bound for `created_at` (Unix timestamp).                       | integer |    No    |
| `customer_to`    | Upper bound for `created_at` (Unix timestamp).                       | integer |    No    |
| `show`           | Records per page. Defaults to `10`.                                  | integer |    No    |
| `page`           | Page number, starting at `1`. Defaults to `1`.                       | integer |    No    |
| `export`         | Set to a non-empty value to export the result instead of paginating. | string  |    No    |

## Request

::: code-group

```bash [cURL]
curl -G 'https://api-v3.sattpv.net/customers' \
  -H 'Authorization: Bearer YOUR_TOKEN' \
  -H 'Accept: application/json' \
  --data-urlencode 'customer_name=' \
  --data-urlencode 'customer_phone=' \
  --data-urlencode 'customer_nif=' \
  --data-urlencode 'customer_from=' \
  --data-urlencode 'customer_to=' \
  --data-urlencode 'show=10' \
  --data-urlencode 'page=1' \
  --data-urlencode 'export='
```

```js [JavaScript]
const params = new URLSearchParams({
  customer_name: '',
  customer_phone: '',
  customer_nif: '',
  customer_from: '',
  customer_to: '',
  show: '10',
  page: '1',
  export: '',
});

const response = await fetch(`https://api-v3.sattpv.net/customers?${params}`, {
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
    'customer_name'  => '',
    'customer_phone' => '',
    'customer_nif'   => '',
    'customer_from'  => '',
    'customer_to'    => '',
    'show'           => 10,
    'page'           => 1,
    'export'         => '',
]);

$ch = curl_init('https://api-v3.sattpv.net/customers?' . $query);
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
    'https://api-v3.sattpv.net/customers',
    headers={
        'Authorization': f'Bearer {token}',
        'Accept': 'application/json',
    },
    params={
        'customer_name': '',
        'customer_phone': '',
        'customer_nif': '',
        'customer_from': '',
        'customer_to': '',
        'show': 10,
        'page': 1,
        'export': '',
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
        "total": 21,
        "customers": [
            {
                "id": 123456,
                "user_id": 123,
                "subaccount": null,
                "store_cus_id": null,
                "full_name": "Daniel Rodriguez",
                "phone": "600000000",
                "billing_address": "contact",
                "is_billable": 0,
                "nif_valid": 1,
                "nif_type": "NIF",
                "nif": "12345678F",
                "address": "Calle Mayor, 24",
                "location": "Zaragoza",
                "province": "Zaragoza",
                "postal_code": "12345",
                "country": "ES",
                "email": "info@example.com",
                "company_name": "",
                "company_phone": "",
                "company_nif_valid": 0,
                "company_nif_type": "OTHER",
                "company_nif": "",
                "company_address": "",
                "company_location": "",
                "company_province": "",
                "company_postal_code": "",
                "company_country": "",
                "company_email": "",
                "credit": "0.00",
                "birthday": null,
                "nationality": "",
                "iban": "",
                "details": "",
                "updated_at": null,
                "created_at": 1728410033,
                "customer_id": 761701,
                "customer_credit": "0.00"
            }
        ],
        "page": 1,
        "last_page": 3,
        "rows_from": 0,
        "rows_to": 10
    }
}
```

### Response fields

| Field             | Type    | Description                                                   |
| ----------------- | ------- | ------------------------------------------------------------- |
| `data.total`      | integer | Total number of customers that match the query.               |
| `data.customers`  | array   | Customers in the current page. See the [customer object](/api/customers/#customer-object). |
| `data.page`       | integer | Current page number.                                          |
| `data.last_page`  | integer | Index of the last available page.                             |
| `data.rows_from`  | integer | First row index (0-based) of the current page.                |
| `data.rows_to`    | integer | Last row index of the current page.                           |
