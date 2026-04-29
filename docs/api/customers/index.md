# Customers

The **Customers** module lets you manage the contacts associated with your SatTPV account — the people and companies that own the repairs, sales and services you track.

A customer record contains personal data (`full_name`, `phone`, `email`, `birthday`…), tax/billing data (`nif_type`, `nif`, `address`, `location`, `province`, `postal_code`, `country`, `iban`…), optional company data (`company_name`, `company_nif`, `company_address`…), an account `credit` balance and, when fetched individually, the related `repairs`, `sales`, `services`, `docs` and `credit_history`.

::: tip Authentication required
Every request in this module must include the `Authorization: Bearer <token>` header. See [Authentication](/authentication) for details.
:::

## Endpoints

| Method   | Endpoint                                  | Description                            |
| -------- | ----------------------------------------- | -------------------------------------- |
| `GET`    | [`/customers`](/api/customers/list)       | List customers, with filters and pagination. |
| `GET`    | [`/customers/{id}`](/api/customers/get)   | Retrieve a single customer with related data. |
| `POST`   | [`/customers`](/api/customers/create)     | Create a new customer.                 |
| `PUT`    | [`/customers/{id}`](/api/customers/update)| Update an existing customer.           |
| `DELETE` | [`/customers/{id}`](/api/customers/delete)| Delete a customer.                     |

## Customer object

| Field            | Type            | Description                                                       |
| ---------------- | --------------- | ----------------------------------------------------------------- |
| `id`             | integer         | Unique customer identifier.                                       |
| `user_id`        | integer         | Identifier of the SatTPV account that owns the customer.          |
| `subaccount`     | string \| null  | Subaccount identifier, when applicable.                           |
| `full_name`      | string          | Full name of the customer.                                        |
| `phone`          | string          | Primary phone number.                                             |
| `email`          | string          | Primary email address.                                            |
| `billing_address`| string          | Which address is used for billing (`contact` or `company`).        |
| `is_billable`    | integer         | Billing flag (`0`, `1`, `2`).                                     |
| `nif_valid`      | integer         | `1` if the tax ID has been validated, `0` otherwise.              |
| `nif_type`       | string          | `NIF`, `NIE`, `CIF` or `OTHER`.                                   |
| `nif`            | string          | Tax identification number.                                        |
| `address`        | string          | Street address.                                                   |
| `location`       | string          | City / locality.                                                  |
| `province`       | string          | Province / state.                                                 |
| `postal_code`    | string          | Postal / ZIP code.                                                |
| `country`        | string          | ISO country code (e.g. `ES`).                                     |
| `company_*`      | string          | Optional company-level fields mirroring the contact fields.       |
| `credit`         | string (decimal)| Customer credit balance.                                          |
| `birthday`       | string          | Date of birth (`YYYY-MM-DD`).                                     |
| `nationality`    | string          | Nationality.                                                      |
| `iban`           | string          | Bank account number.                                              |
| `details`        | string          | Free-text notes about the customer.                               |
| `created_at`     | integer         | Creation date (Unix timestamp).                                   |
| `updated_at`     | integer \| null | Last update date (Unix timestamp).                                |

When fetched via [`GET /customers/{id}`](/api/customers/get), the response also includes the related collections `repairs`, `sales`, `services`, `docs` and `credit_history`.
