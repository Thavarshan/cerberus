declare const authConfig: (() => {
    secretKey: string;
    expiresIn: string;
}) & import("@nestjs/config").ConfigFactoryKeyHost<{
    secretKey: string;
    expiresIn: string;
}>;
export { authConfig };
//# sourceMappingURL=auth.config.d.ts.map