/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from '../services/auth.service';
import { Credentials } from '../dto/credentials.dto';
import { User } from '../../interfaces/users/user.entity';

const credentials: Credentials = {
    email: 'john@example.com',
    password: 'secret'
};

const authUser: User = {
    id: '1',
    name: 'John Doe',
    username: 'johndoe',
    email: 'john@example.com',
    password: 'secret',
    verified: true
};

describe('AuthController', () => {
    let controller: AuthController;
    let service: AuthService;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [AuthController],
            providers: [
                {
                    provide: AuthService,
                    useValue: {
                        authenticate: jest
                            .fn()
                            .mockImplementation((credentials: Credentials) =>
                                Promise.resolve(authUser),
                            )
                    },
                },
            ],
        }).compile();

        controller = app.get<AuthController>(AuthController);
        service = app.get<AuthService>(AuthService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    it('should authenticate user', () => {
        expect(controller.login(credentials)).resolves.toEqual(authUser);
        expect(service.authenticate).toHaveBeenCalledWith(credentials);
    });
});
