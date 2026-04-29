---
title: Products
description: Overview of the SatTPV Products module — endpoints, product object schema, stock, pricing and related collections (serials, defectives, units log, multishop stock).
---

# Products

The **Products** module lets you manage the catalog of items you sell or repair in your SatTPV account — physical goods, accessories, parts and SAT/service items.

A product record contains identification data (`product_name`, `product_brand`, `product_model`, `product_barcode`, `ref_num`…), categorization (`product_category`), inventory data (`product_units`, `product_min_stock`, `multishop_stock`), pricing (`product_bought_price`, `product_sale_price`, `product_b2b_price`), tax/accounting flags (`product_rebu`) and, when fetched individually, the related collections `product_serials`, `defectives` and `units_log`.

::: tip Authentication required
Every request in this module must include the `Authorization: Bearer <token>` header. See [Authentication](/authentication) for details.
:::

## Endpoints

| Method   | Endpoint                                  | Description                            |
| -------- | ----------------------------------------- | -------------------------------------- |
| `GET`    | [`/products`](/api/products/list)         | List products, with filters and pagination. |
| `GET`    | [`/products/{id}`](/api/products/get)     | Retrieve a single product with related data. |
| `PUT`    | [`/products/{id}`](/api/products/update)  | Update an existing product.            |
| `DELETE` | [`/products/{id}`](/api/products/delete)  | Delete a product.                      |

## Product object

| Field                  | Type             | Description                                                              |
| ---------------------- | ---------------- | ------------------------------------------------------------------------ |
| `product_id`           | integer          | Unique product identifier.                                               |
| `product_name`         | string           | Product name.                                                            |
| `product_category`     | string           | Category slug the product belongs to (e.g. `productos`, `fundas-con-tapa`). |
| `product_brand`        | string           | Brand name.                                                              |
| `product_model`        | string           | Model name or reference.                                                 |
| `product_barcode`      | string           | Main barcode (EAN, UPC, ASIN, internal code…).                           |
| `barcodes`             | string           | Additional barcodes, comma-separated.                                    |
| `ref_num`              | string           | Internal reference number.                                               |
| `provider_id`          | integer \| null  | Identifier of the default supplier.                                      |
| `location_id`          | integer          | Identifier of the storage location (`0` if none).                        |
| `product_units`        | integer          | Current stock units. May be negative when oversold.                      |
| `product_min_stock`    | integer          | Minimum stock threshold for low-stock alerts.                            |
| `product_bought_price` | string (decimal) | Purchase price (cost), with two decimals.                                |
| `product_sale_price`   | string (decimal) | Public sale price (PVP), with two decimals.                              |
| `product_b2b_price`    | string (decimal) | Wholesale / B2B price, with two decimals.                                |
| `product_rebu` / `rebu`| integer          | REBU (used-goods regime) flag. `1` if the product is sold under REBU, `0` otherwise. |
| `product_color`        | string           | Color variant.                                                           |
| `product_storage`      | string           | Storage / capacity variant (e.g. `64GB`).                                |
| `product_details`      | string           | Free-text notes about the product.                                       |
| `created_at`           | integer          | Creation date (Unix timestamp).                                          |
| `updated_at`           | integer          | Last update date (Unix timestamp).                                       |

When fetched via [`GET /products/{id}`](/api/products/get), the response also includes the related collections `product_serials`, `serials`, `product_image`, `defectives`, `units_log` and `multishop_stock`.
