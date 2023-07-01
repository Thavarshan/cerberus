import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { expect } from 'chai';
import * as request from 'supertest';
import { AppModule } from '../src/app/app.module';

describe('Auth - /auth (e2e)', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const modRef = await Test.createTestingModule({
            imports: [AppModule],
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
                expect(body.sub).to.equal('16358eb1-9860-4ee6-a105-76a02d98386f');
                expect(body.username).to.equal('john@example.com');
            });
    });

    afterAll(async () => {
        await app.close();
    });
});
