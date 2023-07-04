# Cerberus

## Introduction

### What is Cerberus?

Cerberus is a platform (an attempt at building an IAM) that allows the management of users, teams, roles, and permissions. Its uses a MySQL database to store the data. It is built using TypeScript and the [NestJS](https://nestjs.com/) framework.

> The platform is currently in development and is not ready for production use. Current implementation is only an MVP and does not have all the features that are planned for the platform.

### Features

- [x] User Provisioning: The system enables the creation, modification, and deletion of user accounts, including the assignment of appropriate access privileges based on roles or responsibilities.
- [ ] Authentication and Single Sign-On (SSO): The system supports various authentication methods such as passwords, multi-factor authentication (MFA), and integration with external authentication systems. It also provide single sign-on capabilities, allowing users to access multiple applications and systems using a single set of credentials.
- [ ] Authorization and Access Control: The system enforces access controls based on policies, roles, and permissions. It enables administrators to define and manage user roles and access rights to different resources, ensuring that users can only access the information and functionality required for their job.
- [ ] Audit and Compliance: The system generates audit logs and reports to track user activities, access attempts, and changes to access permissions. These logs and reports are essential for compliance requirements, such as regulatory audits and security reviews.
- [ ] User Activity Monitoring: The system monitors and logs user activities, including successful and failed authentication attempts, resource access, and modifications to user profiles. This helps detect and respond to potential security incidents and policy violations.

## API Reference

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

### Authentication

There is only one way to authenticate through Cerberus API. Requests that require authentication will return `401 invalid token/signature`. This is to show the validity of the authorization token used.

#### JWT Token (sent in header)

```bash
curl -H "Authorization: Bearer JWT-TOKEN" https://cerberus.onrender.com/users
```

### Parameters

Many API methods take optional parameters. For `GET` requests, any parameters not specified as a segment in the path can be passed as an `HTTP` query string parameter:

```bash
curl -i "https://cerberus.onrender.com/customers/feed?type=single_measurement_highlight"
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

## Contributing

Thank you for considering contributing to the Cerberus platform! The contribution guide can be found in the [Cerberus documentation](https://github.com/Thavarshan/cerberus/blob/main/.github/CONTRIBUTING.md).

## Code of Conduct

In order to ensure that the Cerberus community is welcoming to all, please review and abide by the [Code of Conduct](https://github.com/Thavarshan/cerberus/blob/main/.github/CODE_OF_CONDUCT.md).

## Security Vulnerabilities

Please review [our security policy](https://github.com/Thavarshan/cerberus/security/policy) on how to report security vulnerabilities.

## License

The Cerberus platform is open-sourced software licensed under the [MIT license](LICENSE.md).
