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

## Contributing

Thank you for considering contributing to the Cerberus platform! The contribution guide can be found in the [Cerberus documentation](https://github.com/Thavarshan/cerberus/blob/main/.github/CONTRIBUTING.md).

## Code of Conduct

In order to ensure that the Cerberus community is welcoming to all, please review and abide by the [Code of Conduct](https://github.com/Thavarshan/cerberus/blob/main/.github/CODE_OF_CONDUCT.md).

## Security Vulnerabilities

Please review [our security policy](https://github.com/Thavarshan/cerberus/security/policy) on how to report security vulnerabilities.

## License

The Cerberus platform is open-sourced software licensed under the [MIT license](LICENSE.md).
