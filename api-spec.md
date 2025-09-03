# 📑 POS API Contract

## Authentication

### `GET /api/token`

**Headers**

```
Content-Type: application/json
```

**Response**

```json
{
  "accessToken": "eyjauahwidawh...."
}
```

### `POST /api/login`

**Headers**

```
Content-Type: application/json
```

**Request**

```json
{
  "email": "admin@example.com",
  "password": "123456"
}
```

**Response**

```json
{
  "msg": "Register successfully"
}
```

### `POST /api/register`

**Headers**

```
Content-Type: application/json
```

**Request**

```json
{
  "name": "example",
  "email": "kasir1@pos.com",
  "password": "123456",
  "phone": "082875353",
  "role_id": "12435534643"
}
```

**Response**

```json
{
  "refreshToken": "eyj2rnj3btjh3....",
  "accessToken": "eyj54k4hy4k3....",
  "msg": "Login successfully!"
}
```

## USER

### `GET /api/users`

**Headers**

```
Authorization: Bearer eyjsha3ut3u....
Content-Type: application/json
```

**Response**

```json
{
  "refreshToken": "eyj2rnj3btjh3....",
  "accessToken": "eyj54k4hy4k3....",
  "msg": "Login successfully!"
}
```

### `GET /api/users/:id`

**Headers**

```
Authorization: Bearer eyjsha3ut3u....
Content-Type: application/json
```

**Request**

```json
{
  "id": "1234567890"
}
```

**Response**

```json
{
  "id": "1234567890",
  "name": "example",
  "email": "kasir1@pos.com",
  "phone": "082875353",
  "role_id": "12435534643",
  "role_name": "admin"
}
```

### `POST /api/users/:id`

**Headers**

```
Authorization: Bearer eyjsha3ut3u....
Content-Type: application/json
```

**Request**

```json
{
  "id": "1234567890"
}
```

**Response**

```json
{
  "id": "1234567890",
  "name": "example",
  "email": "kasir1@pos.com",
  "phone": "082875353",
  "role_id": "12435534643",
  "role_name": "admin"
}
```
