import { ormConfig } from './orm.config';

describe('OrmConfig', () => {
    it('should be defined', () => {
        expect(ormConfig).toBeDefined();
    });

    it('should determine connection type local based on the env attributes provided', () => {
        const orm = ormConfig();

        expect(orm).toEqual({
            type: 'mysql',
            synchronize: false,
            logging: false,
            port: process.env.DB_PORT || 3306,
            username: 'root',
            password: '',
            database: 'cerberus',
            ssl: {
                rejectUnauthorized: true,
                ca: undefined,
            },
        });
    });

    it('should determine connection type URL based on the env attributes provided', () => {
        process.env.DB_URL = 'mysql://foo:bar@localhost:3306/cerberus?ssl={"rejectUnauthorized":true}';
        const orm = ormConfig();

        expect(orm).toEqual({
            url: 'mysql://foo:bar@localhost:3306/cerberus?ssl={"rejectUnauthorized":true}',
            type: 'mysql',
            synchronize: false,
            logging: false,
        });
    });
});
