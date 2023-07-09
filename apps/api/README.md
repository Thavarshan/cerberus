# Cerberus API

This describes the resources that make up the Cerberus REST API. If you have any problems or requests, please contact [support](https://github.com/Thavarshan/cerberus/issues).

## Overview

### Current Version

By default, all requests to `https://cerberus.onrender.com` receive the `v1` version of the REST API. We encourage you to explicitly request JSON content via the `Accept` and `Content-Type` header.

```
Accept: application/json
Content-Type: application/json
```

### Schema

All API access is over HTTPS and accessed from <https://cerberus.onrender.com>. All data is sent and received as JSON.

```bash
curl -I https://cerberus.onrender.com

HTTP/2 200
server: nginx
content-type: application/json
vary: Accept-Encoding
cache-control: no-cache, private
date: Fri, 26 Nov 2021 04:54:41 GMT
access-control-allow-origin: *
x-frame-options: SAMEORIGIN
x-xss-protection: 1; mode=block
x-content-type-options: nosniff
```

Blank fields are not included as null instead will be omitted.

All timestamps return in UTC time, ISO 8601 format:

```
YYYY-MM-DDTHH:MM:SSZ
```

### Parameters

Many API methods take optional parameters. For `GET` requests, any parameters not specified as a segment in the path can be passed as an `HTTP` query string parameter:

```bash
curl -i "https://cerberus.onrender.com/users?role=customers"
```

For `POST`, `PATCH`, `PUT`, and `DELETE` requests, parameters not included in the URL should be encoded as JSON with a `Content-Type` of 'application/json':

```bash
curl -i -d '{"email":"default.user@cerberus.com","password":"password"}' https://cerberus.onrender.com/login \
-H 'Content-Type: application/json' \
-H 'Accept: application/json'
```

### Root Endpoint

You can issue a `GET` request to the root endpoint to check the status of the REST API:

```bash=
curl https://cerberus.onrender.com
```

### Client Errors

There are three possible types of client errors on API calls that receive request bodies:

1. Sending invalid JSON will result in a 400 Bad Request response.

```bash=
HTTP/2 400
Content-Length: 35

{ "message": "Request was invalid" }
```

2. Sending invalid fields will result in a 400 Bad Request response.

```bash=
HTTP/2 400
Content-Length: 149

{
    "message": "The given data was invalid.",
    "errors": {
        "email": [
            "These credentials do not match our records."
        ]
    }
}
```

### Authentication

#### Basic Authentication

This API allows for the user to log in to the application through username and password.

```
POST /login
```

##### Parameters

| Name     | Type   | In   | Description                                                            |
| -------- | ------ | ---- | ---------------------------------------------------------------------- |
| email    | string | body | **Required**. The email address the user's account is associated with. |
| password | string | body | **Required**. The password of the user.                                |

##### Code Samples

```bash
curl --location --request POST 'https://cerberus.onrender.com/login' \
--header 'Accept: application/json' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "default.user@macroactive.com",
    "password": "password"
}'
```

##### Response

```
Status: 200 OK
```

```json
{
    "id": "79654f5d-b457-401d-8271-c1085492c336",
    "name": "Malcom Cormac",
    "username": "mcCormac",
    "email": "malcom@example.com",
    "password": "$2b$10$B2U/7TOpABMQRbtGLki9JeQoMYie01VnAH4XpBwuk9MQEPQLILiO6",
    "phone": null,
    "role": "user",
    "verified": false,
    "loginAttempts": 0,
    "blockedAt": null,
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI3OTY1NGY1ZC1iNDU3LTQwMWQtODI3MS1jMTA4NTQ5MmMzMzYiLCJ1c2VybmFtZSI6Im1hbGNvbUBleGFtcGxlLmNvbSIsImlhdCI6MTY4ODQ2NTE3OCwiZXhwIjoxNjg4NTUxNTc4fQ.fq9GcCFQLEe8cdasUCuQLExsVJFNQ0-UkCj68lWyL4c",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI3OTY1NGY1ZC1iNDU3LTQwMWQtODI3MS1jMTA4NTQ5MmMzMzYiLCJ1c2VybmFtZSI6Im1hbGNvbUBleGFtcGxlLmNvbSIsImlhdCI6MTY4ODQ2NTE3OCwiZXhwIjoxNjkxMDU3MTc4fQ.loX67X4Dfr9lj1HKTjgU517-35G_iBMm61kOEHnOKnA"
}
```

##### Invalid Credentials

```
Status: 404 Not Found
```

```json
{
    "statusCode": 404,
    "message": "User with email malcoms@example.com not found.",
    "error": "Not Found"
}
```

#### OAuth Authentication

OAuth tokens only include JWT at the moment. These token may or may not have an expiration time and enable the user to check the last access time or revoke access at any time.

```bash=
curl -v -H "Authorization: Bearer <TOKEN>" https://cerberus.onrender.com
```

##### Via JWT Token

To generate a JWT token a user must first login through basic authentication by use of `email` and `password`. The response should return access and refresh tokens in the response body.

```json
{
    "accessToken": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvbWFjcm9hY3RpdmlzdHMtYXBpLm1hY3JvYWN0aXZlbXZwLmNvbVwvYXBpXC92MVwvbG9naW4iLCJpYXQiOjE2Mzg0MTk0MjYsImV4cCI6MTYzODU5MjIyNiwibmJmIjoxNjM4NDE5NDI2LCJqdGkiOiIzWTBLVnduQjJ6SHJHakVLIiwic3ViIjoiNjFhNzNhYWUwZjZlZmM1M2E3Njg2MjIzIiwicHJ2IjoiMjNiZDVjODk0OWY2MDBhZGIzOWU3MDFjNDAwODcyZGI3YTU5NzZmNyJ9.iZKRwbm9LE_8J4i-BfZ_tlpL-DcPcY7iUQ4rCVaB1cc",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI3OTY1NGY1ZC1iNDU3LTQwMWQtODI3MS1jMTA4NTQ5MmMzMzYiLCJ1c2VybmFtZSI6Im1hbGNvbUBleGFtcGxlLmNvbSIsImlhdCI6MTY4ODQ2NTE3OCwiZXhwIjoxNjkxMDU3MTc4fQ.loX67X4Dfr9lj1HKTjgU517-35G_iBMm61kOEHnOKnA"
}
```

You may use this token to access auth-protected routes in the API by including the token in the `Authorization` header of the request.

JWT tokens usually expire after **1 day(s)**.

#### Refresh Token

This endpoint allows refreshing a JWT token. This endpoint can only be accessed with a valid JWT token.

```
POST /refresh
```

##### Parameters

| Name          | Type   | In   | Description                                                |
| ------------- | ------ | ---- | ---------------------------------------------------------- |
| refresh_token | string | body | **Required**. The token received when initially loggin in. |

##### Response

```
Status: 200 OK
```

```json
{
    "id": "79654f5d-b457-401d-8271-c1085492c336",
    "name": "Malcom Cormac",
    "username": "mcCormac",
    "email": "malcom@example.com",
    "password": "$2b$10$B2U/7TOpABMQRbtGLki9JeQoMYie01VnAH4XpBwuk9MQEPQLILiO6",
    "phone": null,
    "role": "user",
    "verified": false,
    "loginAttempts": 0,
    "blockedAt": null,
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI3OTY1NGY1ZC1iNDU3LTQwMWQtODI3MS1jMTA4NTQ5MmMzMzYiLCJ1c2VybmFtZSI6Im1hbGNvbUBleGFtcGxlLmNvbSIsImlhdCI6MTY4ODQ2NTM4MywiZXhwIjoxNjg4NTUxNzgzfQ.3b2jLm_gnKllPBuX1X0ySt69jpWLMkt1DVOSjmi-MGI",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI3OTY1NGY1ZC1iNDU3LTQwMWQtODI3MS1jMTA4NTQ5MmMzMzYiLCJ1c2VybmFtZSI6Im1hbGNvbUBleGFtcGxlLmNvbSIsImlhdCI6MTY4ODQ2NTM4MywiZXhwIjoxNjkxMDU3MzgzfQ.CJwNYkpTxEn9f2NvlPgoMk_cMDinfoDAN3E8CAVXh7Y"
}
```

##### Invalid JWT Token

```
Status: 401 Unauthorized
```

```json
{
    "statusCode": 401,
    "message": "invalid token",
    "error": "Unauthorized"
}
```

#### Authenticated User

This endpoint can be used to retrieve information about the currently authenticated user. This endpoint can only be accessed through **JWT** token.

```
GET /user
```

##### Parameters

| Name          | Type   | In     | Description                                            |
| ------------- | ------ | ------ | ------------------------------------------------------ |
| Authorization | string | header | **Required**. The JWT token of the authenticated user. |

##### Response

```
Status: 200 OK
```

```json
{
    "id": "79654f5d-b457-401d-8271-c1085492c336",
    "name": "Malcom Cormac",
    "username": "mcCormac",
    "email": "malcom@example.com",
    "password": "$2b$10$B2U/7TOpABMQRbtGLki9JeQoMYie01VnAH4XpBwuk9MQEPQLILiO6",
    "phone": null,
    "role": "user",
    "verified": false,
    "loginAttempts": 0,
    "blockedAt": null
}
```

##### Invalid JWT Token

```
Status: 401 Unauthorized
```

```json
{
    "statusCode": 401,
    "message": "invalid token",
    "error": "Unauthorized"
}
```

### Users

#### Get Users

This endpoint can be used to retrieve all users from the database. This endpoint can only be accessed through **JWT** token.

```
GET /users
```

##### Parameters

| Name          | Type   | In     | Description                                            |
| ------------- | ------ | ------ | ------------------------------------------------------ |
| Authorization | string | header | **Required**. The JWT token of the authenticated user. |

##### Response

```
Status: 200 OK
```

```json
{
    "data": [
        {
            "id": "79654f5d-b457-401d-8271-c1085492c336",
            "name": "Malcom Cormac",
            "username": "mcCormac",
            "email": "malcom@example.com",
            "password": "$2b$10$B2U/7TOpABMQRbtGLki9JeQoMYie01VnAH4XpBwuk9MQEPQLILiO6",
            "phone": null,
            "role": "user",
            "verified": false,
            "loginAttempts": 0,
            "blockedAt": null
        },
        {
            "id": "e89906f4-fa9f-43e9-8175-4a059d0613db",
            "name": "John Doe",
            "username": "johnDoe",
            "email": "john@example.com",
            "password": "$2b$10$MFqyTXmKGLQrPbQFyJtiB.wFqXa5XQfOtikQWu5N6gVXTMNz6LDN2",
            "phone": null,
            "role": "user",
            "verified": false,
            "loginAttempts": 0,
            "blockedAt": null
        }
    ]
}
```

##### Invalid JWT Token

```
Status: 401 Unauthorized
```

```json
{
    "statusCode": 401,
    "message": "invalid token",
    "error": "Unauthorized"
}
```

#### Get User

This endpoint can be used to retrieve a specific user from the database. This endpoint can only be accessed through **JWT** token.

```
GET /users/{uuid}
```

##### Parameters

| Name          | Type   | In     | Description                                            |
| ------------- | ------ | ------ | ------------------------------------------------------ |
| Authorization | string | header | **Required**. The JWT token of the authenticated user. |
| uuid          | string | path   | **Required**. The UUID of the user.                    |

##### Response

```
Status: 200 OK
```

```json
{
    "id": "79654f5d-b457-401d-8271-c1085492c336",
    "name": "Malcom Cormac",
    "username": "mcCormac",
    "email": "malcom@example.com",
    "password": "$2b$10$B2U/7TOpABMQRbtGLki9JeQoMYie01VnAH4XpBwuk9MQEPQLILiO6",
    "phone": null,
    "role": "user",
    "verified": false,
    "loginAttempts": 0,
    "blockedAt": null
}
```

##### Invalid JWT Token

```
Status: 401 Unauthorized
```

```json
{
    "statusCode": 401,
    "message": "invalid token",
    "error": "Unauthorized"
}
```

#### Create User

This endpoint can be used to create a new user and persist to the database. This endpoint can only be accessed through **JWT** token.

```
POST /users
```

##### Parameters

| Name          | Type   | In     | Description                                            |
| ------------- | ------ | ------ | ------------------------------------------------------ |
| Authorization | string | header | **Required**. The JWT token of the authenticated user. |
| name          | string | body   | **Require**. The name of the user.                     |
| username      | string | body   | **Require**. The username of the user.                 |
| email         | string | body   | **Require**. The email of the user.                    |
| password      | string | body   | **Require**. The password of the user.                 |
| phone         | string | body   | **Optional**. The phone of the user.                   |
| role          | string | body   | **Optional**. The role of the user.                    |
| verified      | bool   | body   | **Optional**. The verified status of the user.         |
| loginAttempts | int    | body   | **Optional**. The login attempts of the user.          |
| blockedAt     | string | body   | **Optional**. The blocked at of the user.              |

##### Response

```
Status: 200 OK
```

```json
{
    "id": "79654f5d-b457-401d-8271-c1085492c336",
    "name": "Malcom Cormac",
    "username": "mcCormac",
    "email": "malcom@example.com",
    "password": "$2b$10$B2U/7TOpABMQRbtGLki9JeQoMYie01VnAH4XpBwuk9MQEPQLILiO6",
    "phone": null,
    "role": "user",
    "verified": false,
    "loginAttempts": 0,
    "blockedAt": null
}
```

##### Invalid JWT Token

```
Status: 401 Unauthorized
```

```json
{
    "statusCode": 401,
    "message": "invalid token",
    "error": "Unauthorized"
}
```

#### Update User

This endpoint can be used to update a specific user' information and save to the database. This endpoint can only be accessed through **JWT** token.

```
PATH /users/{uuid}
```

##### Parameters

| Name          | Type   | In     | Description                                            |
| ------------- | ------ | ------ | ------------------------------------------------------ |
| Authorization | string | header | **Required**. The JWT token of the authenticated user. |
| name          | string | body   | **Optional**. The name of the user.                    |
| username      | string | body   | **Optional**. The username of the user.                |
| email         | string | body   | **Optional**. The email of the user.                   |
| password      | string | body   | **Optional**. The password of the user.                |
| phone         | string | body   | **Optional**. The phone of the user.                   |
| role          | string | body   | **Optional**. The role of the user.                    |
| verified      | bool   | body   | **Optional**. The verified status of the user.         |
| loginAttempts | int    | body   | **Optional**. The login attempts of the user.          |
| blockedAt     | string | body   | **Optional**. The blocked at of the user.              |

##### Response

```
Status: 200 OK
```

```json
{
    "id": "79654f5d-b457-401d-8271-c1085492c336",
    "name": "Malcom Cormac",
    "username": "mcCormac",
    "email": "malcom@example.com",
    "password": "$2b$10$B2U/7TOpABMQRbtGLki9JeQoMYie01VnAH4XpBwuk9MQEPQLILiO6",
    "phone": null,
    "role": "user",
    "verified": false,
    "loginAttempts": 0,
    "blockedAt": null
}
```

##### Invalid JWT Token

```
Status: 401 Unauthorized
```

```json
{
    "statusCode": 401,
    "message": "invalid token",
    "error": "Unauthorized"
}
```

#### Delete User

This endpoint can be used to delete a specific user from the database. This endpoint can only be accessed through **JWT** token.

```
DELETE /users/{uuid}
```

##### Parameters

| Name          | Type   | In     | Description                                            |
| ------------- | ------ | ------ | ------------------------------------------------------ |
| Authorization | string | header | **Required**. The JWT token of the authenticated user. |
| uuid          | string | path   | **Required**. The UUID of the user.                    |

##### Response

```
Status: 204 No Content
```

```json
{}
```

##### Invalid JWT Token

```
Status: 401 Unauthorized
```

```json
{
    "statusCode": 401,
    "message": "invalid token",
    "error": "Unauthorized"
}
```
