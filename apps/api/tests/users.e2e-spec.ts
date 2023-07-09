import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { UsersModule } from '../src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateUserDto } from '../src/users/dto/create-user.dto';
import { Role } from '@/users/entities/role.entity';

describe('Users - /users (e2e)', () => {
    const users = {
        id: '16358eb1-9860-4ee6-a105-76a02d98386f',
        name: 'John Doe E2E',
        username: 'johnDoeE2E',
        email: 'john.e2e@example.com',
        password: 'secret123e2e',
        role: 1 as Partial<Role>
    };

    let app: INestApplication;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [
                TypeOrmModule.forRoot({
                    type: 'mysql',
                    host: '127.0.0.1',
                    port: 3306,
                    username: 'root',
                    password: '',
                    database: 'test',
                    autoLoadEntities: true,
                    synchronize: true,
                }),
                UsersModule,
            ],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('Create [POST /users]', async () => {
        return request(app.getHttpServer())
            .post('/users')
            .send(users as CreateUserDto)
            .expect(201)
            .then(({ body }) => {
                expect(body).toEqual({
                    ...users,
                    blockedAt: null,
                    loginAttempts: 0,
                    phone: null,
                    role: 1,
                    verified: false,
                });
            });
    });

    it('Get all users [GET /users]', async () => {
        return request(app.getHttpServer())
            .get('/users')
            .expect(200)
            .then(({ body }) => {
                expect(body).toBeDefined();
            });
    });

    it('Get one user [GET /users/:id]', async () => {
        return request(app.getHttpServer())
            .get('/users/16358eb1-9860-4ee6-a105-76a02d98386f')
            .expect(200)
            .then(({ body }) => {
                expect(body).toBeDefined();
            });
    });

    it('Delete one user [DELETE /users/:id]', () => {
        return request(app.getHttpServer())
            .delete('/users/16358eb1-9860-4ee6-a105-76a02d98386f')
            .expect(204);
    });

    afterAll(async () => {
        await app.close();
    });
});
