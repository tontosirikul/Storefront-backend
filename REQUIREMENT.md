# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

#### Products

- Index ✅
  - METHOD `GET`
  - URL `/products`
  - URL Params
    - None
  - Data Params
    - None
- Show ✅
  - METHOD `GET`
  - URL `/products/:id`
  - URL Params
    - `id=[integer]`
  - Data Params
    - None
- Create [token required] ✅
  - METHOD `POST`
  - URL `/products/`
  - URL Params
    - None
  - Data Params
    - `name=[string], price=[integer]`
- Update [token required] ✅
  - METHOD `PUT`
  - URL `/products/:id`
  - URL Params
    - `id=[integer]`
  - Data Params
    - `name=[string], price=[integer]`
- Delete ✅
  - METHOD `DELETE`
  - URL `/products/:id`
  - URL Params
    - `id=[integer]`
  - Data Params
    - None

#### Users

- Index [token required] ✅
  - METHOD `GET`
  - URL `/users`
  - URL Params
    - None
  - Data Params
    - None
- Show [token required] ✅
  - METHOD `GET`
  - URL `/users/:id`
  - URL Params
    - `id=[integer]`
  - Data Params
    - None
- Create [token required] ✅
  - METHOD `POST`
  - URL `/users/`
  - URL Params
    - None
  - Data Params
    - `firstName=[string], lastName=[string]`
- Update [token required] ✅
  - METHOD `PUT`
  - URL `/users/:id`
  - URL Params
    - `id=[integer]`
  - Data Params
    - `firstName=[string], lastName=[string]`
- Delete [token required] ✅
  - METHOD `DELETE`
  - URL `/users/:id`
  - URL Params
    - `id=[integer]`
  - Data Params
    - None

#### Orders

- Index ✅
  - METHOD `GET`
  - URL `/orders`
  - URL Params
    - None
  - Data Params
    - None
- Show ✅
  - METHOD `GET`
  - URL `/orders/:id`
  - URL Params
    - `id=[integer]`
  - Data Params
    - None
- Create [token required] ✅
  - METHOD `POST`
  - URL `/orders/`
  - URL Params
    - None
  - Data Params
    - `firstName=[string], lastName=[string]`
- Update [token required] ✅
  - METHOD `PUT`
  - URL `/orders/:id`
  - URL Params
    - `id=[integer]`
  - Data Params
    - `status=[string], user_id=[integer]`
- Delete [token required] ✅
  - METHOD `DELETE`
  - URL `/users/:id`
  - URL Params
    - `id=[integer]`
  - Data Params
    - None
- Current Order by user [token required] ✅
  - METHOD `get`
  - URL `/orders-by-user/:id`
  - URL Params
    - `id=[integer]`
  - Data Params
    - None
- Add product to order [token required] ✅
  - METHOD `post`
  - URL `/orders/id/products/`
  - URL Params
    - `order_id=[integer]`
  - Data Params
    - `product_id=[integer], quantify=[integer]`
- Delete product from order [token required] ✅
  - METHOD `delete`
  - URL `/orders/:order_id/products/:product_id`
  - URL Params
    - `order_id=[integer], product_id=[integer]`
  - Data Params
    - None

## Data Shapes

#### Product

- id ✅
- name ✅
- price ✅

#### User

- id ✅
- firstName ✅
- lastName ✅
- password ✅

#### Order

- id ✅
- user_id ✅
- status (active or complete) ✅

#### order_product_list

- id ✅
- quantity ✅
- order_id ✅
- product_id ✅
