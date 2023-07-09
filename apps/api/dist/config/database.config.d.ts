declare const dbConfig: (() => {
    defaults: {
        connection: string;
    };
    drivers: {
        mysql: {
            database: string;
            user: string;
            password: string;
            port: number;
            host: string;
            url: string;
        };
        mongodb: {
            database: string;
            url: string;
            options: {
                useNewUrlParser: boolean;
                useUnifiedTopology: boolean;
                useCreateIndex: boolean;
                useFindAndModify: boolean;
            };
        };
    };
}) & import("@nestjs/config").ConfigFactoryKeyHost<{
    defaults: {
        connection: string;
    };
    drivers: {
        mysql: {
            database: string;
            user: string;
            password: string;
            port: number;
            host: string;
            url: string;
        };
        mongodb: {
            database: string;
            url: string;
            options: {
                useNewUrlParser: boolean;
                useUnifiedTopology: boolean;
                useCreateIndex: boolean;
                useFindAndModify: boolean;
            };
        };
    };
}>;
export { dbConfig };
//# sourceMappingURL=database.config.d.ts.map