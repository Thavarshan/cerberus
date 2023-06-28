import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
    defaults: {
        connection: process.env.DB_CONNECTION || 'mysql',
    },

    drivers: {
        mysql: {
            database: process.env.DB_DATABASE || 'cerberus',
            user: process.env.DB_USERNAME || 'root',
            password: process.env.DB_PASSWORD || '',
            port: parseInt(process.env.DB_PORT, 10) || 3306,
            host: process.env.DB_HOST || '127.0.0.1',
            uri: process.env.DB_URI,
        },

        mongodb: {
            database: process.env.DB_DATABASE || 'cerberus',
            uri: process.env.DB_URI || 'mongodb://localhost/cerberus',
            options: {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true,
                useFindAndModify: false,
            }
        }
    }
}));
