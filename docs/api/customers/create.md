# Create customer

Create a new customer in your account.

- **URL:** `https://api-v3.sattpv.net/customers`
- **Method:** `POST`

::: warning Parameter list pending confirmation
The body parameters listed below are inferred from the customer object returned by [Get customer](/api/customers/get). The exact list of accepted fields and their validation rules will be confirmed in a future revision of this page.
:::

## Parameters

Send the parameters as a **JSON body**.

| Key                  | Description                                                                | Type    | Required |
| -------------------- | -------------------------------------------------------------------------- | ------- | :------: |
| `full_name`          | Full name of the customer.                                                 | string  |   Yes    |
| `phone`              | Primary phone number.                                                      | string  |    No    |
| `email`              | Primary email address.                                                     | string  |    No    |
| `nif_type`           | Tax ID type. One of `NIF`, `NIE`, `CIF`, `OTHER`.                          | string  |    No    |
| `nif`                | Tax identification number.                                                 | string  |    No    |
| `address`            | Street address.                                                            | string  |    No    |
| `location`           | City / locality.                                                           | string  |    No    |
| `province`           | Province / state.                                                          | string  |    No    |
| `postal_code`        | Postal / ZIP code.                                                         | string  |    No    |
| `country`            | ISO country code (e.g. `ES`).                                              | string  |    No    |
| `birthday`           | Date of birth (`YYYY-MM-DD`).                                              | string  |    No    |
| `nationality`        | Nationality.                                                               | string  |    No    |
| `iban`               | Bank account number.                                                       | string  |    No    |
| `details`            | Free-text notes about the customer.                                        | string  |    No    |
| `is_billable`        | Billing flag (`0`, `1` or `2`).                                            | integer |    No    |
| `billing_address`    | Address used for billing (`contact` or `company`).                         | string  |    No    |
| `company_name`       | Company name.                                                              | string  |    No    |
| `company_phone`      | Company phone number.                                                      | string  |    No    |
| `company_email`      | Company email address.                                                     | string  |    No    |
| `company_nif_type`   | Company tax ID type. One of `NIF`, `NIE`, `CIF`, `OTHER`.                  | string  |    No    |
| `company_nif`        | Company tax identification number.                                         | string  |    No    |
| `company_address`    | Company street address.                                                    | string  |    No    |
| `company_location`   | Company city / locality.                                                   | string  |    No    |
| `company_province`   | Company province / state.                                                  | string  |    No    |
| `company_postal_code`| Company postal / ZIP code.                                                 | string  |    No    |
| `company_country`    | Company ISO country code.                                                  | string  |    No    |

## Request

::: code-group

```bash [cURL]
curl -X POST 'https://api-v3.sattpv.net/customers' \
  -H 'Authorization: Bearer YOUR_TOKEN' \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -d '{
    "full_name": "John Doe",
    "phone": "600123456",
    "email": "john@example.com",
    "nif_type": "NIF",
    "nif": "12345678Z",
    "address": "Main Street, 1",
    "location": "Madrid",
    "province": "Madrid",
    "postal_code": "28001",
    "country": "ES",
    "is_billable": 1,
    "details": "VIP customer"
  }'
```

```js [JavaScript]
const response = await fetch('https://api-v3.sattpv.net/customers', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  body: JSON.stringify({
    full_name: 'John Doe',
    phone: '600123456',
    email: 'john@example.com',
    nif_type: 'NIF',
    nif: '12345678Z',
    address: 'Main Street, 1',
    location: 'Madrid',
    province: 'Madrid',
    postal_code: '28001',
    country: 'ES',
    is_billable: 1,
    details: 'VIP customer',
  }),
});

const json = await response.json();
```

```php [PHP]
<?php
$payload = json_encode([
    'full_name'   => 'John Doe',
    'phone'       => '600123456',
    'email'       => 'john@example.com',
    'nif_type'    => 'NIF',
    'nif'         => '12345678Z',
    'address'     => 'Main Street, 1',
    'location'    => 'Madrid',
    'province'    => 'Madrid',
    'postal_code' => '28001',
    'country'     => 'ES',
    'is_billable' => 1,
    'details'     => 'VIP customer',
]);

$ch = curl_init('https://api-v3.sattpv.net/customers');
curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST           => true,
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

response = requests.post(
    'https://api-v3.sattpv.net/customers',
    headers={
        'Authorization': f'Bearer {token}',
        'Accept': 'application/json',
    },
    json={
        'full_name': 'John Doe',
        'phone': '600123456',
        'email': 'john@example.com',
        'nif_type': 'NIF',
        'nif': '12345678Z',
        'address': 'Main Street, 1',
        'location': 'Madrid',
        'province': 'Madrid',
        'postal_code': '28001',
        'country': 'ES',
        'is_billable': 1,
        'details': 'VIP customer',
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
    "data": {
        "customer_id": 2507499
    }
}
```

| Field              | Type    | Description                          |
| ------------------ | ------- | ------------------------------------ |
| `data.customer_id` | integer | Identifier of the new customer.      |
