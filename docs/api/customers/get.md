# Get customer

Retrieve a single customer by its identifier, together with their related repairs, sales, services, documents and credit history.

- **URL:** `https://api-v3.sattpv.net/customers/{id}`
- **Method:** `GET`

## Parameters

| Key  | Description                          | Type    | Required |
| ---- | ------------------------------------ | ------- | :------: |
| `id` | Customer identifier (URL path).      | integer |   Yes    |

## Request

::: code-group

```bash [cURL]
curl 'https://api-v3.sattpv.net/customers/2474762' \
  -H 'Authorization: Bearer YOUR_TOKEN' \
  -H 'Accept: application/json'
```

```js [JavaScript]
const id = 2474762;

const response = await fetch(`https://api-v3.sattpv.net/customers/${id}`, {
  headers: {
    'Authorization': `Bearer ${token}`,
    'Accept': 'application/json',
  },
});

const customer = (await response.json()).data;
```

```php [PHP]
<?php
$id = 2474762;

$ch = curl_init('https://api-v3.sattpv.net/customers/' . $id);
curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_HTTPHEADER     => [
        'Authorization: Bearer ' . $token,
        'Accept: application/json',
    ],
]);

$response = curl_exec($ch);
curl_close($ch);

$customer = json_decode($response, true)['data'];
```

```python [Python]
import requests

customer_id = 2474762

response = requests.get(
    f'https://api-v3.sattpv.net/customers/{customer_id}',
    headers={
        'Authorization': f'Bearer {token}',
        'Accept': 'application/json',
    },
)

customer = response.json()['data']
```

:::

## Response

```json
{
    "status": "success",
    "code": 200,
    "data": {
        "id": 2474762,
        "user_id": 12,
        "subaccount": null,
        "store_cus_id": "cus_UDhZxYGzeQMTtH",
        "full_name": "Bejamin Villuendas Alonso",
        "phone": "600123123",
        "billing_address": "contact",
        "is_billable": 2,
        "nif_valid": 1,
        "nif_type": "NIF",
        "nif": "B75466151",
        "address": "Calle de pruebas, 123",
        "location": "Madrid",
        "province": "Madrid",
        "postal_code": "20123",
        "country": "ES",
        "email": "",
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
        "credit": "0.36",
        "birthday": "0000-00-00",
        "nationality": "",
        "iban": "",
        "details": "",
        "updated_at": null,
        "created_at": 1774540119,
        "repairs": [
            {
                "id": 567905,
                "brand": "",
                "model": "",
                "imei": "",
                "estimated_cost": "5.09",
                "invoice_ref": null,
                "created_at": 1776756732,
                "movement_id": 1578432,
                "movement_status": "paid"
            },
            {
                "id": 564339,
                "brand": "",
                "model": "",
                "imei": "",
                "estimated_cost": "5.09",
                "invoice_ref": null,
                "created_at": 1776183819,
                "movement_id": null,
                "movement_status": null
            }
        ],
        "sales": [],
        "services": [],
        "docs": [],
        "credit_history": [
            {
                "description": "Reparación #567905 de (5.09 €). Añadidos (0.36 €) como crédito.",
                "created_at": 1777028129
            }
        ],
        "customer_id": 2474762,
        "customer_credit": "0.36",
        "customer_name": "Bejamin Villuendas Alonso",
        "customer_phone": "600123123",
        "customer_nif_type": "NIF",
        "customer_nif": "B75466151",
        "customer_address": "Calle de pruebas, 123",
        "customer_location": "Madrid",
        "customer_province": "Madrid",
        "customer_cp": "20123",
        "customer_email": "",
        "customer_nationality": "",
        "customer_birthday": "0000-00-00",
        "customer_iban": "",
        "customer_details": "",
        "company_cp": ""
    }
}
```

### Related collections

| Field             | Type  | Description                                                                 |
| ----------------- | ----- | --------------------------------------------------------------------------- |
| `repairs`         | array | Repairs created for this customer.                                          |
| `sales`           | array | Sales associated with this customer.                                        |
| `services`        | array | Services contracted by this customer.                                       |
| `docs`            | array | Documents linked to the customer (invoices, quotes, delivery notes…).       |
| `credit_history`  | array | Credit movements with `description` and `created_at` (Unix timestamp).      |

If the customer does not exist the API responds with HTTP `404`:

```json
{
    "status": "error",
    "code": 404,
    "message": "Customer not found"
}
```
