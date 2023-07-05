import { AuthModule } from '../src/auth/auth.module';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { expect } from 'chai';
import * as request from 'supertest';
import { UsersModule } from '../src/users/users.module';

describe('Auth - /auth (e2e)', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const modRef = await Test.createTestingModule({
            imports: [
                AuthModule,
                UsersModule,
                TypeOrmModule.forRoot({
                    type: 'mysql',
                    host: '127.0.0.1',
                    port: 3306,
                    username: 'root',
                    password: '',
                    database: 'test',
                    autoLoadEntities: true,
                    synchronize: false,
                }),
            ],
        }).compile();

        app = modRef.createNestApplication();
        await app.init();
    });

    it('should get a JWT then successfully make a call', async () => {
        const loginReq = await request(app.getHttpServer())
            .post('/login')
            .send({ email: 'john@example.com', password: 'changeme' })
            .expect(200);

        const token = loginReq.body.accessToken;

        return request(app.getHttpServer())
            .get('/user')
            .set('Authorization', 'Bearer ' + token)
            .expect(200)
            .expect(({ body }) => {
                expect(body.name).to.equal('John Doe');
                expect(body.username).to.equal('johndoe');
            });
    });

    afterAll(async () => {
        await app.close();
    });
});
