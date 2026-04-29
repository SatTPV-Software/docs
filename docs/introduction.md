# Introduction

Welcome to the official documentation of the **SatTPV API**. The API lets you integrate your own applications, scripts or third-party tools with the [SatTPV](https://www.sattpv.net) platform — manage customers, repairs, sales, inventory and the rest of the resources available in your account.

This reference covers every public endpoint, the parameters they accept and the response they return. Every endpoint includes ready-to-use code samples in **cURL**, **JavaScript**, **PHP** and **Python**.

## Base URL

Every endpoint of the API — including authentication — is served from a single host:

| Purpose | Base URL                    |
| ------- | --------------------------- |
| API     | `https://api-v3.sattpv.net` |

## Requests

- All requests are made over **HTTPS**. Plain HTTP is not supported.
- Request and response bodies are **JSON** unless stated otherwise.
- All authenticated requests must include the `Authorization` header obtained from [Authentication](/authentication):

  ```http
  Authorization: Bearer <your-token>
  Content-Type: application/json
  Accept: application/json
  ```

- `GET` endpoints accept their parameters as **query strings**.
- `POST`, `PUT` and `DELETE` endpoints accept their parameters as a **JSON body**.

## Response envelope

Every response shares the same top-level shape:

```json
{
  "status": "success",
  "code": 200,
  "data": { /* endpoint payload */ }
}
```

| Field     | Type    | Description                                                                                  |
| --------- | ------- | -------------------------------------------------------------------------------------------- |
| `status`  | string  | `success` or `error`.                                                                        |
| `code`    | integer | HTTP-aligned status code (`200` OK, `201` Created, `400` Bad Request, `401` Unauthorized…). |
| `data`    | object  | Endpoint payload. Present on successful requests.                                            |
| `message` | string  | Human-readable description. Present on errors and on some success responses.                 |

### Error response

```json
{
  "status": "error",
  "code": 401,
  "message": "Invalid or expired token"
}
```

When you receive a `401`, request a new token (see [Authentication](/authentication#token-expiration)) and retry.

## Pagination

List endpoints share the same pagination contract via query parameters:

| Parameter | Type    | Default | Description                          |
| --------- | ------- | ------- | ------------------------------------ |
| `show`    | integer | `10`    | Number of records per page.          |
| `page`    | integer | `1`     | Page number, starting at `1`.        |

Paginated responses include the following metadata alongside the records:

| Field       | Type    | Description                                  |
| ----------- | ------- | -------------------------------------------- |
| `total`     | integer | Total number of records that match the query. |
| `page`      | integer | Current page number.                          |
| `last_page` | integer | Index of the last available page.             |
| `rows_from` | integer | First row index (0-based) of the current page.|
| `rows_to`   | integer | Last row index of the current page.           |

## Dates and timestamps

Date/time fields such as `created_at` and `updated_at` are returned as **Unix timestamps** (seconds since epoch, UTC). When you send dates in filters (e.g. `customer_from`, `customer_to`), use the same Unix-timestamp format.

## HTTP status codes

| Code | Meaning                                                       |
| ---- | ------------------------------------------------------------- |
| 200  | Request succeeded.                                            |
| 201  | Resource created or action completed successfully.            |
| 400  | The request is malformed or a parameter failed validation.    |
| 401  | Missing, invalid or expired token.                            |
| 403  | The token is valid but lacks permission for this resource.    |
| 404  | The resource does not exist.                                  |
| 422  | The payload is well-formed but contains semantic errors.      |
| 500  | An unexpected error happened on the server.                   |

## Next steps

1. Read [Authentication](/authentication) to learn how to obtain and cache your Bearer token.
2. Jump to the [Customers](/api/customers/) module — or any other module from the sidebar — and start integrating.
